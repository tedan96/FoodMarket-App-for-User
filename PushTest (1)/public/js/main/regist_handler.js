const addClickListener = () => {
    let menuItems = document.getElementsByClassName("menu_item");
    for (const menuItem of menuItems) {
        menuItem.addEventListener("click", clickMenu, false);
    }
    let menuAnchors = document.getElementsByClassName("link_menu");
    for (const menuAnchor of menuAnchors) {
        menuAnchor.addEventListener("click", clickMenu, false);
    }
}

document.querySelector("#btn-logout").addEventListener("click", logout, false);
document.querySelector("#btn-refresh").addEventListener("click", refresh, false);
document.querySelector("#btn-write").addEventListener("click", write, false);
document.querySelector("#btn-delete").addEventListener("click", deleteContent, false);
document.querySelector("#btn-write-complete").addEventListener("click", writeComplete, false);
document.querySelector("#btn-edit").addEventListener("click", editContent, false);

document.querySelector("#btn-message-complete").addEventListener("click", sendMessage, false);

addClickListener();
window.addEventListener("hashchange", hashChanged, false);


// NOTE emulator code
firebase.functions().useEmulator("localhost", 5001);
