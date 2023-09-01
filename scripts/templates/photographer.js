function photographerTemplate(data) {
	const { name, id, city, country, tagline, price, portrait } = data; // On récupére toutes les donées

	const picture = `assets/photographers/${portrait}`; // On créer le lien vers l'image

	// Fonction permettant d'afficher l'image du photographe
	function getImgPhotographerDOM() {
		const img = document.createElement('img');
		img.setAttribute('src', picture);
		img.setAttribute('aria-label', `photographie de ${name}`);
		img.setAttribute('class', 'photographerImg');

		return img;
	}

	// Fonction permettant d'afficher sur la page d'accueil la card du photographe
	function getUserCardDOM() {
		// Création d'un article
		const article = document.createElement('article');

		// Création d'un lien contenant le titre et la photo du phtographe
		const a = document.createElement('a');
		a.setAttribute('href', `./photographer.html?id=${id}`);
		a.setAttribute('aria-label', name);
		a.setAttribute('tabindex', '0');
		article.appendChild(a);
		const h2 = document.createElement('h2');
		h2.textContent = name;
		a.appendChild(getImgPhotographerDOM()); // Récupération de l'élèment photo
		a.appendChild(h2);

		// Création de l'élèment de localité
		const localityElement = document.createElement('p');
		localityElement.textContent = `${city}, ${country}`;
		localityElement.setAttribute('class', 'locality');

		// Création de l'élèment de phrase d'acroche
		const taglineElement = document.createElement('p');
		taglineElement.textContent = tagline;
		taglineElement.setAttribute('class', 'tagline');

		// Création de l'élèment de prix
		const priceElement = document.createElement('p');
		priceElement.textContent = `${price}€/jour`;
		priceElement.setAttribute('class', 'price');
		priceElement.setAttribute('aria-label', `${price}€ par jour`);

		// Création de la div englobante
		const div = document.createElement('div');
		div.setAttribute('class', 'infos');
		div.setAttribute('tabindex', '0');
		div.appendChild(localityElement);
		div.appendChild(taglineElement);
		div.appendChild(priceElement);

		// Ajout de ces élèments à l'article
		article.appendChild(div);

		// On retourne l'article
		return article;
	}

	// Fonction permettant l'affichage de l'identité du photographe dans la page photographe
	function getIdentityPhotographerDOM() {
		const div = document.createElement('div');
		const titleElement = document.createElement('h2');
		titleElement.setAttribute('tabindex', '2');
		titleElement.textContent = name;
		const localityElement = document.createElement('p');
		localityElement.textContent = `${city}, ${country}`;
		localityElement.setAttribute('class', 'locality');
		const taglineELement = document.createElement('p');
		taglineELement.textContent = tagline;
		taglineELement.setAttribute('class', 'tagline');
		const encompass = document.createElement('div');
		encompass.setAttribute('tabindex', '3');
		encompass.appendChild(localityElement);
		encompass.appendChild(taglineELement);
		div.appendChild(titleElement);
		div.appendChild(encompass);

		const priceElement = document.getElementById('price');
		priceElement.setAttribute('aria-label', `${price}€ par jour`);
		priceElement.textContent = `${price}€ / Jour`;

		return div;
	}

	return {
		name,
		id,
		city,
		country,
		tagline,
		price,
		portrait,
		getImgPhotographerDOM,
		getUserCardDOM,
		getIdentityPhotographerDOM,
	};
}
