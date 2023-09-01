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
//Launch open contact modal open
modalOpenBtn.addEventListener('click', () => displayModal());

// Launch close modal event
modalClose.addEventListener('click', () => closeModal());

// Launch submit form contact event
formContact.forEach((submit) => {
	submit.addEventListener('submit', (e) => {
		e.preventDefault();
		checkInputs('submit');
	});
});

// Launch change input contact event
inputContact.forEach((input) => {
	input.addEventListener('change', (e) => {
		e.preventDefault();
		checkInputs();
	});
});

// Function
// Launch modal contact
function displayModal() {
	const modal = document.getElementById('contact_modal');
	const main = document.querySelector('main');
	modal.setAttribute('aria-hidden', 'false');
	main.setAttribute('aria-hidden', 'true');
	modal.style.display = 'block';
}

// Close modal contact
function closeModal() {
	const modal = document.getElementById('contact_modal');
	modal.setAttribute('aria-hidden', 'true');
	modal.style.display = 'none';
}

// Get value input contact
function getValue(id = '') {
	return document.getElementById(id).value;
}

// Checked form contact
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

// Checked input
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
