// Import funkce pro skrývání/zobrazování chybových hlášek
import { showError, hideError } from "./form-utils.js";

// Objekt s validačními funkcemi pro jednotlivá validační pravidla
const validator = {
    required(value: string) {
        return !!value;
    },
    minlength(value: string, par: number) {
        return value.length >= par;
    },
    maxlength(value: string, par: number) {
        return value.length <= par;
    }
};

// Objekt s pravidly validace pro jednotlivá pole formuláře
const valRules = {
    // Pravidla pro křestní jméno
    firstname: [
        { rule: "required", message: "Zadejte své jméno" },
        { rule: "minlength", par: 2, message: "Jméno musí mít alespoň 2 znaky" },
        { rule: "maxlength", par: 50, message: "Jméno nesmí být delší než 50 znaků" },
    ],
    // Pravidla pro příjmení
    lastname: [
        { rule: "required", message: "Zadejte své příjmení" },
        { rule: "minlength", par: 2, message: "Příjmení musí mít alespoň 2 znaky" },
        { rule: "maxlength", par: 130, message: "Příjmení nesmí být delší než 130 znaků" },
    ],
} as const;

// Seznam polí, která chceme validovat
const controls = ["firstname", "lastname"] as const;

// Společná funkce pro validaci firstname a lastname
const validateTextField = (control: "firstname" | "lastname"): boolean => {
    const input = document.getElementById(control) as HTMLInputElement | null;
    const error = document.getElementById(`${control}-error`) as HTMLDivElement | null;

    if (!input || !error) return false;

    let hasError = false;
    hideError(error);
    input.classList.remove("invalid");


        // Projdou se všechna validační pravidla pro dané pole
        valRules[control].forEach((ruleObject) => {
            // Pokud už byla nalezena chyba, další pravidla se přeskočí
            if (hasError) return;

            let isValid = false;
            //Na začátku se inputu odebere červené orámování
            input.classList.remove("invalid");

            // Podle pravidla se zavolá správná validační funkce
            if (ruleObject.rule === "required") {
                isValid = validator.required(input.value);
            } else if (ruleObject.rule === "minlength") {
                isValid = validator.minlength(input.value, ruleObject.par);
            } else if (ruleObject.rule === "maxlength") {
                isValid = validator.maxlength(input.value, ruleObject.par);
            }

            // Pokud validace neprojde:
            if (!isValid) {
                // vloží se text chybové hlášky
                if(error) {
                    // chybová hláška se zobrazí
                    showError(error, ruleObject.message);
                    // input dostane třídu invalid pro červené orámování
                    input.classList.add("invalid");
                    hasError = true;
                }
            }
        });  
        return !hasError;      
    };

// Napojení blur validace pro firstname a lastname
controls.forEach((control) => {
const input = document.getElementById(control) as HTMLInputElement;

    input.addEventListener("blur", () => {
        validateTextField(control);
    });
});


// Import validační funkce ze souboru validation.ts
import { validateEmail } from "./validation.js";

// Vyhledání formuláře, inputu pro e-mail a elementu s chybovou hláškou
const formular = document.querySelector(".form-registration") as HTMLFormElement;
const mail = document.querySelector(".registration-mail") as HTMLInputElement;
const notMail = document.querySelector(".notificationMail") as HTMLDivElement;


// Kód se spustí jen tehdy, pokud byly všechny potřebné prvky nalezeny v HTML
if (formular && mail && notMail) {
  // Kontrola e-mailu po opuštění inputu (po kliknutí mimo)
  mail.addEventListener("blur", () => {
    validateEmail(mail, notMail);
  });


}


//Validace hesla a jeho potvrzení
const password = document.querySelector(".password-required") as HTMLInputElement | null;
const passwordError = document.querySelector(".notificationPasswordRequired") as HTMLDivElement | null;

const confirmPassword = document.querySelector(".password-confirm") as HTMLInputElement | null;
const confirmPasswordError = document.querySelector(".notificationPasswordConfirm") as HTMLDivElement | null;

// Validace prvního hesla
const validatePassword = (): boolean => {
    if (!password || !passwordError) return false;

    hideError(passwordError)
    password.classList.remove("invalid");

    if (password.value.trim() === "") {
        showError(passwordError, "Zadejte heslo");
        password.classList.add("invalid");
        return false;
    }

    if (password.value.length < 8) {
        showError(passwordError, "Heslo musí mít alespoň 8 znaků");
        password.classList.add("invalid");
        return false;
    }

    return true;
};

// Validace potvrzení hesla
const validateConfirmPassword = (): boolean => {
    if (!password || !confirmPassword || !confirmPasswordError) return false;

    hideError(confirmPasswordError);
    confirmPassword.classList.remove("invalid");

    if (confirmPassword.value.trim() === "") {
        showError(confirmPasswordError, "Zadejte heslo znovu");
        confirmPassword.classList.add("invalid");
        return false;
    }

    if (confirmPassword.value !== password.value) {
        showError(confirmPasswordError, "Hesla se neshodují");        
        confirmPassword.classList.add("invalid");
        return false;
    }

    return true;
};

// Kontrola prvního hesla po opuštění pole
password?.addEventListener("blur", () => {
validatePassword();

    // Když už je vyplněné i druhé pole, zkontroluje se znovu i jeho shoda
if (confirmPassword && confirmPassword.value.trim() !== "") {
    validateConfirmPassword();
    }
});

// Kontrola druhého hesla po opuštění pole
confirmPassword?.addEventListener("blur", () => {
    validateConfirmPassword();
});



formular?.addEventListener("submit", (event) => {
    const isFirstnameValid = validateTextField("firstname");
    const isLastnameValid = validateTextField("lastname");
    const isEmailValid = validateEmail(mail, notMail);
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (
        !isFirstnameValid ||
        !isLastnameValid ||
        !isEmailValid ||
        !isPasswordValid ||
        !isConfirmPasswordValid
    ) {
        event.preventDefault();
    }
});

    