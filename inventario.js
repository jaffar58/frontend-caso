

function agregarALista(boton, name) {
    // Obtener el formulario asociado al botón
    const formulario = boton.closest('form'); // Encuentra el formulario más cercano al botón

    // Obtener los datos del formulario
    const cantidadProducto = formulario.querySelector('[name="cantidad"]').value;

    // Verificar si los datos no están vacíos
    if (!cantidadProducto) {
        alert('Por favor, completa todos los campos del formulario.');
        return;
    }

    let listaCompras = JSON.parse(sessionStorage.getItem('listaCompras')) || [];

    // Agrega el nuevo producto a la lista

    const producto = {
        nombre: name,
        cantidad: parseInt(cantidadProducto)
    };
    listaCompras.push(producto);

    // Guarda la lista actualizada en localStorage
    sessionStorage.setItem('listaCompras', JSON.stringify(listaCompras));

    // Crear un nuevo elemento de lista
    const lista = document.getElementById('lista');
    const item = document.createElement('li');
    item.classList.add('item');

    // Crear el contenido del item (nombre y precio)
    const textoItem = document.createElement('span');
    textoItem.textContent = `${name} - ${cantidadProducto}`;

    // Crear el botón de eliminar
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.onclick = () => {
        lista.removeChild(item); // Eliminar el item de la lista
    };

    // Añadir el texto y el botón al item
    item.appendChild(textoItem);
    item.appendChild(botonEliminar);

    // Añadir el item a la lista de compras
    lista.appendChild(item);

    // Limpiar los campos del formulario
    formulario.reset();
}

function enviarLista() {

    const listaCompras = JSON.parse(sessionStorage.getItem('listaCompras')) || [];
    const solicitudes = JSON.parse(sessionStorage.getItem('solicitudes')) || [];

    if (listaCompras.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de enviar.");
        return;
    }

    // Crear una nueva solicitud con un identificador único
    const nuevaSolicitud = {
        id: `solicitud-${Date.now()}`, // ID único basado en timestamp
        productos: listaCompras
    };

    // Guardar la nueva solicitud
    solicitudes.push(nuevaSolicitud);
    sessionStorage.setItem('solicitudes', JSON.stringify(solicitudes));

    // Limpiar el carrito actual
    sessionStorage.removeItem('listaCompras');

    // Redirige a la página de destino
    window.location.href = 'solicitudes.html';
  }

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
                                <label for="quantity">Cantidad (entre 1 y 5):</label>
                                <input type="number" id="quantity" name="cantidad" min="1" max="5"> 
                                <button class="btn btn-primary" type="button" onclick="agregarALista(this, '${item.nombre}')">Solicitar</button>
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