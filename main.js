document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.querySelector('#lista-carrito tbody');

    // Función para actualizar el carrito en el DOM
    function updateCart() {
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${item.image}" width="50"></td>
                <td>${item.title}</td>
                <td>$${item.price}</td>
                <td><a href="#" class="remove" data-id="${item.id}">X</a></td>
            `;
            cartItems.appendChild(row);
        });
        localStorage.setItem('cart', JSON.stringify(cart));
    } 
// Función para obtener productos desde la API
function fetchProducts() {
    fetch('https://fakestoreapi.com/products?limit=20')
        .then(res => res.json())
        .then(products => {
            products.forEach(product => {
                const div = document.createElement('div');
                div.className = 'product';
                div.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <div class="product-text">
                        <h3>${product.title}</h3>
                        <p class="precio-2">$${product.price}</p>
                        <a href="#" class="add-carrito btn-3" data-id="${product.id}">Agregar al carrito</a>
                    </div>
                `;
                productList.appendChild(div);
            });
        });
} 

// Recuperar los datos del carrito desde el localStorage
function fetchCart() {
    cart = [];
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    cartData.forEach(product => {
        cart.push(product);
    });
    updateCart();
    updateCounter();   
}

    // Función para obtener productos para los sliders
    function fetchSliderProducts() {
        fetch('https://fakestoreapi.com/products?limit=8')
            .then(res => res.json())
            .then(products => {
                const swiperWrapper1 = document.querySelector('.mySwiper-1 .swiper-wrapper');
                const swiperWrapper2 = document.querySelector('.mySwiper-2 .swiper-wrapper');

                products.forEach((product, index) => {
                    const div = document.createElement('div');
                    div.className = 'swiper-slide';
                    div.innerHTML = `
                        <div class="header-info">
                            <div class="header-txt">
                                <h1>${product.title}</h1>
                                <div class="precios">
                                    <p class="precio-1">Antes: $${(product.price * 1.2).toFixed(2)}</p>
                                    <p class="precio-2">Ahora: $${product.price}</p>
                                </div>
                                <a href="#lista-1" class="btn-1">información</a>
                            </div>
                            <div class="header-img">
                                <img src="${product.image}" alt="${product.title}">
                            </div>
                        </div>
                    `;

                    if (index < 4) {
                        swiperWrapper1.appendChild(div);
                    } else {
                        swiperWrapper2.appendChild(div);
                    }
                });
                
                // Inicializar los swipers después de agregar los productos
                new Swiper('.mySwiper-1', {
                    loop: true,
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: false
                    },
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev'
                        },
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true
                        }
                });

                new Swiper('.mySwiper-2', {
                    loop: true,
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: false
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                });
            });
    }

    // Evento click para añadir productos al carrito
    productList.addEventListener('click', e => {
        if (e.target.classList.contains('add-carrito')) {
            e.preventDefault();
            const productId = parseInt(e.target.getAttribute('data-id'));
            fetch(`https://fakestoreapi.com/products/${productId}`)
                .then(res => res.json())
                .then(product => {
                    cart.push(product);
                    updateCart();
                    updateCounter();
                });
        }
    });
    function updateCounter() {
        const counterDiv = document.getElementById('cart-counter');
        counterDiv.textContent = cart.length;
    }
    // Evento click para eliminar productos del carrito
    document.querySelector('#lista-carrito').addEventListener('click', e => {
        if (e.target.classList.contains('remove')) {
            e.preventDefault();
            const productId = parseInt(e.target.getAttribute('data-id'));
            const productIndex = cart.findIndex(p => p.id === productId);
            if (productIndex > -1) {
                cart.splice(productIndex, 1);
                updateCart();
                updateCounter();
            }
        }
    });

    // Evento click para vaciar el carrito
    document.getElementById('vaciar-carrito').addEventListener('click', e => {
        e.preventDefault();
        cart.length = 0;
        updateCart();
        updateCounter();
    });

    // Evento click para procesar la compra
    document.getElementById('procesar-compra').addEventListener('click', e => {
        e.preventDefault();
        if (cart.length > 0) {
            const products = cart.map(product => ({
                productId: product.id,
                quantity: 1
            }));
            fetch('https://fakestoreapi.com/carts', {
                method: 'POST',
                body: JSON.stringify({
                    userId: 5,
                    date: new Date().toISOString(),
                    products
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(order => {
                alert('Compra realizada con éxito!');
                cart.length = 0;
                updateCart();
                updateCounter();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un problema al procesar la compra.');
            });
        } else {
            alert('El carrito está vacío.');
        }
    });

    // Inicialización de funciones al cargar la página
    fetchProducts();
    fetchCart();
    fetchSliderProducts();
    updateCart();  // Actualizar la vista del carrito al cargar la página

    // Menú hamburguesa
const menuIcon = document.querySelector('.menu-icono');
const navbar = document.querySelector('.navbar');
const menuCheckbox = document.getElementById('menu-checkbox');

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuCheckbox.checked = !menuCheckbox.checked; 
});

document.addEventListener('click', (event) => {
    if (!navbar.contains(event.target) && !menuIcon.contains(event.target)) {
        navbar.classList.remove('active');
        menuCheckbox.checked = false; 
    }
});
    // Formulario de contacto
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const formSuccess = document.getElementById('form-success');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Validar nombre
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'El nombre es obligatorio';
            nameError.style.display = 'block';
            isValid = false;
        } else {
            nameError.style.display = 'none';
        }

        // Validar email
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'El correo electrónico es obligatorio';
            emailError.style.display = 'block';
            isValid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
            emailError.textContent = 'Ingrese un correo electrónico válido';
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.style.display = 'none';
        }

        // Validar mensaje
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'El mensaje es obligatorio';
            messageError.style.display = 'block';
            isValid = false;
        } else {
            messageError.style.display = 'none';
        }

        // Mostrar mensaje de éxito si el formulario es válido
        if (isValid) {
            formSuccess.textContent = 'Mensaje enviado con éxito';
            formSuccess.style.display = 'block';
            contactForm.reset();
        }
    });

    // Función para validar correo electrónico
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
        return re.test(String(email).toLowerCase());
    }

});
