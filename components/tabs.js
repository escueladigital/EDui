'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var edui = {};

edui.tabs = function () {
  var container = document.querySelector('.edui-tabs'),
      tabsContainer = container.querySelector('.tabs'),
      panelsContainer = container.querySelector('.panels'),
      tabs = [].concat(_toConsumableArray(tabsContainer.querySelectorAll('.tab'))),
      panels = [].concat(_toConsumableArray(panelsContainer.querySelectorAll('.panel')));

  tabs[0].classList.add('active');
  panels[0].classList.add('active');

  tabsContainer.addEventListener('click', function (e) {
    var t = e.target,
        i = tabs.indexOf(t);
    if (e.target.classList.contains('tab')) {
      tabs.map(function (tab) {
        return tab.classList.remove('active');
      });
      panels.map(function (panel) {
        return panel.classList.remove('active');
      });
      t.classList.add('active');
      panels[i].classList.add('active');
    }
  });
};

edui.tabs();