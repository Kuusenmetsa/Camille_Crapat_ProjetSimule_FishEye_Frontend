function imgPhotographerTemplate(data) {
	const { name, portrait } = data;

	const picture = `assets/photographers/${portrait}`;

	function getImgPhotographerDOM() {
		const img = document.createElement('img');
		img.setAttribute('src', picture);
		img.setAttribute('alt', name);

		return img;
	}
	return { name, portrait, getImgPhotographerDOM };
}
