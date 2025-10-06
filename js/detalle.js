// detalle.js
// 1. Obtener ID de la URL (?id=2, ?id=3, etc.)
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

// 2. Buscar el producto en el array
const producto = productos.find(p => p.id === id);

// 3. Insertar en el HTML
if (producto) {
  document.getElementById("detalle-producto").innerHTML = `
    <div class="product-image">
      <img src="${producto.imagen}" alt="${producto.nombre}">
    </div>
    <div class="product-info">
      <h1>${producto.nombre}</h1>
      <p class="price">$${producto.precio.toLocaleString()}</p>
      <p class="description">${producto.descripcion}</p>
      <button>Agregar al carrito</button>
    </div>
  `;
} else {
  document.getElementById("detalle-producto").innerHTML = `
    <p>Producto no encontrado.</p>
  `;
}