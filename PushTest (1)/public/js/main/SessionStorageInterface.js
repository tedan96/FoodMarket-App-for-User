const getSessionData = (menu) => {
    return JSON.parse(sessionStorage.getItem(menu));
}

const setSessionData = (menu, data) => {
    sessionStorage.setItem(menu, JSON.stringify(data));
}

const clearSessionData = () => {
    // clear() function does clear login
    // sessionStorage.clear();
    sessionStorage.removeItem(MENU_NOTICES_KEY);
    sessionStorage.removeItem(MENU_CONTRIBUTIONS_KEY);
}