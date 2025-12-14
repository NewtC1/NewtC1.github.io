

import { getRootCssStyles} from './cssUtils.js';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function move(oldParent, newParent) {
    for (let i = 0; i <oldParent.childNodes.length; i++) {
        newParent.appendChild(oldParent.childNodes[i].cloneNode(true));
    }
}

function getLecternBookCenter() {
    let lectern_book = document.querySelector(".lectern-book");
    let boundingRect = getAbsolutePosition(lectern_book);
    let boundingY = ((boundingRect.top + window.scrollY) - (lectern_book.style.height/2));
    let boundingX = ((boundingRect.left + window.scrollX) - (lectern_book.style.width/2));
    return {
        x: boundingX,
        y: boundingY
    };
}

function getAbsolutePosition(element) {
    const rect = element.getBoundingClientRect();

    return {
        top: rect.top + window.scrollY,    // Add vertical scroll
        left: rect.left + window.scrollX,  // Add horizontal scroll
        bottom: rect.bottom + window.scrollY,
        right: rect.right + window.scrollX
    };
}

function calcOffset(from, to) {
    let fromPosition = getAbsolutePosition(from);
    let toPosition = getAbsolutePosition(to);

    let toAbsoluteCenter = {
        x: toPosition.right - (to.offsetWidth/2),
        y: toPosition.bottom - (to.offsetHeight/2)
    };

    let fromAbsoluteCenter = {
        x: fromPosition.right - (from.offsetWidth/2),
        y: fromPosition.bottom - (from.offsetHeight/2)
    };

    return {
        x: (toAbsoluteCenter.x - fromAbsoluteCenter.x),
        y: (toAbsoluteCenter.y - fromAbsoluteCenter.y)
    };

}


let spines = Object.values(document.getElementsByClassName("spine"));
let covers = Object.values(document.getElementsByClassName("cover"));
let tops = Object.values(document.getElementsByClassName("top"));
let inner_pages = Object.values(document.getElementsByClassName("inner-page"));

let availablePatterns = getRootCssStyles();

let availableColors = [
  "maroon",
  "darkgreen",
  "darkolivegreen",
  "brown",
  "saddlebrown",
  "sienna",
  "midnightblue",
];

// assign a random height, pattern and colour to each book
spines.map(function (s, i) {
    let randomHeight = getRandomInt(220, 290);
    s.style.height = `${randomHeight}px`;
    s.style.top = `${280 - randomHeight}px`;

    let randomPattern = randomChoice(availablePatterns);
    s.style.backgroundImage = `var(${randomPattern})`;

    let randomColor = randomChoice(availableColors);
    s.style.backgroundColor = randomColor;

    covers[i].style.height = `${randomHeight}px`;
    covers[i].style.top = `${280 - randomHeight}px`;

    inner_pages[i].style.height = `${randomHeight}px`;
    inner_pages[i].style.top = `${280 - randomHeight}px`;

    tops[i].style.top = `${280 - randomHeight}px`;
});

// lazy load the book covers on hover, do extra animations on hover
let books = Object.values(document.getElementsByClassName("book"));
let cover_open = false;
let selected_book = books[0];
books.map(function (b, i) {
    b.onmouseover = function () {
        let covers = b.getElementsByClassName("cover");
        Array.from(covers).map(function (c, i) {
            c.style.backgroundImage = "url(/images/" + c.getAttribute("img") + ")";

            // On single click, open the cover. Click while the cover is open and it will expand the book.
            b.onclick = function() {
                if (cover_open != true) {
                    c.style.transform = "rotateY(-75deg)";
                    cover_open = true;
                }
                else {
                    let left_page = document.querySelector(".left-page");
                    let right_page = document.querySelector(".right-page");
                    let inner_page = b.querySelector(".inner-page");
                    // let animation_book = document.querySelector(".animation-book");
                    let lectern_book = document.querySelector(".lectern-book");

                    //move the book to the center of the lectern's book.
                    let offset = calcOffset(b, lectern_book);
                    b.style.transform = "translate("+ offset.x + "px, " + offset.y + "px)";
                    lectern_book.classList.add("book-selected");

                    // clear any content that was on the lectern
                    left_page.innerHTML = "";
                    // load the contents of the book into the left page.
                    move(inner_page, left_page);

                    // animation_book.style.visibility = "visible";

                    // load the cover image into the right page.
                    right_page.innerHTML = "<img src=/images/" + c.getAttribute("img") + ">";
                    // hide the selected book
                    b.style.opacity = '0';
                    // reveal the previous book and move it back to the book shelf.
                    selected_book.style.opacity = '1';
                    selected_book.style.transform = "";
                    // set the new book as selected.
                    selected_book = b;


                }
            };

            /*b.onmouseover = function() {
               b.style.zIndex = '1';
               b.style.transform = "rotateX(-25deg) rotateY(-40deg) rotateZ(-15deg) translateY(50px) translateX(-30px)";
            };*/
        })
    };


    // reset the cover position when moving to a new element.
    b.onmouseleave = function () {
        //b.style.transform = "translateZ(0) rotateY(0)"
        //b.style.zIndex = '0';

        Array.from(covers).map(function (c, i) {
        c.style.transform = "rotateY(90deg)";
        cover_open = false;
        })
    }
});