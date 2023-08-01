function photographerTemplate(data) {
	const { name, id, city, country, tagline, price, portrait } = data;

	const picture = `assets/photographers/${portrait}`;

	function getUserCardDOM() {
		const article = document.createElement('article');
		const a = document.createElement('a');
		a.setAttribute('href', `/photographer.html?id=${id}`);
		a.setAttribute('aria-label', name);
		article.appendChild(a);
		const img = document.createElement('img');
		img.setAttribute('src', picture);
		const h2 = document.createElement('h2');
		h2.textContent = name;
		a.appendChild(img);
		a.appendChild(h2);
		const localityElement = document.createElement('p');
		localityElement.textContent = `${city}, ${country}`;
		localityElement.setAttribute('class', 'locality');
		const taglineElement = document.createElement('p');
		taglineElement.textContent = tagline;
		taglineElement.setAttribute('class', 'tagline');
		const priceElement = document.createElement('p');
		priceElement.textContent = `${price}€/jour`;
		priceElement.setAttribute('class', 'price');
		article.appendChild(localityElement);
		article.appendChild(taglineElement);
		article.appendChild(priceElement);
		return article;
	}
	return { name, id, city, country, tagline, price, picture, getUserCardDOM };
}
