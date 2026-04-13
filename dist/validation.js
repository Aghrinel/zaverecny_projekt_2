// Import funkce pro skrývání/zobrazování chybových hlášek
import { showError, hideError } from "./form-utils.js";
// Obecná funkce pro kontrolu e-mailu
// Přijímá input s e-mailem a element s chybovou hláškou
// Vrací:
// true = e-mail je v pořádku
// false = e-mail není v pořádku
export const validateEmail = (mail, notMail) => {
    var _a, _b, _c;
    // Pokud je pole prázdné:
    // zobrazí se chybová hláška,
    // input dostane červené orámování
    // a funkce vrátí false
    const value = mail.value.trim();
    if (value === "") {
        showError(notMail, "Zadejte svůj e-mail");
        mail.classList.add("invalid");
        return false;
    }
    // Rozdělení e-mailu podle znaku @
    const parts = value.split("@");
    // Kontrola platnosti e-mailu:
    // 1. obsahuje přesně jednu @
    // 2. před @ je nějaký text
    // 3. za @ je tečka
    // 4. za tečkou je ještě nějaký text
    const isValid = parts.length === 2 &&
        parts[0] !== "" &&
        ((_a = parts[1]) === null || _a === void 0 ? void 0 : _a.includes(".")) &&
        ((_b = parts[1]) === null || _b === void 0 ? void 0 : _b.split(".")[0]) !== "" &&
        ((_c = parts[1]) === null || _c === void 0 ? void 0 : _c.split(".")[1]) !== "";
    // Pokud je e-mail platný:
    // chybová hláška se schová,
    // odebere se červené orámování
    // a funkce vrátí true
    if (isValid) {
        hideError(notMail);
        mail.classList.remove("invalid");
        return true;
    }
    else {
        // Pokud e-mail platný není:
        // zobrazí se chybová hláška,
        // input dostane červené orámování
        // a funkce vrátí false
        showError(notMail, "Zadejte platnou e-mailovou adresu");
        mail.classList.add("invalid");
        return false;
    }
};
