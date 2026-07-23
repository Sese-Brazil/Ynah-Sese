const menuButton = document.querySelector('#menuButton');
const menu = document.querySelector('#menu');
const searchInput = document.querySelector('#projectSearch');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const emptyProjects = document.querySelector('#emptyProjects');
const projectPrev = document.querySelector('#projectPrev');
const projectNext = document.querySelector('#projectNext');
const carouselDots = document.querySelector('#carouselDots');

menuButton?.addEventListener('click', () => {
  const isOpen = !menu.classList.contains('hidden');
  menu.classList.toggle('hidden');
  menuButton.setAttribute('aria-expanded', String(!isOpen));
});

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 1024) {
      menu.classList.add('hidden');
      menuButton.setAttribute('aria-expanded', 'false');
    }
  });
});

let activeFilter = 'all';
let activeProjectIndex = 0;
let visibleProjects = Array.from(projectCards);

function renderCarousel() {
  if (!projectCards.length) return;

  const total = visibleProjects.length;
  projectPrev?.classList.toggle('hidden', total <= 1);
  projectNext?.classList.toggle('hidden', total <= 1);

  if (carouselDots) {
    carouselDots.innerHTML = '';
    visibleProjects.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Show project ${index + 1}`);
      dot.classList.toggle('active', index === activeProjectIndex);
      dot.addEventListener('click', () => {
        activeProjectIndex = index;
        renderCarousel();
      });
      carouselDots.appendChild(dot);
    });
  }

  projectCards.forEach((card) => {
    card.classList.add('carousel-hidden');
    card.style.opacity = '0';
    card.style.pointerEvents = 'none';
    card.style.transform = 'translate(-50%, -50%) scale(0.7)';
    card.style.zIndex = '0';
    card.style.filter = 'blur(2px)';
  });

  if (!total) return;
  activeProjectIndex = ((activeProjectIndex % total) + total) % total;

  visibleProjects.forEach((card, index) => {
    let offset = index - activeProjectIndex;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    const absOffset = Math.abs(offset);
    if (absOffset > 2) return;

    const x = offset * 20;
    const z = -absOffset * 120;
    const rotate = offset * -24;
    const scale = absOffset === 0 ? 1 : 0.82;

    card.classList.remove('carousel-hidden');
    card.style.opacity = absOffset === 0 ? '1' : '0.72';
    card.style.pointerEvents = absOffset === 0 ? 'auto' : 'none';
    card.style.zIndex = String(10 - absOffset);
    card.style.filter = absOffset === 0 ? 'none' : 'saturate(0.8) brightness(0.82)';
    card.style.transform = `translate(-50%, -50%) translateX(${x}rem) translateZ(${z}px) rotateY(${rotate}deg) scale(${scale})`;
  });
}

function filterProjects() {
  const searchTerm = searchInput?.value.trim().toLowerCase() || '';
  visibleProjects = [];

  projectCards.forEach((card) => {
    const text = card.textContent.toLowerCase();
    const tags = card.dataset.tags || '';
    const matchesSearch = text.includes(searchTerm);
    const matchesFilter = activeFilter === 'all' || tags.includes(activeFilter);
    const shouldShow = matchesSearch && matchesFilter;

    if (shouldShow) visibleProjects.push(card);
  });

  activeProjectIndex = 0;
  renderCarousel();
  emptyProjects?.classList.toggle('hidden', visibleProjects.length > 0);
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    activeFilter = button.dataset.filter;
    filterProjects();
  });
});

searchInput?.addEventListener('input', filterProjects);
projectPrev?.addEventListener('click', () => {
  activeProjectIndex -= 1;
  renderCarousel();
});
projectNext?.addEventListener('click', () => {
  activeProjectIndex += 1;
  renderCarousel();
});
renderCarousel();
