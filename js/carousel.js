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
  let autoSlideInterval;

  function updateCarousel() {
    const screenWidth = window.innerWidth;
    let cardsVisible;
    
    // Mobile par 2 cards dikhayen, desktop par 4
    if (screenWidth <= 768) {
      cardsVisible = 1;
    } else {
      cardsVisible = 4;
    }
    
    const maxIndex = totalCards - cardsVisible;

    // Carousel ko loop karne ke liye
    if (currentIndex > maxIndex) {
        currentIndex = 0; 
    }
    
    // ✅ Sahi calculation: Har card ki width + gap ko shamil karen
    const cardWidth = cards[0].offsetWidth; // Pehle card ki width lein
    const gap = 30; // CSS mein jo gap set kiya hai wohi yahan likhen
    const cardAndGap = cardWidth + gap;
    const translateXValue = -(currentIndex * cardAndGap);

    carousel.style.transform = `translateX(${translateXValue}px)`;

    // Mobile par buttons chupayenge, desktop par dikhayenge
    if (screenWidth > 768) {
      prevBtn.style.display = "block";
      nextBtn.style.display = "block";
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= maxIndex;
    } else {
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
    }
  }

  // Auto-slide shuru karne ka function
  function startAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
      const screenWidth = window.innerWidth;
      let cardsVisible = (screenWidth <= 768) ? 2 : 4;

      if (currentIndex >= totalCards - cardsVisible) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }
      updateCarousel();
    }, 3000); // 3 seconds
  }

  prevBtn.addEventListener("click", () => {
    clearInterval(autoSlideInterval);
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
    startAutoSlide();
  });

  nextBtn.addEventListener("click", () => {
    clearInterval(autoSlideInterval);
    if (currentIndex < totalCards - ((window.innerWidth <= 768) ? 2 : 4)) {
      currentIndex++;
      updateCarousel();
    }
    startAutoSlide();
  });

  window.addEventListener("resize", () => {
    updateCarousel();
    startAutoSlide();
  });

  updateCarousel();
  startAutoSlide();
});