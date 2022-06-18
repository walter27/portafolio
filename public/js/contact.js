const contactForm = document.getElementById('contact');
let names = document.getElementById('name');
let mail = document.getElementById('email');
let message = document.getElementById('message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = {
        name: names.value,
        email: mail.value,
        message: message.value
    };
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function() {
        if (xhr.responseText == 'success') {
            names.value = "";
            mail.value = ""
            message.value = "";
        };
    };
    xhr.send(JSON.stringify(formData));
});