export const showError = (error, message) => {
    error.textContent = message;
    error.classList.toggle("notification-visible", true);
    error.classList.toggle("notification-invisible", false);
};
export const hideError = (error) => {
    error.textContent = "";
    error.classList.toggle("notification-visible", false);
    error.classList.toggle("notification-invisible", true);
};
