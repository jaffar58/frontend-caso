// Función para mostrar las solicitudes en tarjetas
function mostrarListaSolicitudes() {
    const solicitudes = JSON.parse(sessionStorage.getItem('solicitudes')) || [];
    const contenedor = document.getElementById('contenedorSolicitudes');

    // Si no hay solicitudes, mostrar un mensaje
    if (solicitudes.length === 0) {
        contenedor.innerHTML = '<div class="col-12"><p>No hay solicitudes registradas.</p></div>';
        return;
    }

    // Crear una tarjeta para cada solicitud
    solicitudes.forEach(solicitud => {
        const card = document.createElement('div');
        card.classList.add('col-12','col-sm-12','col-md-6','col-lg-4','col-xl-3','col-xxl-3'); // Ajustar tamaño de la card en pantallas medianas
        card.innerHTML = `
            <div class="card m-auto mb-4">
                <div class="card-header">
                    <h5>Solicitud ID: ${solicitud.id}</h5>
                </div>
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        ${solicitud.productos.map(producto => `
                            <li class="list-group-item">${producto.nombre} - Cantidad: ${producto.cantidad}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
        contenedor.prepend(card);
    });
}

// Llamar la función cuando la página cargue
//window.onload = mostrarListaSolicitudes;