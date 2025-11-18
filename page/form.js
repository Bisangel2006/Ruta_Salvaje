document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('contacform');
    if (!form) return;

    form.addEventListener('submit', function(event){
        event.preventDefault(); // evita recarga

        // obtener valores (IDs normalizados a minúsculas y sin espacios)
        const nombre = document.getElementById('nombre')?.value.trim() || '';
        const email  = document.getElementById('mail')?.value.trim() || '';
        const cell   = document.getElementById('cell')?.value.trim() || '';
        const ciudad = document.getElementById('ciudad')?.value.trim() || '';
        const codigo = document.getElementById('codigo-postal')?.value.trim() || '';

        // validación simple
        if (!nombre || !email || !cell) {
            alert('Por favor completa los campos obligatorios.');
            return;
        }

        // aquí enviar por fetch / mostrar mensaje / etc.
        alert('¡Gracias por contactarnos, ' + nombre + '!');
        form.reset();
        form.classList.remove('was-validated');
    });
});