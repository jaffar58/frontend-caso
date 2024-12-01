let currentId = 1; // Contador para generar IDs únicas

// Actualizar el campo de ID automáticamente al abrir el formulario
function generarIdUnico() {
    document.getElementById('itemId').value = `OBJ-${currentId}`;
}



const itemImageInput = document.getElementById('itemImage');
const imagePreview = document.getElementById('imagePreview');

itemImageInput.addEventListener('change', function () {
    const file = this.files[0];

    // Verificar que se haya seleccionado un archivo válido
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();

        // Al cargar la imagen, mostrar una vista previa
        reader.onload = function (event) {
            imagePreview.innerHTML = `
                <img src="${event.target.result}" alt="Previsualización" class="img-fluid rounded" style="max-height: 200px;">
            `;
        };

        reader.readAsDataURL(file); // Leer el archivo como Data URL
    } else {
        imagePreview.innerHTML = ''; // Limpiar la vista previa si no es válido
    }
});

document.getElementById('addItemForm').addEventListener('focusin', function () {
    generarIdUnico();
});

document.getElementById('addItemForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtener valores del formulario
    const id = document.getElementById('itemId').value;
    const name = document.getElementById('itemName').value;
    const description = document.getElementById('itemDescription').value;
    const stock = document.getElementById('itemStock').value;
    const imageUrl = document.getElementById('itemImage').value || 'https://via.placeholder.com/150';

    // Crear una nueva tarjeta de inventario
    const newCard = `
        <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4 me-auto">
            <div class="card m-auto" style="width: 18rem;">
                <img src="${imageUrl}" class="card-img-top" alt="${name}" height="280rem">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">${description}</p>
                    <p class="card-text"><strong>En stock:</strong> ${stock}</p>
                    <form>
                        <label for="quantity-${id}">Cantidad a dar de baja (entre 1 y ${stock}):</label>
                        <input type="number" id="quantity-${id}" name="cantidad" min="1" max="${stock}" value="1" class="form-control mb-2 w-auto" style="width: 80px;">
                        <div class="d-flex justify-content-start">
                            <button class="btn btn-primary me-2" type="button" onclick="modificar('${id}')">Modificar</button>
                            <button class="btn btn-danger" type="button" onclick="darDeBaja('${id}')">Dar de Baja</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

    // Agregar la tarjeta al contenedor del inventario
    document.getElementById('inventario-container').innerHTML += newCard;

    currentId++;

    // Limpiar el formulario y la vista previa
    document.getElementById('addItemForm').reset();
    document.getElementById('itemId').value = ''; // Resetea el ID para mostrar el próximo generado
    document.getElementById('imagePreview').innerHTML = '';
});