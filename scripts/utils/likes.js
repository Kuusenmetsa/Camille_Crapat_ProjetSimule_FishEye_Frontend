function displayGlobalLikes(likes) {
	const el = document.getElementById('nbLikes');
	el.textContent = likes;
}

function getGlobalLikes() {
	const el = document.getElementById('nbLikes');
	return parseInt(el.textContent);
}

function like() {
	const figcaptions = document.querySelectorAll('figcaption');
	figcaptions.forEach((figcaption) => {
		const nbLikes = figcaption.querySelector('.nbLikes');
		const likeButtons = figcaption.querySelectorAll('.media__figcfaption__likeIco');
		likeButtons.forEach((likeButton) => {
			likeButton.addEventListener('click', () => {
				if (!likeButton.classList.contains('notDisplay')) {
					if (likeButton.classList.contains('empty')) {
						nbLikes.textContent = parseInt(nbLikes.textContent) + 1;
						figcaption.querySelectorAll('.empty').forEach((el) => {
							el.classList.add('notDisplay');
						});
						figcaption.querySelectorAll('.full').forEach((el) => {
							el.classList.remove('notDisplay');
						});
						displayGlobalLikes(getGlobalLikes() + 1);
					} else {
						nbLikes.textContent = parseInt(nbLikes.textContent) - 1;
						figcaption.querySelectorAll('.empty').forEach((el) => {
							el.classList.remove('notDisplay');
						});
						figcaption.querySelectorAll('.full').forEach((el) => {
							el.classList.add('notDisplay');
						});

						displayGlobalLikes(getGlobalLikes() - 1);
					}
				}
			});
			likeButton.addEventListener('keyup', (e) => {
				if (e.key === 'Enter') {
					if (!likeButton.classList.contains('notDisplay')) {
						if (likeButton.classList.contains('empty')) {
							nbLikes.textContent = parseInt(nbLikes.textContent) + 1;
							figcaption.querySelectorAll('.empty').forEach((el) => {
								el.classList.add('notDisplay');
							});
							figcaption.querySelectorAll('.full').forEach((el) => {
								el.classList.remove('notDisplay');
							});
							displayGlobalLikes(getGlobalLikes() + 1);
						} else {
							nbLikes.textContent = parseInt(nbLikes.textContent) - 1;
							figcaption.querySelectorAll('.empty').forEach((el) => {
								el.classList.remove('notDisplay');
							});
							figcaption.querySelectorAll('.full').forEach((el) => {
								el.classList.add('notDisplay');
							});

							displayGlobalLikes(getGlobalLikes() - 1);
						}
					}
				}
			});
		});
	});
}
