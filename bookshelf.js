

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
books.map(function (b, i) {
  b.onmouseover = function () {
    let covers = b.getElementsByClassName("cover");
    Array.from(covers).map(function (c, i) {
        c.style.backgroundImage = "url(" + c.getAttribute("img") + ")";

      // On single click, open the cover. Click while the cover is open and it will expand the book.
      b.onclick = function() {
       if (cover_open != true) {
            c.style.transform = "rotateY(-75deg)";
            cover_open = true;
        }
        else {
            let left_page = document.querySelector(".left-page");
            let inner_page = b.querySelector(".inner-page");
            // clear any content that was on the lectern
            left_page.innerHTML = ""
            move(inner_page, left_page)
        }
        };
    }
    )

  };


  // reset the cover position when moving to a new element.
  b.onmouseleave = function () {
  Array.from(covers).map(function (c, i) {
    c.style.transform = "rotateY(90deg)";
    cover_open = false;
  })
  }
});