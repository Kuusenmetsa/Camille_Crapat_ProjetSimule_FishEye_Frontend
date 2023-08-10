function cardPhotographerTemplate(data) {
	const { name, id, city, country, tagline, price, portrait } = data; // Récupération des données du photographe

	function getUserCardDOM() {
		// Création d'un article
		const article = document.createElement('article');

		// Création d'un lien contenant le titre et la photo du phtographe
		const a = document.createElement('a');
		a.setAttribute('href', `./photographer.html?id=${id}`);
		a.setAttribute('aria-label', name);
		article.appendChild(a);
		const h2 = document.createElement('h2');
		h2.textContent = name;
		a.appendChild(imgPhotographerTemplate({ name, portrait }).getImgPhotographerDOM()); // Récupération de l'élèment photo
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

		// Ajout de ces élèments à l'article
		article.appendChild(localityElement);
		article.appendChild(taglineElement);
		article.appendChild(priceElement);

		// On retourne l'article
		return article;
	}
	return { name, id, city, country, tagline, price, portrait, getUserCardDOM };
}
