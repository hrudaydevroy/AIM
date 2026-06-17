function openCourse(course) {
  localStorage.setItem("selectedCourse", course);
  window.location.href = "course.html";
}

function goLogin() {
  window.location.href = "login.html";
}

function goCourses() {
  alert("Scroll down to see courses 🙂");
}


let currentSlide = 0;
const slides = document.querySelectorAll(".hero-slide");

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Auto slide
setInterval(nextSlide, 5000);

//button enroll now
// ENROLL BUTTON NAVIGATION
document.querySelectorAll(".hero-left button").forEach(btn => {
  btn.addEventListener("click", () => {
    window.location.href = "course.html"; // or enroll.html
  });
});

//logo
const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", () => {
  loginBtn.classList.add("active");

  setTimeout(() => {
    window.location.href = "login.html"; // redirect
  }, 700);
});


// ===== ABOUT SECTION SCROLL ANIMATION =====
const aboutSection = document.querySelector(".about-section");

const aboutObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        aboutSection.classList.add("show");
      }
    });
  },
  {
    threshold: 0.3
  }
);

aboutObserver.observe(aboutSection);


// ===== COUNT UP ANIMATION =====
const counters = document.querySelectorAll(".count");
let counterStarted = false;

function startCounting() {
  if (counterStarted) return;
  counterStarted = true;

  counters.forEach(counter => {
    const target = +counter.dataset.target;
    let current = 0;
    const increment = target / 80;

    const updateCount = () => {
      current += increment;
      if (current < target) {
        counter.innerText = Math.ceil(current) + "+";
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target + "+";
      }
    };

    updateCount();
  });
}

// Trigger when about section visible
const statsObserver = new IntersectionObserver(
  entries => {
    if (entries[0].isIntersecting) {
      startCounting();
    }
  },
  { threshold: 0.4 }
);

statsObserver.observe(document.querySelector(".about-stats"));
// ===== TOP RANKERS ANIMATION =====
const rankerSection = document.querySelector(".rankers-section");

const rankerObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    rankerSection.classList.add("show");
  }
},{threshold:0.3});

rankerObserver.observe(rankerSection);


// ===== FOUNDER ANIMATION =====
const founderSection = document.querySelector(".founder-section");

const founderObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    founderSection.classList.add("show");
  }
},{threshold:0.3});

founderObserver.observe(founderSection);


// ===== TESTIMONIAL SLIDER =====
const testimonials = document.querySelectorAll(".testimonial-card");
let index = 0;

setInterval(() => {
  testimonials.forEach(t => t.classList.remove("active"));
  testimonials[index].classList.add("active");
  index = (index + 1) % testimonials.length;
}, 4000);


// ===== PROUD PARENTS SLIDER =====
const parentSlides = document.querySelectorAll(".parent-slide");
const parentDots = document.querySelectorAll(".parent-dots .dot");

let parentIndex = 0;

function showParentSlide(i) {
  parentSlides.forEach(slide => slide.classList.remove("active"));
  parentDots.forEach(dot => dot.classList.remove("active"));

  parentSlides[i].classList.add("active");
  parentDots[i].classList.add("active");
}

// AUTO SLIDE
setInterval(() => {
  parentIndex = (parentIndex + 1) % parentSlides.length;
  showParentSlide(parentIndex);
}, 5000);

// DOT CLICK
parentDots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    parentIndex = i;
    showParentSlide(parentIndex);
  });
});
function submitForm(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const mobile = document.getElementById("mobile").value;
  const message = document.getElementById("message").value;

  // DATA OBJECT
  const studentData = {
    name,
    email,
    mobile,
    message,
    time: new Date().toLocaleString()
  };

  // SAVE TO LOCAL STORAGE
  let submissions = JSON.parse(localStorage.getItem("contactSubmissions")) || [];
  submissions.push(studentData);
  localStorage.setItem("contactSubmissions", JSON.stringify(submissions));

  // WHATSAPP MESSAGE
  const adminNumber = "919876543210"; // change admin number
  const whatsappMessage =
    `New Contact Enquiry 🚨%0A
Name: ${name}%0A
Email: ${email}%0A
Mobile: ${mobile}%0A
Message: ${message}`;

  window.open(
    `https://wa.me/${adminNumber}?text=${whatsappMessage}`,
    "_blank"
  );

  alert("Details submitted successfully!");

  // RESET FORM
  e.target.reset();
}
