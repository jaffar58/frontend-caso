document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Para evitar el envío real del formulario
    
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;
    const tipoReporte = document.getElementById('tipoReporte').value;

    // Aquí puedes procesar o mostrar los datos, por ejemplo:
    console.log('Nombre:', nombre);
    console.log('Email:', email);
    console.log('Mensaje:', mensaje);
    console.log('Tipo de Reporte:', tipoReporte);

    // Hacer algo con la información...
});

const tipoReporteSelect = document.getElementById('tipoReporte');
const recursoInput = document.getElementById('recursoInput');
const usuarioInput = document.getElementById('usuarioInput');

// Escuchamos el evento de cambio en el select
tipoReporteSelect.addEventListener('change', function() {
    // Ocultamos todos los campos extra inicialmente
    recursoInput.style.display = 'none';
    usuarioInput.style.display = 'none';

    // Si se selecciona 'Devoluciones fuera de plazo de recurso', mostramos el campo adicional de recursos
    if (tipoReporteSelect.value === 'consulta' && tipoReporteSelect.selectedIndex != 4) {
        recursoInput.style.display = 'block';
    }
    // Si se selecciona 'Devoluciones fuera de plazo de usuario', mostramos el campo adicional de usuario
    else if (tipoReporteSelect.value === 'consulta' && tipoReporteSelect.selectedIndex === 4) {
        usuarioInput.style.display = 'block';
    }
});

// Array para almacenar los reportes generados
let reportes = [];

// Función para generar un reporte
document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const tipoReporte = document.getElementById('tipoReporte').value;
    const mensaje = document.getElementById('mensaje').value;

    // Crear un objeto de reporte
    const reporte = {
        nombre,
        email,
        tipoReporte,
        mensaje
    };

    // Guardar el reporte en el array
    reportes.push(reporte);

    // Mostrar los reportes en la sección "Ver Reportes"
    mostrarReportes();

    // Limpiar el formulario
    document.getElementById('formulario').reset();
});

// Función para mostrar los reportes en la sección "Ver Reportes"
function mostrarReportes() {
    const container = document.getElementById('reportesContainer');
    container.innerHTML = ''; // Limpiar el contenedor

    // Crear una tarjeta para cada reporte
    reportes.forEach(reporte => {
        const card = `
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="https://via.placeholder.com/150" class="img-fluid rounded-start" alt="imagen">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${reporte.tipoReporte}</h5>
                            <p class="card-text"><strong>Nombre:</strong> ${reporte.nombre}</p>
                            <p class="card-text"><strong>Email:</strong> ${reporte.email}</p>
                            <p class="card-text"><strong>Mensaje:</strong> ${reporte.mensaje}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}