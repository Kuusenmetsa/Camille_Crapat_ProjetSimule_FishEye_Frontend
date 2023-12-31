// Variables
// DOM

const modal = document.getElementById('contact_modal');
const modalOpenBtn = document.querySelector('.contact_button');
const modalClose = document.getElementById('contact_close');
const formContact = document.querySelectorAll('form');
const inputContact = document.querySelectorAll('.input');

// Regex
const regexName = /^[-a-zA-ZàâäéèêëïîôöùûüçÂ]{2,}$/;
const regexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const regexMessage = /^[\w\sàâäéèêëïîôöùûüçÂ"'(-_\/@)°+=€$£%*,?;.:!]{2,}$/;

//Event
// Ouvrir la modal
modalOpenBtn.addEventListener('click', () => displayModal());

// Fermer la modal
modalClose.addEventListener('click', () => closeModal());
modalClose.addEventListener('keyup', (e) => {
	if (e.key === 'Enter') {
		closeModal();
	}
});

// Lorsqu'on clique sur le bouton
formContact.forEach((submit) => {
	submit.addEventListener('submit', (e) => {
		e.preventDefault();
		checkInputs('submit');
	});
});

// Lorsqu'on change d'input
inputContact.forEach((input) => {
	input.addEventListener('change', (e) => {
		e.preventDefault();
		checkInputs();
	});
});

// Function
// Chargement de la modal
function displayModal() {
	const modal = document.getElementById('contact_modal');
	const body = document.querySelectorAll('body *[tabindex="0"]');
	body.forEach((body) => {
		body.setAttribute('tabindex', '-1');
	});
	modal.style.display = 'block';
}

// Fermeture de la modal
function closeModal() {
	const modal = document.getElementById('contact_modal');
	modal.style.display = 'none';
	const body = document.querySelectorAll('body *[tabindex="-1"]');
	body.forEach((body, index) => {
		body.setAttribute('tabindex', '0');
	});
}

// Récupération de la value des inputs
function getValue(id = '') {
	return document.getElementById(id).value;
}

// Vérification des inputs
async function checkInputs(type = null) {
	const firstName = checkInput('firstname', '.firstname', regexName);
	const lastName = checkInput('lastname', '.lastname', regexName);
	const email = checkInput('mail', '.mail', regexMail);
	const message = checkInput('message', '.message', regexMessage);
	const { name } = await getPhotographer();

	if (type === 'submit' && firstName && lastName && email && message) {
		const contact = {
			expediteur: `${firstName} ${lastName} - ${email}`,
			destintaire: name,
			message: message,
		};

		localStorage.setItem('contact', JSON.stringify(contact));

		const p = document.createElement('p');
		p.className = 'confirm-message';
		p.textContent = `Votre message a bien été transmis à ${name}`;

		formContact.forEach((f) => {
			f.reset();
			f.style.display = 'none';
			f.after(p);
			modalClose.addEventListener('click', () => {
				document.querySelector('.confirm-message').remove();
				f.style.display = 'block';
				closeModal();
			});
		});

		console.log(localStorage.getItem('contact'));
	}
}

// Vérification input
function checkInput(id = '', className = '', regex = '') {
	const value = getValue(id);
	if (value === '' || !regex.test(value)) {
		addError(className);
		return false;
	} else {
		delError(className);
		return value;
	}
	function addError(className) {
		document.querySelector(className).setAttribute('data-error-visible', 'true');
	}
	function delError(className) {
		document.querySelector(className).setAttribute('data-error-visible', 'false');
	}
}
