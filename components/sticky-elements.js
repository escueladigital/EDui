'use strict';

var getDistanceTop = function getDistanceTop(element) {
  return element.getBoundingClientRect().top + window.pageYOffset;
};

var menu = document.getElementById('mainMenu');
var menuDistanceTop = void 0;
if (menu) menuDistanceTop = getDistanceTop(menu);
alert(menuDistanceTop);

window.addEventListener('scroll', function () {
  var windowScroll = window.pageYOffset;
  if (windowScroll > menuDistanceTop) {
    menu.classList.add('sticky');
  } else {
    menu.classList.remove('sticky');
  }
});

var button = document.getElementById('siguenos');
var buttonDistanceTop = void 0,
    buttonWidth = void 0;
if (button) {
  buttonDistanceTop = getDistanceTop(button);
  buttonWidth = button.getBoundingClientRect().width;
}

window.addEventListener('scroll', function () {
  var windowScroll = window.pageYOffset;
  if (windowScroll > buttonDistanceTop) {
    button.classList.add('sticky');
    button.style.width = buttonWidth + 'px';
    button.style.top = menu.getBoundingClientRect().height + 16 + 'px';
  } else {
    button.classList.remove('sticky');
  }
});