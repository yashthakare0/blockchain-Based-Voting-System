const scriptURL = 'https://script.google.com/macros/s/AKfycbwFOOPrr5wfd0xtn6mxjRRH-depdQ7DDeIb2b8VUO24gs7Kj_E1S4vIsIH2wvvCRMJO/exec'


const form = document.forms['contact-form']


form.addEventListener('submit', e => {
e.preventDefault();
fetch(scriptURL, {
method: 'POST',
body: new FormData(form)
})
.then(response => alert("Thank you! your vote is submitted."))
.then(() => {
window.location.href = 'index.html';
})
.catch(error => console.error('Error!', error.message));
});
