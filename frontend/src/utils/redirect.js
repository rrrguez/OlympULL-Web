export function redirectToLogin() {
    setTimeout(() => {
        window.history.pushState({}, "", "/login");
        window.dispatchEvent(new PopStateEvent("popstate"));
    }, 1200);
}
