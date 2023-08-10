//Mettre le code JavaScript lié à la page photographer.html

function collectURL() {
	var currentURL = window.location.href;
	var url = new URL(currentURL);
	var search_params = new URLSearchParams(url.search);
	if (search_params.has('id')) {
		const regexId = /^[0-9]+$/;
		var id = search_params.get('id');
		if (regexId.test(id)) {
			return id;
		} else {
			console.log("une erreur est surveu lors de la récupération de l'id");
		}
	} else {
		console.log("une erreur est surveu lors de la récupération de l'id");
	}
}

async function getPhotographers() {
	const res = await fetch('data/photographers.json', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
		},
	});
	const photographers = await res.json();
	return photographers;
}

async function getPhotographer() {
	const { photographers } = await getPhotographers();
	var photographer;
	photographers.forEach((currentPhotographer) => {
		if (currentPhotographer.id == collectURL()) {
			photographer = currentPhotographer;
		}
	});
	return photographer;
}

async function getMedias() {
	const res = await fetch('data/photographers.json', {
		method: 'GET',
		headers: {
			Accept: 'applciation/json',
		},
	});
	const medias = await res.json();
	return medias;
}

async function getMedia() {
	const { media } = await getMedias();
	const res = media.filter((media) => media.photographerId == collectURL());
	return res;
}

async function displayData(photographer, medias) {
	const buttonContact = document.querySelector('.contact_button');
	const photographerModel = photographerTemplate(photographer);
	const identityPhotographerDOM = photographerModel.getIdentityPhotographerDOM();
	const imgPhotographerDOM = photographerModel.getImgPhotographerDOM();

	buttonContact.before(identityPhotographerDOM);
	buttonContact.after(imgPhotographerDOM);

	const main = document.querySelector('main');
	const section = document.createElement('section');
	section.setAttribute('class', 'medias');
	main.appendChild(section);
	medias.forEach((media) => {
		const mediaModel = mediaTemplate(media);
		const getMediasDOM = mediaModel.getMediasDOM();

		section.appendChild(getMediasDOM);
	});
}

async function init() {
	const photographer = await getPhotographer();
	const medias = await getMedia();
	displayData(photographer, medias);
}

init();
