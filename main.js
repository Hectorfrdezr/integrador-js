const swiper = new Swiper(".mySwiper-1", {
    sliderPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination:{
        el: ".swiper-pagination",
        clickable:true,
    },
    navigation: {
        nextEl: "swiper-button-next",
        prevEl: "swiper-button-prev",
    }
}); 