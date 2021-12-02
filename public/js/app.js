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

AOS.init();

let gallery;
let previewImage;
gallery = new Viewer(document.getElementById('images'));

previewImage = (id) => {
    document.getElementById(`image${id}`).click();
}
