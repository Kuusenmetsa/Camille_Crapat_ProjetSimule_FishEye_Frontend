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

async function sortMedia(type, media) {
	if (type === 'popularity') {
		await media.sort(function (a, b) {
			return b.likes - a.likes;
		});
	} else if (type === 'date') {
		await media.sort(function (a, b) {
			a.date = new Date(a.date).getTime();
			b.date = new Date(b.date).getTime();
			return b.date - a.date;
		});
	} else if (type === 'title') {
		await media.sort(function (a, b) {
			if (a.title < b.title) {
				return -1;
			} else if (a.title > b.title) {
				return 1;
			}
			return 0;
		});
	} else {
		console.log('une erreur est survenu lors du tri des medias');
	}
	return media;
}

async function displayData(photographer) {
	const buttonContact = document.querySelector('.contact_button');
	const photographerModel = photographerTemplate(photographer);
	const identityPhotographerDOM = photographerModel.getIdentityPhotographerDOM();
	const imgPhotographerDOM = photographerModel.getImgPhotographerDOM();

	buttonContact.before(identityPhotographerDOM);
	buttonContact.after(imgPhotographerDOM);

	const titleName = document.getElementById('namePhotographer');
	titleName.textContent = photographer.name;
}

async function displayMedias(medias) {
	const section = document.querySelector('.medias');
	medias.forEach((media) => {
		const mediaModel = mediaTemplate(media);
		const getMediasDOM = mediaModel.getMediasDOM();

		section.appendChild(getMediasDOM);
	});
}

function changeOption(span) {
	const options = document.querySelector('.options');
	const selected = document.querySelector('.selected');

	span.classList.remove('option');
	span.classList.add('option--current');
	span.classList.add('selected');
	span.setAttribute('aria-selected', 'true');
	options.before(span);

	options.appendChild(selected);
	selected.classList.add('option');
	selected.classList.remove('option--current');
	selected.classList.remove('selected');
	selected.setAttribute('aria-selected', 'false');
}

async function eventOption(medias) {
	const span = document.querySelectorAll('span');
	span.forEach((span) => {
		span.addEventListener('click', async (e) => {
			e.preventDefault();
			if (span.getAttribute('id') === 'popularity') {
				if (!span.classList.contains('selected')) {
					changeOption(span);
					const mediasNew = await sortMedia('popularity', medias);
					const mediaCurrent = document.querySelectorAll('.mediaCard');
					mediaCurrent.forEach((media) => {
						media.remove();
					});
					await displayMedias(mediasNew);
				}
			} else if (span.getAttribute('id') === 'date') {
				if (!span.classList.contains('selected')) {
					changeOption(span);
					const mediasNew = await sortMedia('date', medias);
					const mediaCurrent = document.querySelectorAll('.mediaCard');
					mediaCurrent.forEach((media) => {
						media.remove();
					});
					await displayMedias(mediasNew);
				}
			} else if (span.getAttribute('id') === 'title') {
				if (!span.classList.contains('selected')) {
					changeOption(span);
					const mediasNew = await sortMedia('title', medias);
					const mediaCurrent = document.querySelectorAll('.mediaCard');
					mediaCurrent.forEach((media) => {
						media.remove();
					});
					await displayMedias(mediasNew);
				}
			} else {
			}
		});
	});
}

async function init() {
	const photographer = await getPhotographer();
	const medias = await sortMedia('popularity', await getMedia());

	// écouteur d'évènement

	await displayData(photographer);
	await displayMedias(medias);
	eventOption(medias);
}

init();
