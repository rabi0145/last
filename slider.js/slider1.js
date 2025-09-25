
   document.addEventListener("DOMContentLoaded", () => {
      const sliderContainer = document.querySelector(".hero-slider");
      const slides = sliderContainer.querySelectorAll(".slide");
      const dots = sliderContainer.querySelectorAll(".nav-dot");
      const totalSlides = slides.length;

      let currentSlideIndex = 0;
      let autoSlideInterval = setInterval(() => changeSlide(1), 5000);

      function showSlide(index) {
        slides.forEach((s) => s.classList.remove("active"));
        dots.forEach((d) => d.classList.remove("active"));
        slides[index].classList.add("active");
        dots[index].classList.add("active");
      }

      function changeSlide(direction) {
        currentSlideIndex =
          (currentSlideIndex + direction + totalSlides) % totalSlides;
        showSlide(currentSlideIndex);
      }

      function currentSlide(n) {
        currentSlideIndex = n - 1;
        showSlide(currentSlideIndex);
      }

      // Hover pause
      sliderContainer.addEventListener("mouseenter", () =>
        clearInterval(autoSlideInterval)
      );
      sliderContainer.addEventListener("mouseleave", () => {
        autoSlideInterval = setInterval(() => changeSlide(1), 5000);
      });

      // Touch swipe
      let touchStartX = null;
      sliderContainer.addEventListener(
        "touchstart",
        (e) => (touchStartX = e.touches[0].clientX),
        { passive: true }
      );
      sliderContainer.addEventListener(
        "touchend",
        (e) => {
          if (touchStartX === null) return;
          const touchEndX = e.changedTouches[0].clientX;
          const diff = touchStartX - touchEndX;
          if (Math.abs(diff) > 50) changeSlide(diff > 0 ? 1 : -1);
          touchStartX = null;
        },
        { passive: true }
      );

      // Keyboard navigation
      document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") changeSlide(-1);
        if (e.key === "ArrowRight") changeSlide(1);
      });

      // Dots click
      dots.forEach((dot, i) =>
        dot.addEventListener("click", () => currentSlide(i + 1))
      );

      // Init
      showSlide(currentSlideIndex);
      window.changeSlide = changeSlide; // so onclick works
      window.currentSlide = currentSlide; // so onclick works
    });