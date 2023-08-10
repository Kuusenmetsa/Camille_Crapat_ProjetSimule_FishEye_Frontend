function mediaTemplate(data) {
	const { title } = data;

	function getMediasDOM() {
		const article = document.createElement('article');
		article.setAttribute('class', 'mediaCard');
		const p = document.createElement('p');
		p.textContent = title;
		article.append(p);

		return article;
	}

	return { title, getMediasDOM };
}
