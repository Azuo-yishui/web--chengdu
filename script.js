// 页面交互：顶部状态、移动端导航与首页轮播
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 24);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");
  menuToggle?.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    menuToggle.setAttribute("aria-label", expanded ? "展开导航" : "收起导航");
    navigation?.classList.toggle("is-open", !expanded);
  });
  navigation?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("is-open");
      menuToggle?.setAttribute("aria-expanded", "false");
      menuToggle?.setAttribute("aria-label", "展开导航");
    });
  });

  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  const dots = Array.from(document.querySelectorAll(".carousel-dots button"));
  if (!slides.length) return;
  let activeIndex = 0;
  let timer;
  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle("is-active", i === activeIndex));
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === activeIndex);
      dot.setAttribute("aria-current", i === activeIndex ? "true" : "false");
    });
    const counter = document.querySelector(".current-slide");
    if (counter) counter.textContent = String(activeIndex + 1).padStart(2, "0");
  };
  const restartTimer = () => {
    window.clearInterval(timer);
    timer = window.setInterval(() => showSlide(activeIndex + 1), 6500);
  };
  document.querySelector(".carousel-prev")?.addEventListener("click", () => {
    showSlide(activeIndex - 1);
    restartTimer();
  });
  document.querySelector(".carousel-next")?.addEventListener("click", () => {
    showSlide(activeIndex + 1);
    restartTimer();
  });
  dots.forEach((dot, index) => dot.addEventListener("click", () => {
    showSlide(index);
    restartTimer();
  }));
  if (slides.length > 1) restartTimer();
});
