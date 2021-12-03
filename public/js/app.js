// function para abrir y cerrar el navbar
const openNavbar = () => {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('is-active');
}

// whatsapp button
tippy('#whatsapp', {
    content: `
    <div>
        <a href="https://wa.me/51993026437?text=prueba" target="_blank" class="button is-extra">
            <i data-icon="person"></i> Publicista Victor
        </a>
    </div>
    <div class="mg-top">
        <a href="https://wa.me/51993026437?text=prueba" target="_blank" class="button is-extra">
            <i data-icon="person"></i> Publicista Angel
        </a>
    </div>
    `,
    allowHTML: true,
    interactive: true,
    delay: [null, 300],
    trigger: 'click',
    theme: 'whatsapp'
});

let gallery;
let previewImage;
if (document.getElementById('images')) {
    gallery = new Viewer(document.getElementById('images'));
}

previewImage = (id) => {
    document.getElementById(`image${id}`).click();
}

ScrollReveal().reveal('.reveal', { delay: 500 });

if (window.innerWidth > 768) {
    window.onscroll = (e) => {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            document.getElementById("navbar").style.backgroundColor = '#18904A';
        } else {
            document.getElementById("navbar").style.backgroundColor = 'transparent';
        }
    }
}

const consultar = (name) => {
    window.open(`https://wa.me/51946182531?text=Hola quisiera consultar sobre ${name}`, '_blank');
}