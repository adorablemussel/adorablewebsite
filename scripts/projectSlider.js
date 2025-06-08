document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.project-slider').forEach(function(slider) {
        const projects = slider.querySelectorAll('.project');
        let current = 0;

        const navWrapper = slider.querySelector('.project-nav-wrapper');
        const dotsWrapper = slider.querySelector('.project-dots');

        // Dots
        if (dotsWrapper) {
            dotsWrapper.innerHTML = '';
            projects.forEach((_, idx) => {
                const dot = document.createElement('span');
                dot.classList.add('project-dot');
                dot.addEventListener('click', function () {
                    current = idx;
                    showProject(current);
                });
                dotsWrapper.appendChild(dot);
            });
        }

        function updateDots(idx) {
            if (!dotsWrapper) return;
            dotsWrapper.querySelectorAll('.project-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === idx);
            });
        }

        function showProject(idx) {
            projects.forEach((proj, i) => {
                proj.classList.toggle('active', i === idx);
            });
            updateDots(idx);
        }

        navWrapper.querySelector('.project-nav.prev').addEventListener('click', function () {
            current = (current - 1 + projects.length) % projects.length;
            showProject(current);
        });
        navWrapper.querySelector('.project-nav.next').addEventListener('click', function () {
            current = (current + 1) % projects.length;
            showProject(current);
        });

        // Inicjalizacja
        showProject(current);
    });
});
