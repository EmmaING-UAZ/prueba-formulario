document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form[name="contacto"]');
    const errorMessageDiv = document.getElementById('error-message');
    const sendingMessageDiv = document.getElementById('sending-message');

    if (form) {
        form.addEventListener('submit', function(event) {
            // Ocultar mensajes previos
            if (errorMessageDiv) errorMessageDiv.style.display = 'none';
            if (sendingMessageDiv) sendingMessageDiv.style.display = 'none';

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
                // Validación simple de formato de email
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(email)) {
                    errors.push('Por favor, introduce un Email válido.');
                }
            }
            if (mensaje === '') {
                errors.push('El campo Mensaje es obligatorio.');
            }

            if (errors.length > 0) {
                event.preventDefault(); // Evita el envío del formulario
                if (errorMessageDiv) {
                    errorMessageDiv.innerHTML = errors.join('<br>');
                    errorMessageDiv.style.display = 'block';
                }
            } else {
                // Si no hay errores, mostrar mensaje de "Enviando..."
                if (sendingMessageDiv) {
                    sendingMessageDiv.style.display = 'block';
                }
                // El formulario se enviará normalmente ya que no se llamó a preventDefault()
            }
        });
    }
});
