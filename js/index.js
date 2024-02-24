//! Accordion açılıp kapanmasını sağlar.Açık accordion varsa onu kapatır.
const toggleAccordion = (e) => {
  let element;
  if (!e.target.classList.contains("accordion-header")) 
    element = e.target.parentElement;  
  else 
    element = e.target;

  const content = element.nextElementSibling;
  const icon = element.lastElementChild;

  const computedStyle = window.getComputedStyle(content);
  const allAccordions = document.getElementsByClassName("accordion-content");
  for (let i = 0; i < allAccordions.length; i++) {
    if (allAccordions[i] != content) {
      allAccordions[i].style.animation =
        "accordionCloseAnimate 0.2s ease-in-out forwards";
      setTimeout(() => {
        allAccordions[i].style.display = "none";
      }, 200);
      allAccordions[i].previousElementSibling.lastElementChild.classList =
        "fa-solid fa-plus";
    }
  }
  if (computedStyle.display === "none") {
    content.style.animation = "accordionOpenAnimate 0.2s ease-in-out forwards";
    content.style.display = "block";
    icon.classList = "fa-solid fa-xmark";
  } else {
    content.style.animation = "accordionCloseAnimate 0.2s ease-in-out forwards";
    setTimeout(() => {
      content.style.display = "none";
    }, 200);
    icon.classList = "fa-solid fa-plus";
  }
};

//! Dil tercihinde sayfanın o dile çevrilmesinini sağlar ayrıca tercih ...
//! edilen dili tarayıcıda saklar boylece bir daha siteye girildiğinde...
//! Site o dilde karşımıza gelir.
const chanceLanguage = (e) => {
  let languageChoose;
  if (e.target.value == "English")
    languageChoose = "English"; 
  else 
    languageChoose = "Turkish";

  localStorage.setItem("languagedata", JSON.stringify(languageChoose));
  location.reload();
};
//! Sayfa içeriği yüklendiğinde çalışacak fonksiyon
//! Sayfa içeriği yüklendiğinde, sayfa dilini depolama verisine göre ayarlar ve gerekirse dil verisini kullanarak sayfa içeriğini günceller.
window.addEventListener("DOMContentLoaded", () => {
  const languageData = JSON.parse(localStorage.getItem("languagedata"));
  if (languageData) {
    if (languageData == "English") {
      document.getElementById("language-choose").value = "English";
      document.getElementById("footer-language-choose").value = "English";
    } else {
      document.getElementById("language-choose").value = "Turkish";
      document.getElementById("footer-language-choose").value = "Turkish";
      getLanguageData();
    }
  }
});
