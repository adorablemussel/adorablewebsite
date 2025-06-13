// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var images = document.getElementsByClassName("modal-image");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

for (var i = 0; i < images.length; i++) {
    images[i].onclick = function() {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
        document.body.style.overflow = "hidden"; // Disable scrolling
    }
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    document.body.style.overflowY = "auto"; // Re-enable scrolling
}

// When the user clicks anywhere outside of the modal image, close the modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.style.overflowY = "auto"; // Re-enable scrolling
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Zbierz wszystkie obrazy do modala
    const allModalImages = Array.from(document.querySelectorAll('.modal-image'));
    let currentModalIndex = 0;
    let currentSlider = null;
    let currentSliderImages = [];

    function activateProjectForImage(img) {
        const project = img.closest('.project');
        if (!project) return;
        const slider = project.closest('.project-slider');
        if (!slider) return;
        const projects = Array.from(slider.querySelectorAll('.project'));
        projects.forEach(p => p.classList.remove('active'));
        project.classList.add('active');
    }

    // Otwieranie modala i zapamiętanie slidera oraz indeksu
    allModalImages.forEach((img) => {
        img.addEventListener('click', function () {
            currentSlider = img.closest('.project-slider');
            currentSliderImages = Array.from(currentSlider.querySelectorAll('.modal-image'));
            currentModalIndex = currentSliderImages.indexOf(img);

            modal.style.display = "block";
            modalImg.src = img.src;
            document.body.style.overflow = "hidden";
            activateProjectForImage(img);
        });
    });

    // --- ZOOM & PAN LOGIC ---
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    let isZoomed = false;
    let isDragging = false;
    let startX = 0, startY = 0;
    let lastX = 0, lastY = 0;
    let dragMoved = false;
    const modalImg = document.getElementById("img01");

    // Reset transform on modal close
    function resetZoom() {
        isZoomed = false;
        isDragging = false;
        lastX = 0;
        lastY = 0;
        dragMoved = false;
        modalImg.style.transform = "translate(-50%, -50%) scale(1)";
        modalImg.style.cursor = "zoom-in";
    }

    // Zoom & pan tylko na desktopie
    if (!isTouchDevice) {
        // Zoom in/out on click (tylko jeśli nie było drag)
        modalImg.addEventListener('click', function (e) {
            if (isZoomed && dragMoved) {
                // Jeśli był drag, nie oddalaj
                dragMoved = false;
                return;
            }
            if (!isZoomed) {
                isZoomed = true;
                modalImg.style.transform = "translate(-50%, -50%) scale(2)";
                modalImg.style.cursor = "grab";
            } else {
                resetZoom();
            }
            e.stopPropagation();
        });

        // Start dragging
        modalImg.addEventListener('mousedown', function (e) {
            if (!isZoomed) return;
            isDragging = true;
            dragMoved = false;
            startX = e.clientX - lastX;
            startY = e.clientY - lastY;
            modalImg.style.cursor = "grabbing";
            e.preventDefault();
        });

        // Drag move
        document.addEventListener('mousemove', function (e) {
            if (!isZoomed || !isDragging) return;
            lastX = e.clientX - startX;
            lastY = e.clientY - startY;
            if (Math.abs(lastX) > 2 || Math.abs(lastY) > 2) dragMoved = true;
            modalImg.style.transform = `translate(calc(-50% + ${lastX}px), calc(-50% + ${lastY}px)) scale(2)`;
        });

        // End dragging
        document.addEventListener('mouseup', function () {
            if (!isZoomed) return;
            isDragging = false;
            modalImg.style.cursor = "grab";
            // dragMoved zostaje true jeśli był ruch
        });
    }

    // Obsługa swipe na mobile do zmiany obrazów w modalu
    if (isTouchDevice) {
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartY = 0;
        let touchEndY = 0;
        const minSwipeDistance = 50; // px

        modalImg.addEventListener('touchstart', function(e) {
            if (e.touches.length === 1) {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            }
        });

        modalImg.addEventListener('touchend', function(e) {
            touchEndX = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : 0;
            touchEndY = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientY : 0;
            const dx = touchEndX - touchStartX;
            const dy = touchEndY - touchStartY;
            if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > minSwipeDistance) {
                if (dx < 0) {
                    // swipe left -> next image
                    showModalImage(currentModalIndex + 1);
                } else {
                    // swipe right -> prev image
                    showModalImage(currentModalIndex - 1);
                }
            }
        });
    }

    // Reset zoom on image change or modal close
    function showModalImage(idx) {
        if (!currentSliderImages.length) return;
        if (idx < 0) idx = currentSliderImages.length - 1;
        if (idx >= currentSliderImages.length) idx = 0;
        currentModalIndex = idx;
        const img = currentSliderImages[currentModalIndex];
        document.getElementById('img01').src = img.src;
        activateProjectForImage(img);
        resetZoom();
    }

    // Obsługa przycisków modal-nav
    document.querySelector('.modal-nav.prev').addEventListener('click', function () {
        showModalImage(currentModalIndex - 1);
    });
    document.querySelector('.modal-nav.next').addEventListener('click', function () {
        showModalImage(currentModalIndex + 1);
    });

    // Zamknij modal i resetuj zoom
    span.onclick = function() {
        modal.style.display = "none";
        document.body.style.overflowY = "auto";
        resetZoom();
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflowY = "auto";
            resetZoom();
        }
    }
});