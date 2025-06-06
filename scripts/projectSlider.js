document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.project-slider').forEach(function(slider) {
        const projects = slider.querySelectorAll('.project');
        let current = 0;

        function showProject(idx) {
            projects.forEach((proj, i) => {
                proj.classList.toggle('active', i === idx);
            });
        }

        slider.querySelectorAll('.project-nav').forEach(btn => {
            btn.addEventListener('click', function () {
                if (btn.classList.contains('prev')) {
                    current = (current - 1 + projects.length) % projects.length;
                } else if (btn.classList.contains('next')) {
                    current = (current + 1) % projects.length;
                }
                showProject(current);
            });
        });

        // Inicjalizacja
        showProject(current);
    });
});
