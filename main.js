document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form[name="contacto"]');
    const errorMessageDiv = document.getElementById('error-message');
    const sendingMessageDiv = document.getElementById('sending-message');
    const successModal = document.getElementById('success-modal');
    const closeModalButton = document.getElementById('close-modal-button');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            // Ocultar mensajes previos
            errorMessageDiv.style.display = 'none';
            sendingMessageDiv.style.display = 'none';
            successModal.style.display = 'none';

            const nombre = form.elements['nombre'].value.trim();
            const email = form.elements['email'].value.trim();
            const mensaje = form.elements['mensaje'].value.trim();

            let errors = [];

            if (nombre === '') errors.push('El campo Nombre es obligatorio.');
            if (email === '') errors.push('El campo Email es obligatorio.');
            else {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(email)) errors.push('Por favor, introduce un Email válido.');
            }
            if (mensaje === '') errors.push('El campo Mensaje es obligatorio.');

            if (errors.length > 0) {
                errorMessageDiv.innerHTML = errors.join('<br>');
                errorMessageDiv.style.display = 'block';
                return;
            }

            sendingMessageDiv.style.display = 'block';

            const formData = new FormData(form);

            fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            })
            .then(response => {
                sendingMessageDiv.style.display = 'none';
                if (response.ok) {
                    form.reset();
                    successModal.style.display = 'flex';
                } else {
                    response.json().then(data => {
                        errorMessageDiv.innerHTML = `Error al enviar: ${data.message || response.statusText}`;
                        errorMessageDiv.style.display = 'block';
                    }).catch(() => {
                        errorMessageDiv.innerHTML = `Error al enviar el formulario. Código: ${response.status}`;
                        errorMessageDiv.style.display = 'block';
                    });
                }
            })
            .catch(error => {
                sendingMessageDiv.style.display = 'none';
                errorMessageDiv.innerHTML = `Error de red al enviar el formulario: ${error.message}`;
                errorMessageDiv.style.display = 'block';
            });
        });
    }

    if (closeModalButton) {
        closeModalButton.addEventListener('click', function() {
            successModal.style.display = 'none';
        });
    }

    if (successModal) {
        successModal.addEventListener('click', function(event) {
            if (event.target === successModal) {
                successModal.style.display = 'none';
            }
        });
    }
});
