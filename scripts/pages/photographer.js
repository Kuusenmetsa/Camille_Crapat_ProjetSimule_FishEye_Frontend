// Fonction permettant de récupérer l'id du photographe dans l'URL
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

// Fonction permettant de récupérer tous les photographes
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

// Fonction permettant de récupérer le photographe concerné
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

// Fonction permettant de récupérer tous les médias
async function getMedias() {
	const res = await fetch('data/photographers.json', {
		method: 'GET',
		headers: {
			Accept: 'applciation/json',
		},
	});
	const media = await res.json();
	return media;
}

// Fonction permettant de récupérer les médias uniquement du photographe
async function getMedia() {
	const { media } = await getMedias();
	var likes;
	const res = media.filter((media) => media.photographerId == collectURL());
	res.forEach((res) => {
		likes += res.likes;
	});
	return res;
}

async function sortMedia(type, media) {
	if (type === 'popularity') {
		// Si le tri est sur populaire
		await media.sort(function (a, b) {
			// On tri par nombre de like
			return b.likes - a.likes;
		});
	} else if (type === 'date') {
		// Si le tri est sur date
		await media.sort(function (a, b) {
			a.date = new Date(a.date).getTime(); // On récupère la date au format milliseconde
			b.date = new Date(b.date).getTime(); // On récupère la date au format milliseconde
			return b.date - a.date; // On tri par date
		});
	} else if (type === 'title') {
		// Si le tri est sur titre
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

// Fonction permettant l'affichage des données concernant le photographe
async function displayData(photographer) {
	const buttonContact = document.querySelector('.contact_button'); // On récupère le bonton de contact pour ouvrir la modal
	const photographerModel = photographerTemplate(photographer); // On récupère le template photographet
	const identityPhotographerDOM = photographerModel.getIdentityPhotographerDOM(); // On récupère le DOM identité
	const imgPhotographerDOM = photographerModel.getImgPhotographerDOM(); // On récupère le DOM Image

	buttonContact.before(identityPhotographerDOM); // On ajoute avant le bouton contact l'identité
	buttonContact.after(imgPhotographerDOM); // On ajoute après le bouton contact l'image

	const titleName = document.getElementById('namePhotographer'); // On charge l'emplacement pour le nom
	titleName.textContent = photographer.name; // On l'ajoute
}

// Fonction permettant l'affichage des médias du photographe
async function displayMedias(medias, name) {
	const section = document.querySelector('.medias');
	var count = 0;
	var i = 0;
	medias.forEach((media) => {
		const mediaModel = mediaTemplate(media, name);
		const getMediasDOM = mediaModel.getMediasDOM(i);
		count += media.likes;
		section.appendChild(getMediasDOM);
		i++;
	});
}

// Fonction permettant de changer l'option affiché non dérouler
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

// Fonction permettant d'écouter le click sur une option du select et de réafficher les médias trié
async function eventOption(medias, name) {
	const span = document.querySelectorAll('.span'); // On récupère toutes les span
	span.forEach((span) => {
		span.addEventListener('click', async (e) => {
			e.preventDefault();
			if (span.getAttribute('id') === 'popularity') {
				// Si la span contient l'id popularity
				if (!span.classList.contains('selected')) {
					// Si elle n'est pas actuellement selectionner, on effectu le tri et on la met en selectionné
					changeOption(span);
					const mediasNew = await sortMedia('popularity', medias);
					const mediaCurrent = document.querySelectorAll('.mediaCard');
					mediaCurrent.forEach((media) => {
						media.remove();
					});
					await displayMedias(mediasNew, name);
					lightbox();
				}
			} else if (span.getAttribute('id') === 'date') {
				if (!span.classList.contains('selected')) {
					changeOption(span);
					const mediasNew = await sortMedia('date', medias);
					const mediaCurrent = document.querySelectorAll('.mediaCard');
					mediaCurrent.forEach((media) => {
						media.remove();
					});
					await displayMedias(mediasNew, name);
					lightbox();
				}
			} else if (span.getAttribute('id') === 'title') {
				if (!span.classList.contains('selected')) {
					changeOption(span);
					const mediasNew = await sortMedia('title', medias);
					const mediaCurrent = document.querySelectorAll('.mediaCard');
					mediaCurrent.forEach((media) => {
						media.remove();
					});
					await displayMedias(mediasNew, name);
					console.log(document.querySelectorAll('figure'));
					lightbox();
				}
			} else {
				console.log('une erreur a été detecté lors de la récupération du type de tri');
			}
		});
	});
}

// Fonction permettant d'ouvrir le trie
async function openSort() {
	const sort = document.querySelector('.select--custom');
	sort.addEventListener('click', () => {
		if (sort.classList.contains('select--open')) {
			sort.classList.remove('select--open');
		} else {
			sort.classList.add('select--open');
		}
	});
}

// Fonction d'initialisation
async function init() {
	const photographer = await getPhotographer();
	const medias = await sortMedia('popularity', await getMedia());
	const { name } = photographer;

	// écouteur d'évènement

	await displayData(photographer);
	await displayMedias(medias, name);
	eventOption(medias, name);
	openSort();
	lightbox();

	const nbLikes = likes(medias).getNbLikes();
	likes(medias).displayGlobalLikes(nbLikes);
	//likes(medias).initLike(medias);
}

// Chargement de la fonction init
init();
