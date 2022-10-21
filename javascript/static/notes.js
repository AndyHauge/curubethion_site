class Note {
	constructor(x,y,size,id,noteText) {
		
		this.xPos = x;
		this.yPos = y;
		this.size = size;
		this.id = id;
		this.moving = false;
		this.noteContent = noteText;
		
		this.noteSpawn();
		notes.push(this);
	}
	
	noteSpawn() {
		const noteDiv = document.querySelector("#note-space");
		const note = document.createElement("div"); // build containing div for note
		
		note.setAttribute('style',`left:${this.xPos}px; top:${this.yPos}px; height:${this.size}px;`);
		note.setAttribute('class','note');
		note.setAttribute('id',this.id); // Initial note setup
		
		noteDiv.appendChild(note);
		
		note.addEventListener('mousemove', (event) => { //Updates position of div when mouse "moves" aka drags
			if(this.moving) {
				const note = document.querySelector(`#${this.id}`);
				this.xPos = event.pageX - 80;
				this.yPos = event.pageY - (this.size/2);
				note.setAttribute('style',`left:${this.xPos}px; top:${this.yPos}px; height:${this.size}px;`);
			}
		});
		
		note.addEventListener('mousedown', (event) => { //add listeners for drag and drop movement
			this.moving = true;
		});
		note.addEventListener('mouseup', (event) => { //note stops moving once mouse stops dragging
			this.moving = false;
		});
		
		const deleteBtn = document.createElement("button");
		deleteBtn.textContent = 'delete';
		deleteBtn.setAttribute('class','delete-btn');
		deleteBtn.addEventListener('click',this.noteDelete);
		deleteBtn.deleteId = this.id;
		note.appendChild(deleteBtn);
		
		const noteText = document.createElement("textarea");
		noteText.setAttribute('id',`${this.id}-text`);
		noteText.value = this.noteContent;
		note.appendChild(noteText);
	}
	
	noteDelete() {
		const noteDiv = document.querySelector("#note-space");
		noteDiv.removeChild(document.querySelector(`#${this.deleteId}`)); // remove note div from DOM

		for (const i in notes) {
			if (notes[i].id === this.deleteId) {
				notes.splice(i,1); // remove note object from array
			}
		}
		
	}
}

function saveNotes() {
	saveText.classList.add("fadeout"); //Gives a fading-out save indicator
	
	for (const note of notes) { // loop through notes array to sync text on all notes
		note.noteContent = document.querySelector(`#${note.id}-text`).value;
	}
	window.localStorage.setItem('savedNotes', JSON.stringify(notes)); //passing string to localStorage
}

function loadNotes() { // Load button clears existing notes
	const loadedNotes = JSON.parse(window.localStorage.getItem('savedNotes'));
	for (const note of loadedNotes) {
		new Note(note.xPos,note.yPos,200,note.id,note.noteContent);
	}
}

let autosaveInterval; // create tracker variable for autosave status

function autoSaver(){
	if (autoSave.checked) { 
		saveNotes();
		if(!autosaveInterval) { // validates that autosaving is toggled
			autosaveInterval = setInterval(saveNotes,15000);
		}
	} else {
		clearInterval(autosaveInterval);
		autosaveInterval = null;
	}
}
window.addEventListener('load',autoSaver); // verify box status on page load

const notes = [];

const noteCreate = document.querySelector("button.new");
const noteSave = document.querySelector("button.save");
const noteLoad = document.querySelector("button.load");
const autoSave = document.querySelector(".autosave");
const saveText = document.querySelector("#save-status");

noteCreate.addEventListener('click',() => {
	/* Before we create a new note, we check through notes array to see if there's any empty slots that need to be filled
	e.g. if there's no "myNote-0", create a "myNote-0", if there's no "myNote-1", create a "myNote-1", etc... */
	for (i = 0; i <= notes.length; i++) {
		if (notes.filter( note => note.id === `myNote-${i}`).length > 0) {
			continue; // testing to see if any notes match the appropriate ID
		}
		new Note(100,350,200,`myNote-${i}`,''); // creating note at first available ID
		break; // stop the loop, we only need one
	}
});

noteSave.addEventListener('click',saveNotes);

noteLoad.addEventListener('click',() => {
	notes.length = 0; // clear array before loading new array
	
	const noteDiv = document.querySelector("#note-space"); 
	while (noteDiv.hasChildNodes()){ // once delete methods are added to the Note class, loop through notes array and call individual methods instead
		noteDiv.removeChild(noteDiv.lastChild) // clear screen of notes
	}
	
	loadNotes();
});

autoSave.addEventListener('change',autoSaver); // checks for Autosave toggle

saveText.addEventListener('animationend',() => {
	saveText.classList.remove('fadeout');
});

loadNotes();