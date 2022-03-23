console.log("Hello world!");
//odemo u inspect pa u console se vidi: Hello world!
const myName = "Jonas Schmedtmann";
const h1 = document.querySelector(".heading-primary");
console.log(myName);
console.log(h1);
/*
h1.addEventListener("click", function () {
  h1.textContent = myName; //kad kliknemo na glavni naslov pojavi se ime: Jonas Schmedtmann
  h1.style.backgroundColor = "red"; //pojavi se i crvena pozadinska boja
  h1.style.padding = "5rem"; //i doda se padding oko imena
});
*/
//set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;
//make mobile navigation work
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});
//smooth scrolling animation
const allLinks = document.querySelectorAll("a:link");
//console.log(allLinks); (odemo na inspect pa vidimo tamo u konsoli sve linkove)
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");
    //scrol back to top
    if (href === "#") window.scrollTo({ top: 0, behavior: "smooth" });
    //scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
    //close mobile navigation
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});
//sticky navigation
const sectionHeroEl = document.querySelector(".section-hero");
const obs = new IntersectionObserver(
  function (entries) {
    //niz ulazaka
    const ent = entries[0]; //prvi element se obeležava sa 0, a i ima samo jedan
    console.log(ent); //da bi videli u inspect consoli true or false
    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }
    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // in the viewport (posmatraćemo kako se kreće kroz viewport)
    root: null, // we will observe this hero section inside of the viewport
    threshold: 0, // we will have event soon as 0% of the hero section is inside of the viewport
    rootMargin: "-80px", //.sticky .header { height: 8rem; } da ne bi preklopilo "as featured in"
  }
);
obs.observe(sectionHeroEl);

// Fixing flexbox gap property missing in some Safari versions (ovo nisam kucao)
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
