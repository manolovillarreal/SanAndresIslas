// Elementos del DOM
const comentarioForm = document.getElementById('comentarioForm');
const listaComentarios = document.getElementById('listaComentarios');
const nombreInput = document.getElementById('nombre');
const comentarioInput = document.getElementById('comentario');

// Variables de estado
let cargando = false;

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    cargarComentarios();
    configurarFormulario();
});

// Configurar el formulario
function configurarFormulario() {
    comentarioForm.addEventListener('submit', function(e) {
        e.preventDefault();
        enviarComentario();
    });
}

// Cargar comentarios existentes
async function cargarComentarios() {
    try {
        mostrarCargando();
        const response = await fetch('/comentarios');
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const comentarios = await response.json();
        mostrarComentarios(comentarios);
        
    } catch (error) {
        console.error('Error al cargar comentarios:', error);
        mostrarError('Error al cargar los comentarios. Por favor, recarga la página.');
    }
}

// Enviar nuevo comentario
async function enviarComentario() {
    if (cargando) return;
    
    const nombre = nombreInput.value.trim();
    const comentario = comentarioInput.value.trim();
    
    // Validación del lado del cliente
    if (!nombre || !comentario) {
        mostrarError('Por favor, completa todos los campos.');
        return;
    }
    
    if (nombre.length < 2) {
        mostrarError('El nombre debe tener al menos 2 caracteres.');
        return;
    }
    
    if (comentario.length < 10) {
        mostrarError('El comentario debe tener al menos 10 caracteres.');
        return;
    }
    
    try {
        cargando = true;
        deshabilitarFormulario();
        
        const response = await fetch('/comentarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, comentario })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || `Error ${response.status}`);
        }
        
        // Mostrar mensaje de éxito
        mostrarExito('¡Comentario enviado exitosamente!');
        
        // Limpiar el formulario
        comentarioForm.reset();
        
        // Recargar comentarios para mostrar el nuevo
        await cargarComentarios();
        
    } catch (error) {
        console.error('Error al enviar comentario:', error);
        mostrarError(error.message || 'Error al enviar el comentario. Por favor, inténtalo de nuevo.');
    } finally {
        cargando = false;
        habilitarFormulario();
    }
}

