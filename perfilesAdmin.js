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
                    <p><strong>Nombre:</strong> <span id="nombre-${index}">${user.nombre} ${user.apellido1} ${user.apellido2}</span></p>
                </div>
                <div class="card-body">
                    <p><strong>Rut:</strong> <span id="rut-${index}">${user.rut}</p>
                    <p><strong>Tipo de Usuario: </strong><span id="tipoUsuario-${index}">${user.tipoUsuario}</p>
                    <p><strong>Carrera:</strong> <span id="carrera-${index}">${user.carrera}</p>
                    <p><strong>Teléfono:</strong> <span id="telefono-${index}">${user.telefono}</p>
                    <p><strong>Correo:</strong> <span id="correo-${index}">${user.correo}</p>
                    <button class="btn btn-primary" onclick="modificarDatos(${index})">Modificar</button>
                    <button class="btn btn-danger" onclick="darDeBaja(${index})">Dar de Baja</button>
                </div>
            </div>
        `;
        usersContainer.appendChild(userDiv);
    });
}

function darDeBaja(index) {
    // Obtener el contenedor de la tarjeta actual
    const userDiv = document.getElementById(`user-${index}`);
    if (userDiv) {
        const downedUsersContainer = document.getElementById('downedUsers');
        const clonedCard = userDiv.cloneNode(true);

        // Crear o buscar el botón "Modificar"
        let modificarButton = clonedCard.querySelector('.btn-primary');
        if (!modificarButton) {
            modificarButton = document.createElement('button');
            modificarButton.textContent = 'Modificar';
            modificarButton.className = 'btn btn-primary me-2'; // Espaciado a la derecha
            modificarButton.onclick = () => modificarDatos(index);
        }

        // Crear o buscar el botón "Restaurar"
        let restaurarButton = clonedCard.querySelector('.btn-success');
        if (!restaurarButton) {
            restaurarButton = document.createElement('button');
            restaurarButton.textContent = 'Restaurar';
            restaurarButton.className = 'btn btn-success';
            restaurarButton.onclick = () => restaurarUsuario(index);
        } else {
            restaurarButton.textContent = 'Restaurar';
            restaurarButton.onclick = () => restaurarUsuario(index);
        }

        // Asegurarse de que los botones estén en el orden correcto
        const cardBody = clonedCard.querySelector('.card-body');
        const dataElements = Array.from(cardBody.querySelectorAll('p')); // Mantener datos originales

        // Limpiar el contenido del body y reinsertar los datos
        cardBody.innerHTML = '';
        dataElements.forEach(el => cardBody.appendChild(el)); // Volver a agregar los datos originales

        // Agregar los botones en el orden correcto
        cardBody.appendChild(modificarButton);
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

        // Crear o buscar el botón "Modificar"
        let modificarButton = clonedCard.querySelector('.btn-primary');
        if (!modificarButton) {
            modificarButton = document.createElement('button');
            modificarButton.textContent = 'Modificar';
            modificarButton.className = 'btn btn-primary me-2'; // Espaciado a la derecha
            modificarButton.onclick = () => modificarDatos(index);
        }

        // Crear o buscar el botón "Dar de Baja"
        let darDeBajaButton = clonedCard.querySelector('.btn-danger');
        if (!darDeBajaButton) {
            darDeBajaButton = document.createElement('button');
            darDeBajaButton.className = 'btn btn-danger';
            darDeBajaButton.textContent = 'Dar de Baja';
            darDeBajaButton.onclick = () => darDeBaja(index);
        } else {
            darDeBajaButton.textContent = 'Dar de Baja';
            darDeBajaButton.onclick = () => darDeBaja(index);
        }

        // Asegurarse de que los botones estén en el orden correcto sin eliminar los datos
        const cardBody = clonedCard.querySelector('.card-body');
        const dataElements = Array.from(cardBody.querySelectorAll('p')); // Mantener datos

        // Limpiar el contenido del body y reinsertar los datos
        cardBody.innerHTML = ''; 
        dataElements.forEach(el => cardBody.appendChild(el)); // Volver a agregar los datos

        // Agregar los botones en orden
        cardBody.appendChild(modificarButton);
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
    const rut = document.getElementById('rut').value;
    const tipoUsuario = document.getElementById('tipoUsuario').value;
    const carrera = document.getElementById('carrera').value;
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('correo').value;
  
    // Validar que todos los campos estén llenos
    if (!nombre || !apellido1 || !apellido2 || !rut || !tipoUsuario || !carrera || !telefono || !correo) {
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
            <p><strong>Tipo de Usuario: </strong> <span id="tipoUsuario-${newIndex}">${tipoUsuario}</span></p>
            <p><strong>Carrera:</strong> <span id="carrera-${newIndex}">${carrera}</span></p>
            <p><strong>Teléfono:</strong> <span id="telefono-${newIndex}">${telefono}</span></p>
            <p><strong>Correo:</strong> <span id="correo-${newIndex}">${correo}</span></p>
            <button class="btn btn-primary" onclick="modificarDatos(${newIndex})">Modificar</button>
            <button class="btn btn-danger" onclick="darDeBaja(${newIndex})">Dar de Baja</button>
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
    const tipoUsuarioActual = document.querySelector(`#tipoUsuario-${index}`).innerText;
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
                  <label for="editarTipoUsuario" class="form-label">Tipo de Usuario</label>
                  <select type="text" class="form-control" id="editarTipoUsuario" value="${tipoUsuarioActual}">
                        <option value="${tipoUsuarioActual}" class="custom-select-option">-------------</option>
                        <option value="Super Administrador" class="custom-select-option">Super Administrador</option>
                        <option value="Pañolero" class="custom-select-option">Pañolero</option>
                        <option value="Coordinador de Carrera" class="custom-select-option">Coordinador de Carrera</option>
                        <option value="Docente" class="custom-select-option">Docente</option>
                        <option value="Alumno" class="custom-select-option">Alumno</option>
                  <select>
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
    const nuevoTipoUsuario = document.getElementById('editarTipoUsuario').value;
    const nuevaCarrera = document.getElementById('editarCarrera').value;
    const nuevoTelefono = document.getElementById('editarTelefono').value;
    const nuevoCorreo = document.getElementById('editarCorreo').value;

    // Actualizar los valores en la card
    document.querySelector(`#nombre-${index}`).innerText = nuevoNombre;
    document.querySelector(`#rut-${index}`).innerText = nuevoRut;
    document.querySelector(`#tipoUsuario-${index}`).innerText = nuevoTipoUsuario;
    document.querySelector(`#carrera-${index}`).innerText = nuevaCarrera;
    document.querySelector(`#telefono-${index}`).innerText = nuevoTelefono;
    document.querySelector(`#correo-${index}`).innerText = nuevoCorreo;

    // Cerrar el modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalEditar'));
    modal.hide();
}