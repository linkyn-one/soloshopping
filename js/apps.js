function manejarMouseOverMenu(event) {
    console.log("🖱️ Mouse sobre elemento del menú:", event.target.textContent);
    console.log("📍 Coordenadas del mouse - X:", event.clientX, "Y:", event.clientY);
    event.target.style.transform = "translateY(-2px)";
}

function manejarMouseOutMenu(event) {
    console.log("✅ Mouse fuera del elemento del menú:", event.target.textContent);
    console.log("🔄 Restaurando estilo del elemento");
    event.target.style.transform = "translateY(0)";
}

const manejarTeclaPresionada = (event) => {
    console.log("⌨️ Tecla presionada:", event.key);
    console.log("🔢 Código de tecla:", event.code);
    if (event.ctrlKey && event.key === '1') {
        console.log("🚀 Navegación rápida: Inicio");
        document.getElementById('inicio').scrollIntoView({ behavior: 'smooth' });
    }
};

const manejarTeclaLiberada = (event) => {
    console.log("🔓 Tecla liberada:", event.key);
    console.log("⏱️ Tiempo de presión estimado:", Date.now());
    if (event.key.toLowerCase() === 'l') {
        document.body.style.backgroundColor = "#000000";
        setTimeout(() => {
            document.body.style.backgroundColor = "";
        }, 200);
    }
};

const manejarDobleClicMusica = () => {
    console.log("🎵 Doble clic en botón de música");
    console.log("🔊 Alternando volumen");
    
    const music = document.getElementById('music');
    if (music.volume === 1) {
        music.volume = 0.3;
        console.log("🔉 Volumen reducido al 30%");
    } else {
        music.volume = 1;
        console.log("🔊 Volumen al máximo");
    }
};

document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 DOM cargado - Inicializando event listeners");
    const elementosMenu = document.querySelectorAll('.menu a');
    elementosMenu.forEach(elemento => {
        elemento.addEventListener('mouseover', manejarMouseOverMenu);
        elemento.addEventListener('mouseout', manejarMouseOutMenu);
    });
    document.addEventListener('keydown', manejarTeclaPresionada);
    document.addEventListener('keyup', manejarTeclaLiberada);
    
    const botonMusica = document.getElementById('playMusic');
    botonMusica.addEventListener('dblclick', manejarDobleClicMusica);
    
    console.log("✅ Todos los event listeners configurados correctamente");
});

const btnArriba = document.getElementById("btnArriba");

window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        btnArriba.style.display = "block";
    } else {
        btnArriba.style.display = "none";
    }
});

btnArriba.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('playMusic');
    const music = document.getElementById('music');
    let isPlaying = false;
    
    playButton.addEventListener('click', function() {
        if (isPlaying) {
            music.pause();
            playButton.textContent = '▶';
            isPlaying = false;
        } else {
            music.play().then(() => {
                playButton.textContent = ' ⏸ ';
                isPlaying = true;
            }).catch(error => {
                console.error('Error al reproducir audio:', error);
                alert('Para reproducir música, haz clic una vez más o permite la reproducción automática en tu navegador.');
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const imagenes = document.querySelectorAll("#sets img");
    imagenes.forEach((img) => {
        img.addEventListener("mouseover", () => {
            img.style.transform = "scale(1.1)";
            img.style.transition = "transform 0.3s ease";
            console.log("🖱️ Zoom activado en:", img.alt);
        });
        img.addEventListener("mouseout", () => {
            img.style.transform = "scale(1)";
            console.log("✅ Zoom desactivado en:", img.alt);
        });
    });
});

