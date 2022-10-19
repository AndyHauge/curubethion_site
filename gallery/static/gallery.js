const gallery = document.querySelector('#gallery-frame');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

function ajaxFetch(imgNum,command) {
    fetch(`ajax/${imgNum}/${command}/`, {
        headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    }).then(data => {
        imgDisplay(data)
    }).catch((err) => console.error(`Couldn't fetch image: ${err.message}`));
}

function imgDisplay(imgJSON) {
    gallery.replaceChildren();
    const imgDiv = document.createElement('div');
    imgDiv.setAttribute('id', `img-${imgJSON.imgId}`);
    gallery.appendChild(imgDiv);

    const img = document.createElement('img'); 
    img.setAttribute('src', imgJSON.imgURL );
    imgDiv.appendChild(img); // creates image in gallery

    const infoBox = document.createElement('div');
    infoBox.setAttribute('class', 'img-infobox');
    imgDiv.appendChild(infoBox); // infobox frame for image info

    const imgTitle = document.createElement('h2');
    imgTitle.textContent = imgJSON.imgName;
    const imgText = document.createElement('p');
    imgText.textContent = imgJSON.imgDesc;
    infoBox.appendChild(imgTitle);
    infoBox.appendChild(imgText);

}

function cycleImg(e) { 
    //gallery.classList.remove('fade-in'); //clear class to prep for new image fade
    //gallery.classList.add('fade-out'); //fade image out

    const direction =  e.currentTarget.getAttribute('class');
    const imgMain = document.querySelector('#gallery-frame div:not(.hidden)');
    curImg = Number(imgMain.getAttribute('id').slice(-1)); // parses image ID for ordinal

    switch (direction) {
        case 'next-btn':
            ajaxFetch(curImg, 'next');
            break;
        case 'prev-btn':
            ajaxFetch(curImg, 'prev');
            break;
        default:
            break;
    }
}

ajaxFetch(1,'first');

nextBtn.addEventListener('click', cycleImg);
prevBtn.addEventListener('click', cycleImg);