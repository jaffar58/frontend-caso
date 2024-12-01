document.getElementById('uploadExcel').addEventListener('change', async function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function (e) {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                // Leer la primera hoja del archivo Excel
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];

                // Convertir la hoja a JSON
                const usuarios = XLSX.utils.sheet_to_json(sheet);

                // Renderizar los usuarios en la página
                mostrarUsuarios(usuarios);
            } catch (error) {
                console.error('Error al procesar el archivo Excel:', error);
                alert('Hubo un problema al leer el archivo. Asegúrate de que sea un archivo Excel válido.');
            }
        };

        reader.readAsArrayBuffer(file);
    }
});

function mostrarUsuarios(usuarios) {
    const usersContainer = document.getElementById('users');
    usersContainer.innerHTML = ''; // Limpiar los usuarios previos

    usuarios.forEach((user, index) => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user', 'col-12', 'col-sm-12', 'col-md-6', 'col-lg-4', 'col-xl-4', 'col-xxl-3');
        userDiv.id = `user-${index}`;
        userDiv.innerHTML = `
        <div class="card m-auto mb-4">
          <div class="card-header">
            <p><strong>Nombre:</strong> ${nombre} ${apellido1} ${apellido2}</p>
          </div>
          <div class="card-body">
            <p><strong>Rut:</strong> ${rut}</p>
            <p><strong>Carrera:</strong> ${carrera}</p>
            <p><strong>Teléfono:</strong> ${telefono}</p>
            <p><strong>Correo:</strong> ${correo}</p>
            <button class="btn btn-danger" onclick="abrirModalDarDeBaja(${newIndex})">Dar de Baja</button>
          </div>
        </div>
      `;
        usersContainer.appendChild(userDiv);
    });
}

function darDeBaja(index, mensaje) {
  // Obtener el contenedor de la tarjeta actual
  const userDiv = document.getElementById(`user-${index}`);
  if (userDiv) {
      const downedUsersContainer = document.getElementById('downedUsers');
      const clonedCard = userDiv.cloneNode(true);

      // Crear o buscar el botón "Restaurar"
      let restaurarButton = clonedCard.querySelector('.btn-success');
      if (!restaurarButton) {
          restaurarButton = document.createElement('button');
          restaurarButton.textContent = 'Desbloquear';
          restaurarButton.className = 'btn btn-success';
          restaurarButton.onclick = () => restaurarUsuario(index);
      } else {
          restaurarButton.textContent = 'Desbloquear';
          restaurarButton.onclick = () => restaurarUsuario(index);
      }

      // Asegurarse de que los botones estén en el orden correcto
      const cardBody = clonedCard.querySelector('.card-body');
      const dataElements = Array.from(cardBody.querySelectorAll('p')); // Mantener datos originales

      // Limpiar el contenido del body y reinsertar los datos
      cardBody.innerHTML = '';
      dataElements.forEach(el => cardBody.appendChild(el)); // Volver a agregar los datos originales

      // Agregar el mensaje de baja
      const mensajeElement = document.createElement('p');
      mensajeElement.className = 'mensaje-baja'; // Estilo opcional
      mensajeElement.textContent = `Razon del bloqueo: ${mensaje}`;
      cardBody.appendChild(mensajeElement);

      // Agregar el botón "Restaurar"
      cardBody.appendChild(restaurarButton);

      // Agregar la tarjeta clonada a "Perfiles de Baja"
      downedUsersContainer.appendChild(clonedCard);

      // Eliminar la tarjeta original de "Perfiles"
      userDiv.remove();
  }
}

function restaurarUsuario(index) {
  const userDiv = document.getElementById(`user-${index}`);
  if (userDiv) {
      const usersContainer = document.getElementById('users');
      const clonedCard = userDiv.cloneNode(true);

      // Crear o buscar el botón "Dar de Baja"
      let darDeBajaButton = clonedCard.querySelector('.btn-danger');
      if (!darDeBajaButton) {
          darDeBajaButton = document.createElement('button');
          darDeBajaButton.className = 'btn btn-danger';
          darDeBajaButton.textContent = 'Bloquear';
          darDeBajaButton.onclick = () => abrirModalDarDeBaja(index);
      } else {
          darDeBajaButton.textContent = 'Bloquear';
          darDeBajaButton.onclick = () => abrirModalDarDeBaja(index);
      }

      // Asegurarse de que los botones estén en el orden correcto
      const cardBody = clonedCard.querySelector('.card-body');
      const dataElements = Array.from(cardBody.querySelectorAll('p')); 

      // Eliminar el mensaje de baja (buscado específicamente por clase "mensaje-baja")
      const mensajeBajaElement = clonedCard.querySelector('.mensaje-baja');
      if (mensajeBajaElement) {
          mensajeBajaElement.remove(); // Asegurarse de que se elimine el mensaje
      }

      // Limpiar el contenido del body y reinsertar los datos
      cardBody.innerHTML = '';
      dataElements.forEach(el => {
          // Filtrar para no incluir el mensaje de baja si se quedó en los datos
          if (!el.classList.contains('mensaje-baja')) {
              cardBody.appendChild(el);
          }
      });

      // Agregar el botón "Dar de Baja" en orden
      cardBody.appendChild(darDeBajaButton);

      // Añadir la card clonada al contenedor
      usersContainer.appendChild(clonedCard);

      // Eliminar la tarjeta original
      userDiv.remove();
  }
}

