document.addEventListener('DOMContentLoaded', () => {
    const menutoggle = document.querySelector('.toggle');
    const menuitems = document.querySelector('.menu-items');

    if (!menutoggle || !menuitems) {
        console.error("Menu toggle or menu items not found");
        return;
    }

    function openMenu() {
        menuitems.classList.add('open');
    }

    function closeMenu() {
        menuitems.classList.remove('open');
    }

    function removeClass() {
        menutoggle.classList.remove('active');
        closeMenu();
    }

    menutoggle.addEventListener('click', () => {
        menutoggle.classList.toggle('active');
        if (menutoggle.classList.contains('active')) {
            openMenu();
        } else {
            closeMenu();
        }
    });

    const menuLinks = document.querySelectorAll('.menu-item');

    // Click event + smooth scroll
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            removeClass();
        });
    });

    // Animate menu items: Wrap each letter
    menuLinks.forEach(item => {
        const text = item.innerText;
        item.innerHTML = ''; // Clear text

        const animatedDiv = document.createElement('div');
        animatedDiv.classList.add('animated-text');

        text.split('').forEach((letter, idx) => {
            const span = document.createElement('span');
            span.style.setProperty('--index', idx);
            span.textContent = letter;
            animatedDiv.appendChild(span);
        });

        const cloneDiv = animatedDiv.cloneNode(true);
        cloneDiv.style.position = 'absolute';
        cloneDiv.style.left = '0';
        cloneDiv.style.top = '0';

        item.appendChild(animatedDiv);
        item.appendChild(cloneDiv);
    });
});
