const swiper = new Swiper(".mySwiper-1", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination:{
        el: ".swiper-pagination",
        clickable:true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    }
});

const swip = new Swiper(".mySwiper-2", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints:{
        0:{
            slidesPerView: 1
        },
        520:{
            slidesPerView: 2
        },
        950:{
            slidesPerView: 3
        }
    }
});
//carrito
const carrito = document.querySelector(`#carrito`);
const elemento1 = document.querySelector(`#lista-1`);
const elemento2 = document.querySelector(`#lista-2`);
const lista = document.querySelector(`#lista-carrito tbody`);
const clear = document.querySelector(`#vaciar-carrito`);

cargarEventListeners();

function cargarEventListeners(){
    elemento1.addEventListener(`click`, comprarElemento);
    elemento2.addEventListener(`click`, comprarElemento);
    carrito.addEventListener(`click`, eliminarElemento);

    clear.addEventListener(`click`, eliminar);

};

function comprarElemento(e) {
    e.preventDefault();
    if(e.target.classList.contains(`add-carrito`)) {
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
};

function leerDatosElemento(elemento){
    const infoElemento = {
        imagen: elemento.querySelector(`img`).src,
        titulo: elemento.querySelector(`h3`).textContent,
        precio: elemento.querySelector(`.precio-2`).textContent,
        id: elemento.querySelector(`a`).getAttribute(`data-id`)
    }
    insertarCarrito(infoElemento);
};

function insertarCarrito(elemento){
    const row = document.createElement(`tr`);
    row.innerHTML=`
    <td>
        <img src="${elemento.imagen}" wisth=100>  
    </td>
    <td>
         ${elemento.titulo}  
    </td>
    <td>   
    ${elemento.precio}
    </td>
    <td>
        <a herf="#" class="borrar" data-id="${elemento.id}">x</a>  
    </td>   
    `;
    lista.appendChild(row);
};

function eliminarElemento(e){
    e.preventDefault();
    let elemento,
        elementoId;
    if(e.target.classList.contains(`borrar`)) {
        e.target.parentElement.parentElement.remove();
        elemento = e.target.parentElement.parentElement;
        elementoId = elemento.querySelector(`a`).getAttribute(`data-id`);
    }
        
};

function eliminar(){
    while(lista.firstChild){
        lista.removeChild(lista.firstChild);
    }
    return false;
};

 