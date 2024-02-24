//! DOM ACCESS
const DOMItem = {
  signin: document.getElementById("sign-in"),
  getstart: document.getElementsByClassName("get-started"),
  input1: document.getElementById("email"),
  input2: document.getElementById("question-email"),
  accordionTitle: document.getElementById("accordion-title"),
  accordionHeader: document.getElementsByClassName("accordion-header"),
  accordionContent: document.getElementsByClassName("accordion-content"),
  sectionContent: document.getElementsByClassName("description"),
  questionRegisterContent: document.getElementById("question-register-content"),
  heroHeader: document.getElementById("hero-header"),
  heroTitle1: document.getElementById("hero-title1"),
  heroTitle2: document.getElementById("hero-title2"),
  contact: document.getElementById("contact"),
  footerlink: document.getElementsByClassName("footer-link"),
};
const loading = document.getElementsByClassName("loading")[0];
//! DOM ACCESS

//! Dil dosyasından alınan veriye göre web sayfasının belirli alanlarını güncelleyen asenkron dil fonksiyonu.
const getLanguageData = async () => {
  try {
    loading.style.display = "flex";
    const { data } = await axios.get("./js/turkishLanguage.json");
    const {
      signin,
      getstart,
      input1,
      input2,
      accordionTitle,
      accordionHeader,
      accordionContent,
      sectionContent,
      questionRegisterContent,
      heroHeader,
      heroTitle1,
      heroTitle2,
      contact,
      footerlink,
    } = DOMItem;
    data.forEach((item) => {
      switch (item.section) {
        case "components":
          signin.textContent = item.content.button1;
          getstart[0].innerHTML = `${item.content.button2} <i class="fa-solid fa-angle-right"></i>`;
          getstart[1].innerHTML = `${item.content.button2} <i class="fa-solid fa-angle-right"></i>`;
          input1.placeholder = item.content.input;
          input2.placeholder = item.content.input;
          break;
        case "hero":
          heroHeader.textContent = item.content.header;
          heroTitle1.textContent = item.content.description1;
          heroTitle2.textContent = item.content.description2;
          break;
        case "section-header":
          for (let i = 0; i < item.content.length; i++)
            sectionContent[i].firstElementChild.textContent = item.content[i];
          break;
        case "section-desc":
          for (let i = 0; i < item.content.length; i++)
            sectionContent[i].lastElementChild.textContent = item.content[i];
          break;
        case "accordion-header":
          accordionTitle.textContent = item.title;
          for (let i = 0; i < item.content.length; i++)
            accordionHeader[i].firstElementChild.textContent = item.content[i];
          break;
        case "accordion-content":
          for (let i = 0; i < item.content.length; i++)
            accordionContent[i].firstElementChild.innerHTML = item.content[i];
          break;
        case "question-register":
          questionRegisterContent.textContent = item.content.description;
          break;
        case "footer":
          contact.textContent = item.content.description;
          for (let i = 0; i < item.content.links.length; i++)
            footerlink[i].firstChild.textContent = item.content.links[i];
          break;
      }
    });
  } catch (error) {
    console.log("Not access language data." + error);
  } finally {
    loading.style.display = "none";
  }
};
