document.addEventListener("submit", function(event) {
    event.preventDefault();
    const scrittaSuperiore = document.getElementById("scrittaSuperiore");
    const scrittaInferiore = document.getElementById("scrittaInferiore");

    if(scrittaSuperiore.value == "" && scrittaInferiore.value == "") {
        alert("almeno uno dei due campi deve essere compilato!");
    } else {
        postRequestHeader(scrittaSuperiore.value, scrittaInferiore.value);
    }
});


function postRequestHeader(primoParametro, secondoParametro) {

    //Prendo l' id dell'immagine dall'url
    const urlParams = new URLSearchParams(window.location.search);
    const idImage = urlParams.get('id');
    const DOMAIN = 'https://api.imgflip.com';
    const URI = '/caption_image?';
    let requestParams = 'template_id=' + idImage + '&username=test_test_test&password=test_test_test';
    if (primoParametro != "") {
        requestParams += '&text0=' + primoParametro;
    }
    if(secondoParametro != "") {
        requestParams += '&text1=' + secondoParametro;
    }

    // Request
    try {

        const request = new XMLHttpRequest();
        request.open('POST', DOMAIN + URI + requestParams, false);
        request.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        request.send(requestParams);

        if (request.status === 200) {

            let memeArray= JSON.parse(request.response);
            window.location.href = "./meme.html?url=" + memeArray.data.url;

        } else {

            throw new Error('Response status != 200'+ request.status);
        
        }

    }catch(error) {
        alert('Endpoint remoto ' + DOMAIN + URI + ', error: ' + error.message);
    }
}

function showMeme() {
    //Prendo l'url dell'immagine dall'url della pagina
    const urlParams = new URLSearchParams(window.location.search);
    const urlImage = urlParams.get('url');

    document.getElementById("memePic").src = urlImage;
}

function getMemes() {
    try {
        let request = new XMLHttpRequest();
        request.open('GET', 'https://api.imgflip.com/get_memes', false);
        request.send(null);

        if(request.status === 200) {
            let memeArray = JSON.parse(request.response);
            insertMemes(memeArray);
        } else {
            throw new Error('Response status != 200: ' + request.status);
        }
    }catch (error) {
        alert('Endpoint remoto https://api.imgflip.com/get_memes/get_memes non disponibile');
    }
}

function insertMemes(memeArray) {
    const image = document.getElementsByClassName("img-fluid");
    const anchor = document.getElementsByTagName("a");

    for(let i=0; i<60; i++) {
        image[i].src = memeArray.data.memes[i].url;
        anchor[i].href += "?url=" + memeArray.data.memes[i].url + "&id=" + memeArray.data.memes[i].id;
    }
}

function fetchImg() {
    //Prendo i parametri dall'url
    const urlParams = new URLSearchParams(window.location.search);
    //Prendo il parametro con nome url
    const urlImage = urlParams.get('url');
    //Scrivo l'url come parametro url di img
    const elementoImg = document.getElementById("imgId");
    elementoImg.src = urlImage;
}

function creaMeme(form) {

    //Accedo ai valori dei campi del modulo utilizando i loro nomi
    const scrittaSuperiore = form.elements.scrittaSuperiore.value;
    const scrittaInferiore = form.elements.scrittaInferiore.value;
    
    console.log("superiore : " + scrittaSuperiore);
    console.log("inferiore : " + scrittaSuperiore);
}
