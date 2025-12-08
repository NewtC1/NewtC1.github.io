let book = document.querySelector(".animation-book");
let left_page = document.querySelector(".left");
let right_page = document.querySelector(".right");
let front = document.querySelector(".front");
let back = document.querySelector(".back");

book.ontransitionend = function() {
    front.style.transform = "rotateY(-80deg)";
    back.style.transform = "rotateY(80deg)";
    book.style.visibility = "hidden"
};