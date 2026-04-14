(function () {
  const links = [
    ['/', 'home'],
    ['/blog/', 'blog'],
    ['/gallery.html', 'gallery'],
    ['/projects.html', 'projects'],
    ['/publications.html', 'publications'],
    ['https://github.com/seansiddens', 'github'],
    ['/other.html', 'other'],
  ];

  const nav = document.createElement('nav');
  nav.className = 'side-nav';

  const path = window.location.pathname;

  for (let i = 0; i < links.length; i++) {
    const [href, label] = links[i];
    const a = document.createElement('a');
    a.href = href;
    a.textContent = label;
    if (href.startsWith('/') && (path === href || (href.length > 1 && path.startsWith(href)))) {
      a.classList.add('active');
    }
    nav.appendChild(a);

    if (i < links.length - 1) {
      const sep = document.createElement('span');
      sep.className = 'fleuron';
      sep.textContent = '𐫱';
      nav.appendChild(sep);
    }
  }

  document.querySelector('main').appendChild(nav);
})();
