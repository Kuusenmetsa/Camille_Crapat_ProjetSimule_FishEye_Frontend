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
async function displayData(photographer) {
	const photographerHeader = document.querySelector('.photograph-header');
	const buttonContact = document.querySelector('.contact_button');
	const photographerModel = headerPhotographerTemplate(photographer);
	const userHeaderDOM = photographerModel.getHeaderPhotographerDOM();

	buttonContact.before(userHeaderDOM);
	buttonContact.after(imgPhotographerTemplate(photographer).getImgPhotographerDOM());
}

async function init() {
	const photographer = await getPhotographer();
	displayData(photographer);
}

init();
