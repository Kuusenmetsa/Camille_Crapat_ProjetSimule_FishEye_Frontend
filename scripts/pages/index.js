async function getPhotographers() {
	const res = await fetch('../../data/photographers.json', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
		},
	});
	const photographers = await res.json();
	return photographers;
}

async function displayData(photographers) {
	const photographersSection = document.querySelector('.photographer_section');

	photographers.forEach((photographer) => {
		const photographerModel = cardPhotographerTemplate(photographer);
		const userCardDOM = photographerModel.getUserCardDOM();
		photographersSection.appendChild(userCardDOM);
	});
}

async function init() {
	// Récupère les datas des photographes
	const { photographers } = await getPhotographers();
	displayData(photographers);
}

init();
