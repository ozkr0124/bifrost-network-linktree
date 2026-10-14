# Bifröst Network - Linktree Oficial

Página de enlaces oficial (Linktree) para **Bifröst Network S.A.S.**, proveedor de servicios de internet de alta velocidad por fibra óptica simétrica (ISP).

🌐 **Dominio oficial:** [linktree.bifrostinternet.com](https://linktree.bifrostinternet.com)

---

## 🚀 Características Principales

* **Botón Destacado de WhatsApp:**
  * Número oficial: `+57 301 826 5125`.
  * Diseñado con máxima jerarquía visual, halo dinámico, cinta de canal prioritario e indicador pulsante de estado en línea.
* **Acceso al Portal Web Oficial:**
  * Enlace directo a [www.bifrostinternet.com](https://www.bifrostinternet.com) con detalles de cobertura y planes.
* **Instagram Corporativo:**
  * Enlace oficial a [@bifrostnetworksas](https://www.instagram.com/bifrostnetworksas/).
* **Modo Oscuro / Modo Claro Dinámico:**
  * Detección automática según preferencias del sistema (`prefers-color-scheme`).
  * Persistencia de preferencia en `localStorage`.
  * Intercambio automático de logotipo vectorial:
    * **Modo Oscuro:** `assets/images/svg/sector21.svg` (texto blanco con isotipo de color).
    * **Modo Claro:** `assets/images/svg/sector1.svg` (texto oscuro con isotipo de color).
* **Tipografía Oficial:**
  * Incorpora la fuente corporativa **General Sans** (Variable Font) alojada localmente para carga ultrarrápida y cero bloqueo de renderizado.
* **100% Responsivo y Accesible:**
  * Optimizado para navegadores móviles integrados (*in-app browsers* de Instagram, WhatsApp, TikTok).
  * Soporte para Web Share API y copia rápida al portapapeles.

---

## 🛠️ Tecnologías

* **HTML5 Semántico**
* **CSS3 Moderno** (Variables CSS, Backdrop Filter / Glassmorphism, CSS Grid y Flexbox)
* **Vanilla JavaScript ES6+** (Sin dependencias ni frameworks pesados para un rendimiento 100/100)
* **Vectores SVG** optimizados de acuerdo al manual de marca de Bifröst.

---

## 💻 Ejecución en Local

No requiere instalación de dependencias de Node. Puedes levantarlo con cualquier servidor estático:

```bash
# Con Python 3:
python3 -m http.server 3000

# O con npx serve:
npx serve .
```

Abre tu navegador en `http://localhost:3000`.

---

## 🌐 Configuración de Dominio y GitHub Pages

* **Subdominio:** `linktree.bifrostinternet.com`
* **Registro DNS en GoDaddy:** CNAME `linktree` apuntando a `ozkr0124.github.io`
* El archivo `CNAME` en la raíz del repositorio garantiza la vinculación automática con GitHub Pages sin interferir con `www.bifrostinternet.com`.
