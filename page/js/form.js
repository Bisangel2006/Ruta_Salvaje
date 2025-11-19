document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contacform');
    const selectActividad = document.getElementById('actividad-select');
    const otraWrapper = document.getElementById('otra-wrapper');
    const otraInput = document.getElementById('actividad-otra');

    // Mostrar/ocultar campo "otra"
    function toggleOtra() {
        if (selectActividad.value === 'otra') {
            otraWrapper.style.display = 'block';
            otraInput.required = true;
        } else {
            otraWrapper.style.display = 'none';
            otraInput.required = false;
            otraInput.value = '';
        }
    }
    selectActividad.addEventListener('change', toggleOtra);

    // Leer parámetro ?actividad=... y prefijar el select / input
    const params = new URLSearchParams(window.location.search);
    const actividadParam = params.get('actividad');
    if (actividadParam) {
        const decoded = decodeURIComponent(actividadParam);
        // intentar seleccionar opción existente
        let matched = false;
        for (let i=0; i < selectActividad.options.length; i++) {
            const opt = selectActividad.options[i];
            if (opt.value.toLowerCase() === decoded.toLowerCase() || opt.text.toLowerCase() === decoded.toLowerCase()) {
                selectActividad.selectedIndex = i;
                matched = true;
                break;
            }
        }
        if (!matched) {
            // seleccionar "otra" y rellenar input
            const otraOpt = Array.from(selectActividad.options).find(o => o.value === 'otra');
            if (otraOpt) {
                selectActividad.value = 'otra';
                toggleOtra();
                otraInput.value = decoded;
            }
        } else {
            toggleOtra();
        }

        // desplazar al formulario y resaltar brevemente
        setTimeout(() => {
            form.scrollIntoView({ behavior: 'smooth', block: 'center' });
            form.classList.add('highlight');
            setTimeout(() => form.classList.remove('highlight'), 1200);
        }, 200);
    }

    // Validación y envío (simulado). Ajusta para enviar real con fetch si necesitas.
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // validación simple HTML5
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        const data = {
            nombre: document.getElementById('nombre').value.trim(),
            telefono: document.getElementById('cell').value.trim(),
            email: document.getElementById('mail').value.trim(),
            actividad: selectActividad.value === 'otra' ? (otraInput.value.trim() || 'Otra') : selectActividad.value,
            mensaje: document.getElementById('mensaje').value.trim()
        };

        // Demo: mostrar confirmación y reset
        alert('Formulario enviado:\n\n' + JSON.stringify(data, null, 2));
        form.reset();
        toggleOtra();
        form.classList.remove('was-validated');
    });
});
