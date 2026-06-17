//hero
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero-left");
  const pos = hero.getBoundingClientRect().top;

  if (pos < window.innerHeight - 100) {
    hero.style.opacity = "1";
  }
});

//about
const items = document.querySelectorAll(".learn-items span");

items.forEach(item => {
  item.addEventListener("mouseenter", () => {
    item.style.transform = "scale(1.05)";
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "scale(1)";
  });
});
//benefits
const cards = document.querySelectorAll(".benefit-card");

cards.forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px)";
    card.style.boxShadow = "0 15px 30px rgba(0,0,0,0.15)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
    card.style.boxShadow = "0 6px 20px rgba(0,0,0,0.05)";
  });
});
//callback
document.getElementById("callbackForm").addEventListener("submit",function(e){
  e.preventDefault();
  alert("Thank you! We will call you back soon 🙂");
});
//syallbus
const accordions = document.querySelectorAll(".accordion");

accordions.forEach(acc=>{
acc.querySelector(".accordion-header").addEventListener("click",()=>{

acc.classList.toggle("active");

});
});
/* ===== PHASE TRAINING PREMIUM ANIMATION ===== */

document.addEventListener("DOMContentLoaded",()=>{

const phaseItems = document.querySelectorAll(".phase-item");

function revealPhase(){

const trigger = window.innerHeight - 80;

phaseItems.forEach((item,i)=>{

const top = item.getBoundingClientRect().top;

if(top < trigger){

setTimeout(()=>{
item.classList.add("show");
}, i * 180); // stagger delay

}

});

}

window.addEventListener("scroll",revealPhase);
revealPhase();

});
