# Guía de Desarrollo Web - Desde HTML hasta Bases de Datos

Una guía completa para aprender desarrollo web desde los fundamentos hasta conceptos avanzados, diseñada para principiantes y desarrolladores en formación.

## 📚 Tabla de Contenidos

1. [HTML: El Esqueleto de la Web](#html-el-esqueleto-de-la-web)
2. [CSS: El Estilo de tu Web](#css-el-estilo-de-tu-web)
3. [Control de Versiones con Git](#control-de-versiones-con-git)
4. [Estructura de una Página Web](#estructura-de-una-página-web)
5. [Diseño Responsivo](#diseño-responsivo)
6. [Tipos de Páginas Web](#tipos-de-páginas-web)
7. [APIs: Conectando Servicios](#apis-conectando-servicios)
8. [Bases de Datos](#bases-de-datos)
9. [Historia del Desarrollo Web](#historia-del-desarrollo-web)

---

## 🌐 HTML: El Esqueleto de la Web

HTML (HyperText Markup Language) es el lenguaje de marcado estándar para crear páginas web. Define la estructura y el contenido de una página mediante elementos y etiquetas.

### Estructura básica de HTML

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Mi página</title>
</head>
<body>
    <h1>Título principal</h1>
    <p>Un párrafo de texto</p>
</body>
</html>
```

### Elementos principales

- **📝 Encabezados:** `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`
- **📄 Párrafos:** `<p>`
- **🔗 Enlaces:** `<a>`
- **🖼️ Imágenes:** `<img>`
- **📋 Listas:** `<ul>`, `<ol>`, `<li>`
- **📊 Tablas:** `<table>`, `<tr>`, `<td>`

### 💡 ¿Sabías que?

HTML fue creado por Tim Berners-Lee en 1991. La primera versión tenía solo 18 elementos.

### ✅ Mejores prácticas

- Usa HTML semántico
- Incluye atributos alt en imágenes
- Estructura con header, main y footer
- Valida tu código HTML

---

## 🎨 CSS: El Estilo de tu Web

CSS (Cascading Style Sheets) es el lenguaje que usamos para dar estilo a los documentos HTML. Controla la presentación, el diseño y la apariencia de las páginas web.

### Sintaxis básica

```css
/* Selector { propiedad: valor; } */
h1 {
    color: #333;
    font-size: 2rem;
    margin-bottom: 1rem;
}

.mi-clase {
    background-color: #f0f0f0;
    padding: 20px;
    border-radius: 8px;
}
```

### Conceptos clave

#### 🎯 Selectores
Identifican los elementos HTML a los que aplicar estilos

#### 📦 Box Model
Margin, border, padding y content

#### 🏗️ Flexbox & Grid
Sistemas modernos de diseño

#### 🎭 Animaciones
Transiciones y keyframes

### 📚 Recursos recomendados

- MDN CSS Guide
- CSS Tricks
- Can I Use

---

## 🔄 Control de Versiones con Git

Git es un sistema de control de versiones distribuido que permite rastrear cambios en el código y colaborar con otros desarrolladores.

### Comandos esenciales

```bash
# Inicializar repositorio
git init

# Agregar archivos
git add .

# Hacer commit
git commit -m "Mi primer commit"

# Conectar con GitHub
git remote add origin https://github.com/usuario/repo.git

# Subir cambios
git push -u origin main
```

### Flujo de trabajo básico

1. **Modificar archivos** - Realiza cambios en tu código
2. **Stage (git add)** - Prepara los cambios
3. **Commit** - Guarda los cambios
4. **Push** - Sube a GitHub

### 🐙 GitHub

Plataforma para alojar repositorios Git y colaborar con otros desarrolladores.

- Repositorios públicos y privados
- Issues y pull requests
- GitHub Pages para hosting

---

## 🏗️ Estructura de una Página Web

Una página web bien estructurada mejora la accesibilidad, el SEO y la experiencia del usuario.

### Estructura semántica HTML5

```
<header> - Logo, navegación principal
<nav> - Menú de navegación
<main> - Contenido principal
    <article> - Contenido independiente
    <section> - Secciones temáticas
<aside> - Contenido complementario
<footer> - Información de contacto, copyright
```

### Organización de archivos

```
proyecto-web/
├── index.html
├── css/
│   ├── styles.css
│   └── reset.css
├── js/
│   └── script.js
├── images/
│   ├── logo.png
│   └── hero-bg.jpg
├── pages/
│   ├── about.html
│   └── contact.html
└── README.md
```

### 🔍 SEO Tips

- Usa etiquetas semánticas
- Incluye meta descripciones
- Estructura URLs amigables
- Optimiza imágenes
- Crea un sitemap.xml

---

## 📱 Diseño Responsivo

El diseño responsivo asegura que tu sitio web se vea y funcione bien en todos los dispositivos y tamaños de pantalla.

### Media Queries

```css
/* Estilos base para móviles */
.container {
    width: 100%;
    padding: 15px;
}

/* Tablets */
@media (min-width: 768px) {
    .container {
        max-width: 750px;
        margin: 0 auto;
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .container {
        max-width: 1200px;
    }
}
```

### Principios del diseño responsivo

#### 🔲 Grid flexible
Usa unidades relativas como %, rem, em

#### 🖼️ Imágenes flexibles
max-width: 100% para imágenes adaptables

#### 📺 Media queries
Adapta estilos según el viewport

#### 📱 Mobile first
Diseña primero para móviles

### Viewport meta tag

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

## 🌍 Tipos de Páginas Web

### 📄 Páginas Estáticas

Contenido fijo que no cambia a menos que se modifique el código.

#### Características:
- Solo HTML, CSS y JavaScript
- Rápidas de cargar
- Fáciles de hospedar
- Ideales para portfolios, landing pages
- No requieren servidor backend

#### Ventajas:
- ✅ Velocidad
- ✅ Seguridad
- ✅ Bajo costo
- ✅ SEO friendly

#### Ejemplo de código:
```html
<!-- index.html -->
<div class="content">
    <h1>Mi Portfolio</h1>
    <p>Contenido estático</p>
</div>
```

### 🖥️ Páginas Dinámicas

Contenido generado en tiempo real desde una base de datos.

#### Características:
- Usan lenguajes backend (PHP, Python, Node.js)
- Conectan con bases de datos
- Contenido personalizado por usuario
- Ideales para e-commerce, redes sociales
- Requieren servidor y hosting especializado

#### Ventajas:
- ✅ Interactividad
- ✅ Personalización
- ✅ Escalabilidad
- ✅ CMS integrado

#### Ejemplo de código:
```javascript
// app.js (Node.js)
app.get('/productos', async (req, res) => {
    const productos = await db.query('SELECT * FROM productos');
    res.render('productos', { productos });
});
```

---

## 🔌 APIs: Conectando Servicios

Las APIs (Application Programming Interfaces) permiten que diferentes aplicaciones se comuniquen entre sí.

### ¿Qué es una API?

Una API es un conjunto de definiciones y protocolos que permite que un software se comunique con otro. Es como un camarero en un restaurante: toma tu pedido (request) y te trae la comida (response).

### Ejemplo de API REST

```javascript
// Obtener datos de una API
fetch('https://api.ejemplo.com/usuarios')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Mostrar los datos en la página
    })
    .catch(error => console.error('Error:', error));
```

### Métodos HTTP comunes

- **GET** - Obtener datos
- **POST** - Crear nuevos recursos
- **PUT** - Actualizar recursos
- **DELETE** - Eliminar recursos

### APIs populares

- ☁️ **Weather API** - Datos meteorológicos en tiempo real
- 🐦 **Twitter API** - Integración con redes sociales
- 🗺️ **Google Maps API** - Mapas y geolocalización
- 💳 **Stripe API** - Procesamiento de pagos

### 🛠️ Herramientas

- Postman - Prueba APIs
- Swagger - Documentación
- JSON Viewer - Visualiza respuestas

---

## 🗄️ Bases de Datos

Las bases de datos almacenan y organizan la información que usan las aplicaciones web dinámicas.

### Tipos de bases de datos

#### 📊 SQL (Relacionales)

Datos estructurados en tablas con relaciones

**Opciones populares:**
- MySQL
- PostgreSQL
- SQLite

**Ejemplo de consulta:**
```sql
SELECT * FROM usuarios 
WHERE edad > 18 
ORDER BY nombre;
```

#### 📄 NoSQL

Datos no estructurados, flexibles

**Opciones populares:**
- MongoDB
- Firebase
- Redis

**Ejemplo de consulta:**
```javascript
// MongoDB
db.usuarios.find({ 
    edad: { $gt: 18 } 
}).sort({ nombre: 1 });
```

### Conexión a base de datos

```javascript
// Ejemplo con Node.js y MySQL
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mi_database'
});

// Consulta
connection.query(
    'SELECT * FROM usuarios WHERE activo = ?',
    [true],
    (err, results) => {
        if (err) throw err;
        console.log(results);
    }
);
```

### 🔑 Conceptos clave

- **CRUD:** Create, Read, Update, Delete
- **Primary Key:** Identificador único
- **Foreign Key:** Relación entre tablas
- **Index:** Mejora la velocidad de búsqueda

### 🛡️ Seguridad

- Usa consultas preparadas
- Valida entrada de usuarios
- Encripta contraseñas
- Limita permisos de usuario

---

## 📜 Historia del Desarrollo Web

### Timeline del desarrollo web

#### 1990 - El nacimiento de la Web
Tim Berners-Lee crea el primer navegador web y el protocolo HTTP.

#### 1993 - Primer navegador gráfico
Mosaic permite ver imágenes junto con texto.

#### 1995 - JavaScript llega a la web
Brendan Eich crea JavaScript en solo 10 días.

#### 1996 - CSS revoluciona el diseño
Se separa el contenido de la presentación.

#### 1999 - Web 2.0 emerge
Sitios dinámicos e interactivos se vuelven populares.

#### 2004 - Era de las redes sociales
Facebook marca el inicio de la web social.

#### 2008 - HTML5 y CSS3
Nuevos estándares traen capacidades multimedia.

#### 2010 - Diseño responsivo
Ethan Marcotte introduce el concepto de responsive design.

#### 2015 - Progressive Web Apps
Las PWAs difuminan la línea entre web y apps nativas.

#### Hoy - IA y el futuro
La inteligencia artificial está transformando el desarrollo web.

---

## 🚀 Comenzar tu viaje

Esta guía es solo el comienzo de tu aventura en el desarrollo web. La tecnología evoluciona constantemente, así que mantente curioso y sigue aprendiendo.

### Próximos pasos recomendados:

1. Practica construyendo proyectos pequeños
2. Contribuye a proyectos open source
3. Únete a comunidades de desarrolladores
4. Mantente actualizado con las últimas tecnologías
5. Nunca dejes de aprender

¡Buena suerte en tu viaje como desarrollador web! 🎉

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Siéntete libre de usar, modificar y distribuir este contenido educativo.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request si deseas mejorar esta guía.

## 📧 Contacto

¿Tienes preguntas o sugerencias? Contáctanos en [tu-email@ejemplo.com]
