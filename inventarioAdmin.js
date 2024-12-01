// Función para dar de baja el producto
function darDeBaja(nombreProducto) {
    // Cargar el archivo JSON
    fetch('inventario.json')
        .then(response => response.json())
        .then(inventario => {
            const item = inventario.find(i => i.nombre === nombreProducto);
            if (item) {
                const cantidad = parseInt(document.querySelector(`#quantity`).value);
                if (cantidad > item.stock) {
                    alert('No hay suficiente stock para dar de baja');
                    return;
                }
                // Reducir el stock
                item.stock -= cantidad;
                // Actualizar la vista (volver a cargar el inventario)
                cargarInventario();
                alert(`Se dio de baja ${cantidad} de ${nombreProducto}`);
            } else {
                alert('Producto no encontrado');
            }
        })
        .catch(error => {
            console.error('Error al dar de baja:', error);
            alert('Hubo un problema al dar de baja el producto.');
        });
}

// Función para cargar y mostrar el inventario
async function cargarInventario() {
    try {
        const response = await fetch('inventario.json'); // Cambia la ruta si es necesario
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        
        const inventario = await response.json();
        const container = document.querySelector('.row.justify-content-center'); // Ajusta el selector según tu estructura HTML
        
        // Limpiar el contenedor antes de cargar los datos
        container.innerHTML = '';

        // Generar las tarjetas del inventario
        inventario.forEach(item => {
            const card = `
                <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4 me-auto">
                    <div class="card m-auto" style="width: 18rem;">
                        <img src="${item.imagen}" class="card-img-top" alt="${item.nombre}" height="280rem">
                        <div class="card-body">
                            <h5 class="card-title">${item.nombre}</h5>
                            <p class="card-text">${item.descripcion}</p>
                            <p class="card-text"><strong>En stock:</strong> ${item.stock}</p>
                            <form>
                                <label for="quantity-${item.nombre}">Cantidad a dar de baja (entre 1 y ${item.stock}):</label>
                                <input type="number" id="quantity-${item.nombre}" name="cantidad" min="1" max="${item.stock}" value="1" class="form-control mb-2 w-auto" style="width: 80px;">
                                
                                <!-- Contenedor para los botones -->
                                <div class="d-flex justify-content-start">
                                    <button class="btn btn-primary me-2" type="button" onclick="modificar('${item.nombre}')">Modificar</button>
                                    <button class="btn btn-danger" type="button" onclick="darDeBaja('${item.nombre}')">Dar de Baja</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        });
    } catch (error) {
        console.error(error);
        alert('Hubo un problema al cargar el inventario.');
    }
}

// Llamar a la función para cargar el inventario al cargar la página
//document.addEventListener('DOMContentLoaded', cargarInventario);