document.addEventListener("DOMContentLoaded", function () {
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");
  const carousel = document.querySelector(".blog-card-container");
  const cards = document.querySelectorAll(".blog-card-container .blog-card");

  if (!carousel) {
    console.error("Carousel element not found!");
    return;
  }

  let currentIndex = 0;
  const totalCards = cards.length;

  function updateCarousel() {
    const screenWidth = window.innerWidth;

    // ✅ Disable JS slider on small screens
    if (screenWidth <= 768) {
      carousel.style.transform = "none"; // Disable movement
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
      return;
    }

    // ✅ Desktop only logic
    const cardsVisible = 4;
    const translateXPercent = -(currentIndex * (100 / cardsVisible));
    carousel.style.transform = `translateX(${translateXPercent}%)`;

    // Enable/disable buttons
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= totalCards - cardsVisible;
    prevBtn.style.display = "block";
    nextBtn.style.display = "block";
  }

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < totalCards - 4) {
      currentIndex++;
      updateCarousel();
    }
  });

  // Re-run when window resizes
  window.addEventListener("resize", updateCarousel);

  updateCarousel();
});
