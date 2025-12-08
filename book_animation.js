let book = document.querySelector(".animation-book");
let left_page = document.querySelector(".left");
let right_page = document.querySelector(".right");
let front = document.querySelector(".front");
let back = document.querySelector(".back");
let back = document.querySelector(".anim-book-spine");

book.ontransitionend = function() {
    front.style.transform = "rotateY(-80deg)";
    back.style.transform = "rotateY(80deg)";
};