let slideIndex = 1;
let autoplayInterval;
let isPlaying = true;

// Initialize slideshow
showSlide(slideIndex);
startAutoplay();

function changeSlide(n) {
  showSlide((slideIndex += n));
}

function currentSlide(n) {
  showSlide((slideIndex = n));
}

function showSlide(n) {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  // Hide all slides
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  // Show current slide
  slides[slideIndex - 1].classList.add("active");
  dots[slideIndex - 1].classList.add("active");
}

function startAutoplay() {
  autoplayInterval = setInterval(() => {
    slideIndex++;
    showSlide(slideIndex);
  }, 4000); // Change slide every 4 seconds
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

function toggleAutoplay() {
  const button = document.querySelector(".play-pause");
  if (isPlaying) {
    stopAutoplay();
    button.textContent = "▶";
    isPlaying = false;
  } else {
    startAutoplay();
    button.textContent = "⏸";
    isPlaying = true;
  }
}

// Pause autoplay on hover
const slideshow = document.querySelector(".slideshow-container");
slideshow.addEventListener("mouseenter", stopAutoplay);
slideshow.addEventListener("mouseleave", () => {
  if (isPlaying) startAutoplay();
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") changeSlide(-1);
  if (e.key === "ArrowRight") changeSlide(1);
  if (e.key === " ") {
    e.preventDefault();
    toggleAutoplay();
  }
});