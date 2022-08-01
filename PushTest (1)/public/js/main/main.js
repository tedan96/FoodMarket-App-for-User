/* ---- assume that if user see this page then user already login ---- */

const loadTitle = (menu) => {
    const title = document.querySelector("#" + menu).innerHTML;
    document.querySelector("#content-title").innerHTML = document.querySelector("#template-title").innerHTML.replace("{Title}", title);
}

const refresh = () => {
    clearSessionData();
    history.go(0);
}

const hashChanged = () => {
    let queryString = location.hash.split("?")[1];
    let params = new URLSearchParams(queryString);

    let menu = params.get("menu");
    let id = params.get("id");
    let isWrite = params.get("isWrite");
    let isEdit = params.get("isEdit");

    if (menu === null) { // main page is notice page
        location.hash = "?menu=" + MENU_NOTICES_KEY;
        return;
    }

    if (isWrite != null || isEdit != null) {
        if (Boolean(isWrite)) {
            document.querySelector("#write-title").value = "";
            editor.reset();
        }

        document.querySelector("#content-list").hidden = true;
        document.querySelector("#content-viewer").hidden = true;
        document.querySelector("#content-writer").hidden = false;
        document.querySelector("#messaging").hidden = true;
    } else if (id !== null) { // for view content
        document.querySelector("#content-list").hidden = true;
        document.querySelector("#content-viewer").hidden = false;
        document.querySelector("#content-writer").hidden = true;
        document.querySelector("#messaging").hidden = true;
        viewContent(menu, id);
    } else if (menu === "Messaging") { // for messaging menu
        document.querySelector("#content-list").hidden = true;
        document.querySelector("#content-viewer").hidden = true;
        document.querySelector("#content-writer").hidden = true;
        document.querySelector("#messaging").hidden = false;

        loadTitle(menu);
    } else { // for content menu list
        document.querySelector("#content-list").hidden = false;
        document.querySelector("#content-viewer").hidden = true;
        document.querySelector("#content-writer").hidden = true;
        document.querySelector("#messaging").hidden = true;

        loadTitle(menu);
        loadContentList(menu);
    }
}

const clickMenu = (event) => {
    let target = event.target;

    while (!target.hasAttribute("menu-id") ||
        target.tagName != "LI") {
        target = target.parentElement;
    }
    const menu = target.getAttribute("menu-id");

    const presentMenu = getPresentMenu();

    if (presentMenu !== menu) {
        clearList();
        location.hash = "?menu=" + (menu ?? MENU_NOTICES_KEY);
    }
}



hashChanged();