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
    const modalImages = Array.from(document.querySelectorAll('.modal-image'));
    let currentModalIndex = 0;

    // Otwieranie modala i zapamiętanie indeksu
    modalImages.forEach((img, idx) => {
        img.addEventListener('click', function () {
            currentModalIndex = idx;
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
            document.body.style.overflow = "hidden"; // Disable scrolling
        });
    });

    function showModalImage(idx) {
        if (idx < 0) idx = modalImages.length - 1;
        if (idx >= modalImages.length) idx = 0;
        currentModalIndex = idx;
        const img = modalImages[currentModalIndex];
        document.getElementById('img01').src = img.src;
        document.getElementById('caption').textContent = img.closest('.project')?.querySelector('.description')?.textContent || '';
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
        if (Math.abs(dx) > 50) { // minimalny dystans do uznania za swipe
            if (dx > 0) {
                showModalImage(currentModalIndex - 1); // swipe right
            } else {
                showModalImage(currentModalIndex + 1); // swipe left
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