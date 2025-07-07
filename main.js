document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form[name="contacto"]');
    const errorMessageDiv = document.getElementById('error-message');
    const sendingMessageDiv = document.getElementById('sending-message');
    const successModal = document.getElementById('success-modal');
    const closeModalButton = document.getElementById('close-modal-button');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevenir el envío tradicional del formulario

            // Ocultar mensajes previos
            if (errorMessageDiv) errorMessageDiv.style.display = 'none';
            if (sendingMessageDiv) sendingMessageDiv.style.display = 'none';
            if (successModal) successModal.style.display = 'none';

            const nombre = form.elements['nombre'].value.trim();
            const email = form.elements['email'].value.trim();
            const mensaje = form.elements['mensaje'].value.trim();

            let errors = [];

            if (nombre === '') {
                errors.push('El campo Nombre es obligatorio.');
            }
            if (email === '') {
                errors.push('El campo Email es obligatorio.');
            } else {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(email)) {
                    errors.push('Por favor, introduce un Email válido.');
                }
            }
            if (mensaje === '') {
                errors.push('El campo Mensaje es obligatorio.');
            }

            if (errors.length > 0) {
                if (errorMessageDiv) {
                    errorMessageDiv.innerHTML = errors.join('<br>');
                    errorMessageDiv.style.display = 'block';
                }
            } else {
                // Mostrar mensaje de "Enviando..."
                if (sendingMessageDiv) {
                    sendingMessageDiv.style.display = 'block';
                }

                const formData = new FormData(form);

                fetch('/', { // Netlify detecta envíos POST a la ruta raíz del sitio para formularios con data-netlify="true"
                    method: 'POST',
                    headers: { "Content-Type": "application/x-www-form-urlencoded" }, // Necesario para Netlify si no se usa JS puro de Netlify
                    body: new URLSearchParams(formData).toString() // Convertir FormData a URL-encoded string
                })
                .then(response => {
                    if (sendingMessageDiv) sendingMessageDiv.style.display = 'none';
                    if (response.ok) {
                        form.reset(); // Limpiar el formulario
                        if (successModal) successModal.style.display = 'flex'; // Mostrar el modal
                    } else {
                        // Intentar parsear el error si Netlify devuelve uno estructurado
                        response.json().then(data => {
                            if (errorMessageDiv) {
                                errorMessageDiv.innerHTML = `Error al enviar: ${data.message || response.statusText}`;
                                errorMessageDiv.style.display = 'block';
                            }
                        }).catch(() => {
                             if (errorMessageDiv) {
                                errorMessageDiv.innerHTML = `Error al enviar el formulario. Código: ${response.status}`;
                                errorMessageDiv.style.display = 'block';
                            }
                        });
                    }
                })
                .catch(error => {
                    if (sendingMessageDiv) sendingMessageDiv.style.display = 'none';
                    if (errorMessageDiv) {
                        errorMessageDiv.innerHTML = `Error de red al enviar el formulario: ${error.message}`;
                        errorMessageDiv.style.display = 'block';
                    }
                });
            }
        });
    }

    if (closeModalButton && successModal) {
        closeModalButton.addEventListener('click', function() {
            successModal.style.display = 'none';
        });
    }

    // Opcional: cerrar modal si se hace clic fuera del contenido del modal
    if (successModal) {
        successModal.addEventListener('click', function(event) {
            if (event.target === successModal) { // Si el clic es en el overlay
                successModal.style.display = 'none';
            }
        });
    }
});
