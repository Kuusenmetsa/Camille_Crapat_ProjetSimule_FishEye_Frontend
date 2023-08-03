function headerPhotographerTemplate(data) {
	const { name, city, country, tagline } = data;
	function getHeaderPhotographerDOM() {
		const div = document.createElement('div');
		const titleElement = document.createElement('h2');
		titleElement.textContent = name;
		const localityElement = document.createElement('p');
		localityElement.textContent = `${city}, ${country}`;
		localityElement.setAttribute('class', 'locality');
		const taglineELement = document.createElement('p');
		taglineELement.textContent = tagline;
		taglineELement.setAttribute('class', 'tagline');
		div.appendChild(titleElement);
		div.appendChild(localityElement);
		div.appendChild(taglineELement);

		return div;
	}
	return { name, city, country, tagline, getHeaderPhotographerDOM };
}
