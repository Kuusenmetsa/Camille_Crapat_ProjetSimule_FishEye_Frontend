// Function
// Récupération de tous les photographe
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

// Affichage des datas
async function displayData(photographers) {
	const photographersSection = document.querySelector('.photographer_section');

	photographers.forEach((photographer) => {
		const photographerModel = photographerTemplate(photographer);
		const userCardDOM = photographerModel.getUserCardDOM();
		photographersSection.appendChild(userCardDOM);
	});
}

// Initialisation
async function init() {
	// Récupère les datas des photographes
	const { photographers } = await getPhotographers();
	displayData(photographers);
}

init();
