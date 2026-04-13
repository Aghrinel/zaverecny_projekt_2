export const showError = (error: HTMLDivElement, message: string): void => {
    error.textContent = message;
    error.classList.toggle("notification-visible", true);
    error.classList.toggle("notification-invisible", false);
};

export const hideError = (error: HTMLDivElement): void => {
    error.textContent = "";
    error.classList.toggle("notification-visible", false);
    error.classList.toggle("notification-invisible", true);
};