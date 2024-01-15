const range = document.getElementById('length');
const rangeValue = document.getElementById('rangeVal');
const switches = document.querySelectorAll('input[role=switch]');
const generateButton = document.getElementById('generate');
const password = document.getElementById('password');

range.addEventListener('input', (e) => {
	rangeValue.innerText = e.target.value;
	rangeValue.dataset.range = e.target.value;
});

const category = {
	lower: 'abcdefghijklmnopqrstuvwxyz',
	upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	number: '1234567890',
	symbol: '!@#$%/|&*+-_=[]{}()?<>,.:;~',
	unique: '',
};

const uniqueArray = [
	'aA@4',
	'bB68',
	'cCeo',
	'dD',
	'eEc3',
	'fFpP?',
	'gG8',
	'hH#',
	'iI1lL!',
	'jJ7i*',
	'kKR',
	'mMNn',
	'oO0Q',
	'qQ9',
	'rRK',
	'sS$5&',
	'tTI1f',
	'uU',
	'wWvV',
	'xXyY',
	'zZ2',
	'[]{}()<>',
	',.',
	':;',
	'%/|',
	'+=-_~',
];

const optionSet = new Set();
let uniqueFlag = 0;

optionSet.add(category.lower);
switches.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		if (e.target.checked) {
			if (e.target.dataset.value == 'unique') uniqueFlag = 1;
			optionSet.add(category[e.target.dataset.value]);
		} else {
			if (e.target.dataset.value == 'unique') uniqueFlag = 0;
			optionSet.delete(category[e.target.dataset.value]);
		}
		console.log(optionSet);
		console.log(uniqueFlag);
	});
});

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

generateButton.addEventListener('click', () => {
	// convert the optionSet into and Array using Array.from() and then invoke the .join() method to return the string of the array
	let characterString = Array.from(optionSet).join('');

	// get the range value form the dataset of rangeValue
	let characterRange = rangeValue.dataset.range;

	// initialize an empty string named passwordString, this will hold the password to be generated
	let passwordString = '';

	// now get into a while loop till the characterRange becomes 0
	while (characterRange) {
		// get a random index using a formula within getRandomNumber() function
		const randomIndex = getRandomNumber(0, characterString.length);

		// the uniqueFlag is set when the `unique` switch is ON
		if (!uniqueFlag) {
			// generate a random password
			passwordString += characterString[randomIndex];
			characterRange--;
		} else {
			// the below code is executed when the `unique` flag is set

			// get a random character from our characterString and add it to our passwordString
			const randomChar = characterString[randomIndex];
			passwordString += randomChar;

			// now find the substring that has the random character and return the entire substring from our uniqueArray[]
			const subString = uniqueArray.find((substring) => {
				return substring.includes(randomChar);
			});

			// next we convert the substring to an array using Array.from() and apply a forEach() to iterate through
			// each character and remove them from our characterString.
			// This way all the similar characters are removed from the characterString
			Array.from(subString).forEach((character) => {
				characterString = characterString.replace(character, '');
			});

			characterRange--;
		}
	}
	password.value = passwordString;
});
