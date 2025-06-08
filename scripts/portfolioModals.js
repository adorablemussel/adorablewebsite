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

    function showModalImage(idx) {
        if (!currentSliderImages.length) return;
        if (idx < 0) idx = currentSliderImages.length - 1;
        if (idx >= currentSliderImages.length) idx = 0;
        currentModalIndex = idx;
        const img = currentSliderImages[currentModalIndex];
        document.getElementById('img01').src = img.src;
        activateProjectForImage(img);
    }

    // Obsługa przycisków modal-nav
    document.querySelector('.modal-nav.prev').addEventListener('click', function () {
        showModalImage(currentModalIndex - 1);
    });
    document.querySelector('.modal-nav.next').addEventListener('click', function () {
        showModalImage(currentModalIndex + 1);
    });

    // Swipe obsługa na urządzeniach dotykowych
    const modal = document.getElementById('myModal');
    let touchStartX = null;

    modal.addEventListener('touchstart', function (e) {
        if (e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
        }
    });

    modal.addEventListener('touchend', function (e) {
        if (touchStartX === null) return;
        const touchEndX = e.changedTouches[0].clientX;
        const dx = touchEndX - touchStartX;
        if (Math.abs(dx) > 50) {
            if (dx > 0) {
                showModalImage(currentModalIndex - 1);
            } else {
                showModalImage(currentModalIndex + 1);
            }
        }
        touchStartX = null;
    });

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
});