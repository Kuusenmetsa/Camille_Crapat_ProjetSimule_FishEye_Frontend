function mediaTemplate(data, name) {
	const { title, id, image, video, likes } = data; // On récupère les données du média

	const srcImage = `assets/medias/${name}/${image}`; // On prépare le lien vers la photo
	const srcVideo = `assets/medias/${name}/${video}`; // On prépare le lien vers la vidéo
	const heartEmpty = `assets/icons/heart__empty--orange.svg`; // On charge le coeur
	const heartFull = `assets/icons/heart__full--orange.svg`;

	// Fonction permettant d'afficher les médias
	function getMediasDOM(i) {
		const figure = document.createElement('figure');
		figure.setAttribute('class', 'mediaCard');
		figure.setAttribute('id', i);
		if (image != undefined) {
			// Si l'image existe
			const img = document.createElement('img');
			img.setAttribute('src', srcImage);
			img.setAttribute('alt', '');
			img.setAttribute('class', 'media__image');
			figure.appendChild(img);
		}
		if (video != undefined) {
			// Si la vidéo existe
			const video = document.createElement('video');
			const src = document.createElement('source');
			src.setAttribute('src', srcVideo);
			src.setAttribute('type', 'video/mp4');
			video.setAttribute('class', 'media__image');
			video.setAttribute('controls', '');
			video.setAttribute('autoplay', '');
			video.appendChild(src);
			figure.appendChild(video);
		}
		const figcaption = document.createElement('figcaption');
		figcaption.setAttribute('class', 'media__figcaption');
		const p = document.createElement('p');
		p.setAttribute('class', 'media__figcaption__title');
		p.textContent = title;
		const like = document.createElement('div');
		like.setAttribute('class', 'media__figcaption__like');
		const nbLike = document.createElement('p');
		nbLike.setAttribute('class', 'media__figcaption__likeText nbLikes');
		nbLike.textContent = likes;
		const icoEmpty = document.createElement('img');
		icoEmpty.setAttribute('src', heartEmpty);
		icoEmpty.setAttribute('alt', '');
		icoEmpty.setAttribute('class', 'media__figcfaption__likeIco empty');
		const icoFull = document.createElement('img');
		icoFull.setAttribute('src', heartFull);
		icoFull.setAttribute('alt', '');
		icoFull.setAttribute('class', 'media__figcfaption__likeIco full notDisplay');
		figcaption.appendChild(p);
		like.appendChild(nbLike);
		like.appendChild(icoEmpty);
		like.appendChild(icoFull);
		figcaption.appendChild(like);
		figure.appendChild(figcaption);

		return figure;
	}

	return { title, id, getMediasDOM };
}