document.getElementById('saveUserButton').addEventListener('click', function () {
    const nombre = document.getElementById('nombre').value;
    const apellido1 = document.getElementById('apellido1').value;
    const apellido2 = document.getElementById('apellido2').value;
    const rut = document.getElementById('rut').value;;
    const carrera = document.getElementById('carrera').value;
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('correo').value;
  
    // Validar que todos los campos estén llenos
    if (!nombre || !apellido1 || !apellido2 || !rut || !carrera || !telefono || !correo) {
      alert('Por favor, completa todos los campos.');
      return;
    }
  
    // Crear un nuevo usuario en la sección de Perfiles
    const usersContainer = document.getElementById('users');
    const newIndex = usersContainer.childElementCount; // Usar el número de elementos como índice
    const userDiv = document.createElement('div');
    userDiv.classList.add('user', 'col-12', 'col-sm-12', 'col-md-6', 'col-lg-4', 'col-xl-4', 'col-xxl-3');
    userDiv.id = `user-${newIndex}`;
    userDiv.innerHTML = `
        <div class="card m-auto mb-4">
            <div class="card-header">
            <p><strong>Nombre:</strong> <span id="nombre-${newIndex}">${nombre} ${apellido1} ${apellido2}</span></p>
            </div>
            <div class="card-body">
            <p><strong>Rut:</strong> <span id="rut-${newIndex}">${rut}</span></p>
            <p><strong>Tipo de Usuario: </strong> <span id="tipoUsuario-${newIndex}">Alumno</span></p>
            <p><strong>Carrera:</strong> <span id="carrera-${newIndex}">${carrera}</span></p>
            <p><strong>Teléfono:</strong> <span id="telefono-${newIndex}">${telefono}</span></p>
            <p><strong>Correo:</strong> <span id="correo-${newIndex}">${correo}</span></p>
            <button class="btn btn-danger" onclick="darDeBaja(${newIndex})">Bloquear</button>
            </div>
        </div>
    `;
    usersContainer.appendChild(userDiv);
  
    // Limpiar el formulario
    document.getElementById('addUserForm').reset();
  
    // Cerrar el modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
    modal.hide();
  });

  function modificarDatos(index) {
    // Obtener los valores actuales
    const nombreActual = document.querySelector(`#nombre-${index}`).innerText;
    const rutActual = document.querySelector(`#rut-${index}`).innerText;
    const carreraActual = document.querySelector(`#carrera-${index}`).innerText;
    const telefonoActual = document.querySelector(`#telefono-${index}`).innerText;
    const correoActual = document.querySelector(`#correo-${index}`).innerText;

    // Crear un modal para editar los datos
    const modalHTML = `
      <div class="modal fade" id="modalEditar" tabindex="-1" aria-labelledby="modalEditarLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalEditarLabel">Modificar Datos</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form id="formEditar">
                <div class="mb-3">
                  <label for="editarNombre" class="form-label">Nombre</label>
                  <input type="text" class="form-control" id="editarNombre" value="${nombreActual}">
                </div>
                <div class="mb-3">
                  <label for="editarRut" class="form-label">RUT</label>
                  <input type="text" class="form-control" id="editarRut" value="${rutActual}">
                </div>
                
                <div class="mb-3">
                  <label for="editarCarrera" class="form-label">Carrera</label>
                  <input type="text" class="form-control" id="editarCarrera" value="${carreraActual}">
                </div>
                <div class="mb-3">
                  <label for="editarTelefono" class="form-label">Teléfono</label>
                  <input type="text" class="form-control" id="editarTelefono" value="${telefonoActual}">
                </div>
                <div class="mb-3">
                  <label for="editarCorreo" class="form-label">Correo</label>
                  <input type="email" class="form-control" id="editarCorreo" value="${correoActual}">
                </div>
                <button type="button" class="btn btn-primary" onclick="guardarCambios(${index})">Guardar Cambios</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;

    // Insertar el modal en el body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById('modalEditar'));
    modal.show();

    // Eliminar el modal del DOM después de cerrarlo
    document.getElementById('modalEditar').addEventListener('hidden.bs.modal', () => {
        document.getElementById('modalEditar').remove();
    });
}

function guardarCambios(index) {
    // Obtener los nuevos valores
    const nuevoNombre = document.getElementById('editarNombre').value;
    const nuevoRut = document.getElementById('editarRut').value;
    const nuevaCarrera = document.getElementById('editarCarrera').value;
    const nuevoTelefono = document.getElementById('editarTelefono').value;
    const nuevoCorreo = document.getElementById('editarCorreo').value;

    // Actualizar los valores en la card
    document.querySelector(`#nombre-${index}`).innerText = nuevoNombre;
    document.querySelector(`#rut-${index}`).innerText = nuevoRut;
    document.querySelector(`#carrera-${index}`).innerText = nuevaCarrera;
    document.querySelector(`#telefono-${index}`).innerText = nuevoTelefono;
    document.querySelector(`#correo-${index}`).innerText = nuevoCorreo;

    // Cerrar el modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalEditar'));
    modal.hide();
}

let perfilActual = null; // Variable para almacenar el perfil seleccionado

function abrirModalDarDeBaja(index) {
    perfilActual = index; // Guardar el índice del perfil actual
    const modal = new bootstrap.Modal(document.getElementById('darDeBajaModal'));
    modal.show();
}

document.getElementById('confirmarBaja').addEventListener('click', () => {
    const mensaje = document.getElementById('bajaMensaje').value.trim();
    if (mensaje === "") {
        alert("Por favor, ingrese un mensaje.");
        return;
    }
    // Realizar la operación de dar de baja con el índice almacenado
    darDeBaja(perfilActual, mensaje);
    perfilActual = null; // Limpiar la referencia
    const modal = bootstrap.Modal.getInstance(document.getElementById('darDeBajaModal'));
    modal.hide(); // Cerrar el modal
});