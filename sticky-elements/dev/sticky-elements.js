const getDistanceTop = element => {
  return element.getBoundingClientRect().top + window.pageYOffset;
};


const menu = document.getElementById('mainMenu');
let menuDistanceTop;
if (menu) menuDistanceTop = getDistanceTop(menu);
alert(menuDistanceTop);

window.addEventListener('scroll', () => {
  let windowScroll = window.pageYOffset;
  if ( windowScroll > menuDistanceTop) {
    menu.classList.add('sticky')
  } else {
    menu.classList.remove('sticky')
  }
});


const button = document.getElementById('siguenos');
let buttonDistanceTop, buttonWidth;
if (button) {
  buttonDistanceTop = getDistanceTop(button);
  buttonWidth = button.getBoundingClientRect().width;
}


window.addEventListener('scroll', () => {
  let windowScroll = window.pageYOffset;
  if ( windowScroll > buttonDistanceTop) {
    button.classList.add('sticky');
    button.style.width = `${buttonWidth}px`;
    button.style.top = `${menu.getBoundingClientRect().height + 16}px`
  } else {
    button.classList.remove('sticky');
  }
});
