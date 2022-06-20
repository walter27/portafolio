const contactForm = document.getElementById('contact');
let names = document.getElementById('name');
let mail = document.getElementById('email');
let message = document.getElementById('message');
let contacto = document.getElementById('contacto');
let mensaje = document.createElement('h4');
mensaje.setAttribute('id', 'mensaje');

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
            mensaje.classList.add('message');
            mensaje.append('Correo enviado');
        } else {
            mensaje.classList.add('message-error');
            mensaje.append('Error interno');
        };
        contacto.after(mensaje);
        setTimeout(() => {
            document.getElementById('mensaje').remove();
        }, 2000);
    };
    xhr.send(JSON.stringify(formData));
});