'use strict';

var getInitialScroll = function getInitialScroll() {
  return document.body.scrollTop;
};
var getFinalScroll = function getFinalScroll(element) {
  return Math.floor(element.getBoundingClientRect().top + getInitialScroll());
};

var animatedScrollTo = function animatedScrollTo(targetElement, time) {
  var initialPosition = getInitialScroll(),
      finalPosition = getFinalScroll(targetElement),
      distanceToScroll = finalPosition - initialPosition,
      scrollFragment = Math.ceil(distanceToScroll / time);
  animateScroll(scrollFragment, finalPosition);
  console.log(scrollFragment);
};

var animateScroll = function animateScroll(scrollFragment, finalPosition) {
  var animatedScroll = setInterval(function () {
    document.body.scrollTop += scrollFragment;
    if (scrollFragment > 0) {
      if (document.body.scrollTop > finalPosition - scrollFragment / 2) clearInterval(animatedScroll);
    } else {
      if (document.body.scrollTop < finalPosition - scrollFragment / 2) clearInterval(animatedScroll);
    }
  }, 1);
};

var animatedScrollEvent = function animatedScrollEvent(originElement, time) {
  if (originElement.tagName === 'A' && originElement.hash !== '') {
    var targetElement = document.getElementById(originElement.hash.slice(1));
    originElement.addEventListener('click', function (e) {
      console.log(targetElement);
      e.preventDefault();
      animatedScrollTo(targetElement, time);
    });
  }
};

var animatedScrollAllLinks = function animatedScrollAllLinks(time) {
  var links = document.links;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = links[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var link = _step.value;

      animatedScrollEvent(link, time);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

animatedScrollAllLinks(200);