// Mostrar comentarios en el DOM
function mostrarComentarios(comentarios) {
    if (!comentarios || comentarios.length === 0) {
        listaComentarios.innerHTML = `
            <div class="loading">
                🏝️ Aún no hay comentarios. ¡Sé el primero en compartir tu experiencia sobre San Andrés!
            </div>
        `;
        return;
    }
    
    // Ordenar comentarios por fecha (más recientes primero)
    comentarios.sort((a, b) => b.id - a.id);
    
    const comentariosHTML = comentarios.map(comentario => `
        <div class="comentario-item" data-id="${comentario.id}">
            <div class="comentario-header">
                <span class="comentario-nombre">${escapeHtml(comentario.nombre)}</span>
                <span class="comentario-fecha">${escapeHtml(comentario.fecha)}</span>
            </div>
            <div class="comentario-texto">
                ${escapeHtml(comentario.comentario)}
            </div>
        </div>
    `).join('');
    
    listaComentarios.innerHTML = comentariosHTML;
    
    // Animar la entrada de los comentarios
    const items = listaComentarios.querySelectorAll('.comentario-item');
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Mostrar estado de carga
function mostrarCargando() {
    listaComentarios.innerHTML = `
        <div class="loading">
            🔄 Cargando comentarios...
        </div>
    `;
}

// Mostrar mensaje de error
function mostrarError(mensaje) {
    // Remover mensajes anteriores
    removerMensajes();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.innerHTML = `
        <strong>⚠️ Error:</strong> ${escapeHtml(mensaje)}
    `;
    
    comentarioForm.parentNode.insertBefore(errorDiv, comentarioForm);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
    
    // Hacer scroll al error
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Mostrar mensaje de éxito
function mostrarExito(mensaje) {
    // Remover mensajes anteriores
    removerMensajes();
    
    const exitoDiv = document.createElement('div');
    exitoDiv.className = 'success';
    exitoDiv.innerHTML = `
        <strong>✅ Éxito:</strong> ${escapeHtml(mensaje)}
    `;
    
    comentarioForm.parentNode.insertBefore(exitoDiv, comentarioForm);
    
    // Auto-remover después de 3 segundos
    setTimeout(() => {
        if (exitoDiv.parentNode) {
            exitoDiv.remove();
        }
    }, 3000);
}

// Remover mensajes existentes
function removerMensajes() {
    const mensajes = document.querySelectorAll('.error, .success');
    mensajes.forEach(mensaje => mensaje.remove());
}

// Deshabilitar formulario durante el envío
function deshabilitarFormulario() {
    const button = comentarioForm.querySelector('button');
    const inputs = comentarioForm.querySelectorAll('input, textarea');
    
    button.disabled = true;
    button.textContent = 'Enviando...';
    inputs.forEach(input => input.disabled = true);
}

// Habilitar formulario después del envío
function habilitarFormulario() {
    const button = comentarioForm.querySelector('button');
    const inputs = comentarioForm.querySelectorAll('input, textarea');
    
    button.disabled = false;
    button.textContent = 'Enviar Comentario';
    inputs.forEach(input => input.disabled = false);
}

// Función para escapar HTML y prevenir XSS
function escapeHtml(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}

// Función para manejar errores de red
function manejarErrorRed(error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
        return 'Error de conexión. Por favor, verifica que el servidor esté ejecutándose.';
    }
    return error.message || 'Error desconocido';
}

// Agregar efectos visuales adicionales
document.addEventListener('DOMContentLoaded', function() {
    // Efecto parallax suave en el header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (header) {
            header.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Animación de entrada para las secciones
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Observar secciones para animar
    const secciones = document.querySelectorAll('.introduccion, .galeria, .comentarios-section');
    secciones.forEach(seccion => {
        seccion.style.opacity = '0';
        seccion.style.transform = 'translateY(30px)';
        seccion.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(seccion);
    });
});

// Manejo de imágenes con placeholder
document.addEventListener('DOMContentLoaded', function() {
    const imagenes = document.querySelectorAll('.galeria-item img');
    
    imagenes.forEach((img, index) => {
        // Crear placeholder colorido
        const colores = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
        const color = colores[index % colores.length];
        
        img.style.background = `linear-gradient(135deg, ${color}33, ${color}66)`;
        img.style.display = 'flex';
        img.style.alignItems = 'center';
        img.style.justifyContent = 'center';
        img.style.fontSize = '4rem';
        img.style.color = color;
        
        // Agregar emoji según el tipo de imagen
        const emojis = ['🏖️', '🌊', '🎵', '🦀', '🥥', '🏝️'];
        
        img.onerror = function() {
            this.style.fontSize = '4rem';
            this.innerHTML = emojis[index % emojis.length];
        };
        
        // Simular carga de imagen con placeholder
        img.alt = img.alt || 'Imagen de San Andrés';
        
        // Si no hay src, mostrar el placeholder
        if (!img.src || img.src.endsWith('/')) {
            img.innerHTML = emojis[index % emojis.length];
        }
    });
});

// Validación en tiempo real
document.addEventListener('DOMContentLoaded', function() {
    // Validación del nombre
    nombreInput.addEventListener('input', function() {
        const valor = this.value.trim();
        if (valor.length > 0 && valor.length < 2) {
            this.style.borderColor = '#ff5722';
        } else if (valor.length >= 2) {
            this.style.borderColor = '#4caf50';
        } else {
            this.style.borderColor = '#e0f2f1';
        }
    });
    
    // Validación del comentario
    comentarioInput.addEventListener('input', function() {
        const valor = this.value.trim();
        if (valor.length > 0 && valor.length < 10) {
            this.style.borderColor = '#ff5722';
        } else if (valor.length >= 10) {
            this.style.borderColor = '#4caf50';
        } else {
            this.style.borderColor = '#e0f2f1';
        }
        
        // Contador de caracteres
        const contador = this.parentNode.querySelector('.contador');
        if (!contador) {
            const span = document.createElement('span');
            span.className = 'contador';
            span.style.cssText = 'font-size: 0.8rem; color: #666; margin-top: 5px; display: block;';
            this.parentNode.appendChild(span);
        }
        
        const contadorSpan = this.parentNode.querySelector('.contador');
        contadorSpan.textContent = `${valor.length} caracteres (mínimo 10)`;
        
        if (valor.length >= 10) {
            contadorSpan.style.color = '#4caf50';
        } else if (valor.length > 0) {
            contadorSpan.style.color = '#ff5722';
        } else {
            contadorSpan.style.color = '#666';
        }
    });
});