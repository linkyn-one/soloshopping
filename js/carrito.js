// carrito.js - Sistema completo de carrito de compras

// Objeto para manejar el carrito
const Carrito = {
    items: [],
    
    // Inicializar carrito
    init() {
        this.cargarCarrito();
        this.actualizarContador();
        this.crearIconoCarrito();
    },
    
    // Crear icono del carrito en el header
    crearIconoCarrito() {
        const nav = document.querySelector('nav ul');
        if (nav && !document.getElementById('carrito-icon')) {
            const li = document.createElement('li');
            li.innerHTML = `
                <a href="#" id="carrito-icon" style="position: relative;">
                    🛒 CARRITO
                    <span id="carrito-contador" style="
                        position: absolute;
                        top: -8px;
                        right: -8px;
                        background: #13C300;
                        color: white;
                        border-radius: 50%;
                        width: 20px;
                        height: 20px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 12px;
                        font-weight: bold;
                    ">0</span>
                </a>
            `;
            nav.appendChild(li);
            
            // Event listener para abrir modal
            document.getElementById('carrito-icon').addEventListener('click', (e) => {
                e.preventDefault();
                this.mostrarModal();
            });
        }
    },
    
    // Agregar producto al carrito
    agregar(producto) {
        const existente = this.items.find(item => item.id === producto.id);
        
        if (existente) {
            existente.cantidad++;
        } else {
            this.items.push({
                ...producto,
                cantidad: 1
            });
        }
        
        this.guardarCarrito();
        this.actualizarContador();
        this.mostrarNotificacion(`${producto.nombre} agregado al carrito`);
        console.log('🛒 Producto agregado:', producto.nombre);
    },
    
    // Eliminar producto del carrito
    eliminar(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.guardarCarrito();
        this.actualizarContador();
        this.actualizarModalCarrito();
    },
    
    // Actualizar cantidad
    actualizarCantidad(id, cantidad) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            if (cantidad <= 0) {
                this.eliminar(id);
            } else {
                item.cantidad = cantidad;
                this.guardarCarrito();
                this.actualizarModalCarrito();
            }
        }
    },
    
    // Vaciar carrito
    vaciar() {
        this.items = [];
        this.guardarCarrito();
        this.actualizarContador();
        this.actualizarModalCarrito();
    },
    
    // Calcular total
    calcularTotal() {
        return this.items.reduce((total, item) => {
            return total + (item.precio * item.cantidad);
        }, 0);
    },
    
    // Contar items
    contarItems() {
        return this.items.reduce((total, item) => total + item.cantidad, 0);
    },
    
    // Guardar en memoria (no localStorage)
    guardarCarrito() {
        console.log('💾 Carrito guardado en memoria');
    },
    
    // Cargar carrito
    cargarCarrito() {
        // El carrito se mantiene en memoria durante la sesión
        console.log('📦 Carrito cargado');
    },
    
    // Actualizar contador visual
    actualizarContador() {
        const contador = document.getElementById('carrito-contador');
        if (contador) {
            const total = this.contarItems();
            contador.textContent = total;
            contador.style.display = total > 0 ? 'flex' : 'none';
        }
    },
    
    // Mostrar notificación
    mostrarNotificacion(mensaje) {
        const notif = document.createElement('div');
        notif.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #13C300;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        notif.textContent = mensaje;
        document.body.appendChild(notif);
        
        setTimeout(() => {
            notif.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notif.remove(), 300);
        }, 2000);
    },
    
    // Mostrar modal del carrito
    mostrarModal() {
        // Eliminar modal existente
        const modalExistente = document.getElementById('modal-carrito');
        if (modalExistente) modalExistente.remove();
        
        // Crear modal
        const modal = document.createElement('div');
        modal.id = 'modal-carrito';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            animation: fadeIn 0.3s ease;
        `;
        
        const contenido = document.createElement('div');
        contenido.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 15px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
        `;
        
        contenido.innerHTML = `
            <h2 style="color: #000; font-family: 'Alumni Sans Pinstripe'; margin-top: 0;">
                🛒 MI CARRITO
            </h2>
            <button id="cerrar-modal" style="
                position: absolute;
                top: 20px;
                right: 20px;
                background: none;
                border: none;
                font-size: 28px;
                cursor: pointer;
                color: #666;
            ">×</button>
            <div id="carrito-items"></div>
        `;
        
        modal.appendChild(contenido);
        document.body.appendChild(modal);
        
        // Event listeners
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
        
        document.getElementById('cerrar-modal').addEventListener('click', () => {
            modal.remove();
        });
        
        this.actualizarModalCarrito();
    },
    
    // Actualizar contenido del modal
    actualizarModalCarrito() {
        const container = document.getElementById('carrito-items');
        if (!container) return;
        
        if (this.items.length === 0) {
            container.innerHTML = `
                <p style="text-align: center; color: #666; padding: 40px 0;">
                    Tu carrito está vacío
                </p>
            `;
            return;
        }
        
        let html = '<div style="display: flex; flex-direction: column; gap: 15px;">';
        
        this.items.forEach(item => {
            html += `
                <div style="
                    display: flex;
                    gap: 15px;
                    padding: 15px;
                    border: 1px solid #e0e0e0;
                    border-radius: 10px;
                    align-items: center;
                ">
                    <img src="${item.imagen}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
                    <div style="flex: 1;">
                        <h4 style="margin: 0 0 5px 0; color: #000; font-size: 16px;">${item.nombre}</h4>
                        <p style="margin: 0; color: #13C300; font-weight: bold;">$${item.precio.toLocaleString()}</p>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <button onclick="Carrito.actualizarCantidad(${item.id}, ${item.cantidad - 1})" style="
                            background: #f0f0f0;
                            border: none;
                            width: 30px;
                            height: 30px;
                            border-radius: 5px;
                            cursor: pointer;
                            font-size: 18px;
                        ">-</button>
                        <span style="color: #000; font-weight: bold; min-width: 20px; text-align: center;">${item.cantidad}</span>
                        <button onclick="Carrito.actualizarCantidad(${item.id}, ${item.cantidad + 1})" style="
                            background: #f0f0f0;
                            border: none;
                            width: 30px;
                            height: 30px;
                            border-radius: 5px;
                            cursor: pointer;
                            font-size: 18px;
                        ">+</button>
                        <button onclick="Carrito.eliminar(${item.id})" style="
                            background: #ff4444;
                            color: white;
                            border: none;
                            width: 30px;
                            height: 30px;
                            border-radius: 5px;
                            cursor: pointer;
                            font-size: 18px;
                        ">🗑️</button>
                    </div>
                </div>
            `;
        });