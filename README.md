# San Andrés - Sitio Web Turístico

Una aplicación web completa sobre la isla de San Andrés, Colombia, que presenta información turística, galería de imágenes y un sistema interactivo de comentarios.

## 🏝️ Características

- **Información turística**: Introducción atractiva sobre San Andrés como destino caribeño
- **Galería interactiva**: Grid responsivo con efectos hover elegantes
- **Sistema de comentarios**: Formulario interactivo con validación y almacenamiento en tiempo real
- **Diseño responsivo**: Adaptado para dispositivos móviles y de escritorio
- **Tema caribeño**: Colores inspirados en el mar Caribe (azules, verdes, arena)

## 🚀 Tecnologías

### Backend
- **Node.js** - Runtime de JavaScript
- **Express** - Framework web minimalista
- **Almacenamiento en memoria** - Array para comentarios

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con gradientes y animaciones
- **JavaScript ES6+** - Funcionalidad interactiva pura (sin librerías)

## 📁 Estructura del Proyecto

```
san-andres-website/
├── server.js              # Servidor Express principal
├── package.json           # Dependencias y scripts
├── README.md              # Este archivo
├── public/                # Archivos estáticos
│   ├── index.html         # Página principal
│   ├── css/
│   │   └── styles.css     # Estilos principales
│   ├── js/
│   │   └── app.js         # Lógica del frontend
│   └── images/            # Galería de imágenes
│       └── README.md      # Información sobre imágenes
└── .github/
    └── copilot-instructions.md
```

## 🛠️ Instalación y Uso

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm (incluido con Node.js)

### Pasos de instalación

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Iniciar el servidor**:
   ```bash
   npm start
   ```

3. **Abrir en el navegador**:
   ```
   http://localhost:3000
   ```

## 🌐 Endpoints de la API

### GET /
- **Descripción**: Sirve la página principal
- **Respuesta**: Archivo HTML

### GET /comentarios
- **Descripción**: Obtiene todos los comentarios
- **Respuesta**: Array JSON con comentarios

### POST /comentarios
- **Descripción**: Crea un nuevo comentario
- **Body**: 
  ```json
  {
    "nombre": "string",
    "comentario": "string"
  }
  ```
- **Respuesta**: Comentario creado con ID y fecha

## ✨ Funcionalidades Destacadas

### Galería de Imágenes
- Grid responsivo que se adapta al tamaño de pantalla
- Efectos hover con overlays informativos
- Placeholders coloridos con emojis temáticos
- Transiciones suaves y animaciones

### Sistema de Comentarios
- Validación en tiempo real
- Contador de caracteres
- Mensajes de error y éxito
- Animaciones de entrada
- Persistencia en memoria del servidor

### Diseño Responsivo
- Mobile-first approach
- Breakpoints para tablet y desktop
- Tipografía escalable
- Navegación optimizada

## 🎨 Tema Visual

### Paleta de Colores
- **Azul Caribe**: #0077be
- **Turquesa**: #00bcd4  
- **Agua**: #4dd0e1
- **Fondo**: Gradientes suaves azul-blanco

### Tipografía
- Font family: Arial, sans-serif
- Tamaños responsivos
- Jerarquía visual clara

## 📱 Compatibilidad

- ✅ Chrome (versión 80+)
- ✅ Firefox (versión 75+)
- ✅ Safari (versión 13+)
- ✅ Edge (versión 80+)
- ✅ Dispositivos móviles iOS y Android

## 🔧 Desarrollo

### Scripts disponibles
- `npm start` - Inicia el servidor en modo producción
- `npm run dev` - Inicia el servidor (alias de start)

### Estructura de archivos estáticos
Todos los archivos en `/public` son servidos estáticamente por Express.

## 🌟 Próximas Mejoras

- [ ] Persistencia de datos con base de datos
- [ ] Autenticación de usuarios
- [ ] Moderación de comentarios
- [ ] Carga de imágenes reales
- [ ] Sistema de calificaciones
- [ ] Integración con redes sociales
- [ ] Múltiples idiomas (español/inglés)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para detalles.

## 📞 Contacto

Proyecto creado para mostrar las bellezas de San Andrés, Colombia 🇨🇴

---

**¡Descubre la magia del Caribe colombiano! 🏝️🌊**