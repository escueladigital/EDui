export const edTabs = () => {
  let container = document.querySelector('.edui-tabs'),
    tabsContainer = container.querySelector('.tabs'),
    panelsContainer = container.querySelector('.panels'),
    tabs = [...tabsContainer.querySelectorAll('.tab')],
    panels = [...panelsContainer.querySelectorAll('.panel')];

  tabs[0].classList.add('active');
  panels[0].classList.add('active');

  tabsContainer.addEventListener('click', e => {
    let t = e.target,
      i = tabs.indexOf(t);
    if(e.target.classList.contains('tab')) {
      tabs.map( tab => tab.classList.remove('active'));
      panels.map( panel => panel.classList.remove('active'));
      t.classList.add('active');
      panels[i].classList.add('active');
    }
  })
};
