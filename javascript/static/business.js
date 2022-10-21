const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = 500;
const height = canvas.height = 275;

//initial render of business card 
ctx.fillStyle='white';
ctx.strokeStyle='black';
ctx.fillRect(0,0,width,height);
ctx.fillStyle='rgb(240,240,200)';
ctx.fillRect(0,height*0.6,width,height);
ctx.strokeRect(0,0,width,height);

//Referenced by draw()
const myName = document.querySelector('#name');
const myBusiness = document.querySelector('#business');
const myTagline = document.querySelector('#tagline');

const menu = document.querySelector('.optionMenu');

function draw(){ // redraw canvas with this function
	const name = myName.value;
	const business = myBusiness.value;
	const tagline = myTagline.value.toUpperCase();
	ctx.clearRect(0, 0, width, height);
	ctx.fillStyle='white';
	ctx.strokeStyle='black';
	ctx.fillRect(0,0,width,height);
	ctx.fillStyle='rgb(240,240,200)';
	ctx.fillRect(0,height*0.6,width,height);
	ctx.strokeRect(0,0,width,height); // Initial card
	
	indent = 30;
	
	ctx.fillStyle='black';
	ctx.font = '50px serif';
	ctx.fillText(name,indent,90);
	ctx.font = '2em sans-serif';
	ctx.fillText(business,indent+10,130);
	ctx.font = '1.2em sans-serif';
	ctx.fillText(tagline,indent+50,200);
	
	canvas.toBlob( // create a blob and then pass it to downloading
		blob => {
			const anchor = document.querySelector('#download');
			anchor.href = URL.createObjectURL(blob);
		},
		);
}

draw();

menu.addEventListener('keyup', draw); // redraw when input is entered
