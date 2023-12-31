async function lightbox() {
	// Variables
	// DOM
	const figures = document.querySelectorAll('figure');
	const lightbox = document.getElementById('lightbox');
	const imgEmplLightbox = document.getElementById('lightbox__image');
	const closeButton = document.getElementById('close-lightbox');
	const previousButton = document.getElementById('previous');
	const nextButton = document.getElementById('next');

	// Autres
	var i = 0;

	// Event
	// Ouvrir la lightbox
	figures.forEach((figure) => {
		figure.querySelector('.media__image').addEventListener('click', () => {
			const id = figure.getAttribute('id');
			i = parseInt(id);
			openLightbox();
			createMedia(id);
		});
		figure.querySelector('.media__image').addEventListener('keyup', (e) => {
			if (e.key === 'Enter') {
				const id = figure.getAttribute('id');
				i = parseInt(id);
				openLightbox();
				createMedia(id);
			}
		});
	});

	// Click sur le bouton close
	closeButton.addEventListener('click', () => {
		removeMedia();
		closeLightbox();
	});
	closeButton.addEventListener('keyup', (e) => {
		if (e.key === 'Enter') {
			removeMedia();
			closeLightbox();
		}
	});

	// CLick sur le bouton précédent
	previousButton.addEventListener('click', () => {
		removeMedia();
		previousMedia();
	});
	previousButton.addEventListener('keyup', (e) => {
		if (e.key === 'Enter') {
			removeMedia();
			previousMedia();
		}
		if (e.key === 'ArrowLeft') {
			removeMedia();
			previousMedia();
		}
	});

	// Click sur le bouton suivant
	nextButton.addEventListener('click', () => {
		removeMedia();
		nextMedia();
	});
	nextButton.addEventListener('keyup', (e) => {
		if (e.key === 'Enter') {
			removeMedia();
			nextMedia();
		}
		if (e.key === 'ArrowRight') {
			removeMedia();
			nextMedia();
		}
	});

	// Function
	// Ouverture de la lightbox
	function openLightbox() {
		const body = document.querySelectorAll('body *[tabindex="0"]');
		body.forEach((body) => {
			body.setAttribute('tabindex', '-1');
		});
		lightbox.style.display = 'flex';
	}

	// Fermeture de la lightbox
	function closeLightbox() {
		lightbox.style.display = 'none';
		const body = document.querySelectorAll('body *[tabindex="-1"]');
		body.forEach((body, index) => {
			body.setAttribute('tabindex', '0');
		});
	}

	// Suppression de l'image en cours
	function removeMedia() {
		document
			.getElementById('lightbox__image')
			.querySelectorAll('*')
			.forEach((el) => el.remove());
	}

	// Création de l'image
	function createMedia(media) {
		const medias = getMediasInDOM();
		if (medias[media].type === 'image') {
			const img = document.createElement('img');
			img.setAttribute('src', medias[media].source);
			img.setAttribute('tabindex', ' 2');
			imgEmplLightbox.appendChild(img);
			const h2 = document.createElement('h2');
			h2.textContent = medias[media].name;
			h2.setAttribute('tabindex', '3');
			h2.setAttribute('aria-label', medias[media].name);
			imgEmplLightbox.appendChild(h2);
		} else if (medias[media].type === 'video') {
			const video = document.createElement('video');
			video.setAttribute('controls', '');
			video.setAttribute('autoplay', '');
			video.setAttribute('tabindex', ' 2');
			const source = document.createElement('source');
			source.setAttribute('src', medias[media].source);
			source.setAttribute('type', 'video/mp4');
			video.appendChild(source);
			imgEmplLightbox.appendChild(video);
			const h2 = document.createElement('h2');
			h2.setAttribute('tabindex', '3');
			h2.textContent = medias[media].name;
			h2.setAttribute('aria-label', medias[media].name);
			imgEmplLightbox.appendChild(h2);
		}
	}

	// Next
	function nextMedia() {
		if (i === getMediasInDOM().length - 1) {
			i = 0;
			createMedia(i);
		} else {
			i += 1;
			createMedia(i);
		}
	}

	// Previous
	function previousMedia() {
		if (i === 0) {
			i = getMediasInDOM().length - 1;
			createMedia(i);
		} else {
			i -= 1;
			createMedia(i);
		}
	}

	// Récupération des médias dans le DOM
	function getMediasInDOM() {
		var els = [];
		figures.forEach((figure) => {
			const src =
				figure.querySelectorAll('img.media__image').length > 0
					? figure.querySelectorAll('img.media__image')
					: figure.querySelectorAll('video.media__image > source');
			src.forEach((src) => {
				const el = {
					type: figure.querySelectorAll('img.media__image').length > 0 ? 'image' : 'video',
					source: src.getAttribute('src'),
					name: figure.querySelector('.media__figcaption__title').textContent,
				};
				els.push(el);
			});
		});
		return els;
	}
}
