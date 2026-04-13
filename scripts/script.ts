// Import validační funkce ze souboru validation.ts
import { validateEmail } from "./validation.js";

// Vyhledání formuláře, inputu pro e-mail a elementu s chybovou hláškou
const formular = document.querySelector(".hero-form") as HTMLFormElement | null;
const mail = document.querySelector(".mail") as HTMLInputElement | null;
const notMail = document.querySelector(".notificationMail") as HTMLDivElement | null;

// Kód se spustí jen tehdy, pokud byly všechny potřebné prvky nalezeny v HTML
if (formular && mail && notMail) {
  // Kontrola e-mailu po opuštění inputu (po kliknutí mimo)
  mail.addEventListener("blur", () => {
    validateEmail(mail, notMail);
  });

  // Kontrola e-mailu při odeslání formuláře
  formular.addEventListener("submit", (event) => {
    // Pokud validace neprojde, formulář se neodešle
    if (!validateEmail(mail, notMail)) {
      event.preventDefault();
    }
  });
}


//Připnutí tlačítka pro návrat nahoru a zobrazení tohoto tlačítka po posunutí stránky

const toTop = document.querySelector(".scroll-to-top") as HTMLButtonElement | null;

window.addEventListener("scroll", () => {
    const isScrolled = window.scrollY >= 250;
    toTop?.classList.toggle("scroll-to-top-invisible", !isScrolled);
});


