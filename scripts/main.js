// NAV BAR

// do otwierania menu bocznego
const menuIcon = document.querySelector('.menu-icon');
const navigationSide = document.querySelector('.navigation-side');

// do zmiany ikony menu
const normalIcon = document.querySelector('img.normal');
const openIcon = document.querySelector('img.open');


menuIcon.addEventListener('click', () => {
    navigationSide.classList.toggle('open');

    if (navigationSide.classList.contains('open')) {
        normalIcon.style.display = 'none';
        openIcon.style.display = 'block';
    } else {
        normalIcon.style.display = 'block';
        openIcon.style.display = 'none';
    }
});


