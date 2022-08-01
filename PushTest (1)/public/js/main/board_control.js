// caching server data
// if using ./firebase_cache.js
// follow variable does not need.

const MENU_NOTICES_KEY = "Notices";
const MENU_CONTRIBUTIONS_KEY = "Contributions";

const getPresentMenu = () => {
    return new URLSearchParams(location.hash.split("?")[1]).get("menu");
}


const editor = new toastui.Editor({
    el: document.querySelector('#content-writer-editor'),
    height: '550px',
    initialValue: "",
    hideModeSwitch: true,
    initialEditType: 'wysiwyg'
});

const viewer = new toastui.Editor.factory({
    el: document.querySelector('#toast-viewer'),
    viewer: true
});


const showLoader = () => {
    document.querySelector("#loader").hidden = false;
}

const hideLoader = () => {
    document.querySelector("#loader").hidden = true;
}


const snapshotToObject = (snapshot) => {
    let result = {};
    snapshot.forEach((doc) => {
        result[doc.id] = doc.data();
    });
    return result;
}

const clearList = () => {
    document.querySelector("#content-list-ul").innerHTML = "";
}

const loadContentList = (menu) => {
    showLoader();

    let data = getSessionData(menu);

    if (data === null) {
        const db = firebase.firestore();
        const collection = db.collection(menu).orderBy("creation_time", "desc");
        collection.get().then((querySnapshot) => {
            data = snapshotToObject(querySnapshot);
            setContentList(menu, data);
            setSessionData(menu, data);
        });
    } else {
        setContentList(menu, data);
    }
}

const setContentList = (menu, data) => {
    let resultHTML = "";
    let index = 1;

    for (const id in data) {
        const doc = data[id];
        const template = document.querySelector("#template-content-list-item").innerHTML;

        resultHTML += template.replace(/{content-id}/g, id)
            .replace("{number}", index++)
            .replace("{menu-id}", menu)
            .replace("{title}", doc["title"])
            .replace("{content}", doc["content"])
            .replace("{date}", new Date(doc["creation_time"].seconds * 1000).format('yyyy-MM-dd a/p hh:mm:ss'));
    }

    hideLoader();
    document.querySelector("#content-list-ul").innerHTML = resultHTML;
}

// const loadPagination = (id) => {
//     const db = firebase.firestore();
//     const collection = db.collection("Count");

//     collection.get().then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             const count = doc.data()[id];
//             const template = document.querySelector("#template-paging-list-item").innerHTML;
//             let resultHTML = "";

//             for (let index = 0; index < count; index++) {
//                 resultHTML += template.replace("{page-number}", index)
//                     .replace("{number}", index + 1);
//             }
//         });
//         document.querySelector("#content-list-ul").innerHTML = resultHTML;
//     });
// }

const viewContent = (menu, id) => {
    viewer.setMarkdown(getSessionData(menu)[id]["content"]);
}

const write = () => {
    window.location.hash += "&isWrite=true";
}

const writeComplete = () => {
    let queryString = window.location.hash.split("?")[1];
    let params = new URLSearchParams(queryString);

    let menu = params.get("menu");
    let id = params.get("id");

    const title = document.querySelector("#write-title").value;
    const content = editor.getHtml();
    const creation_time = firebase.firestore.Timestamp.fromDate(new Date());

    const db = firebase.firestore();

    if (id === null) {
        // Add a new document with auto generated id.
        db.collection(menu).add({
                title: title,
                content: content,
                creation_time: creation_time
            })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
                clearSessionData();
                location.hash = "?menu=" + menu;
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    } else {
        // if edit content, id is not null
        // so op comes here
        var editDocRef = db.collection(menu).doc(id);

        // Set the "capital" field of the city 'DC'
        editDocRef.update({
                title: title,
                content: content
            })
            .then(function () {
                console.log("Document successfully updated!");
                clearSessionData();
                location.hash = "?menu=" + menu;
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }
}


const editContent = () => {
    let queryString = location.hash.split("?")[1];
    let params = new URLSearchParams(queryString);
    const menu = params.get("menu");
    const id = params.get("id");
    const content = getSessionData(menu)[id];

    editor.setHtml(content["content"]);
    document.querySelector("#write-title").value = content["title"];

    window.location.hash += "&isEdit=true";
}

const deleteContent = () => {
    const checkedContents = document.querySelectorAll('input[name="chk_content"]:checked');
    let checkedId = [];
    checkedContents.forEach((checkbox) => {
        let target = checkbox;
        while (!target.hasAttribute("data-contentid") ||
            target.tagName != "LI") {
            target = target.parentElement;
        }
        checkedId.push(target.dataset.contentid);
    });
    const presentMenu = getPresentMenu();

    const db = firebase.firestore();
    checkedId.forEach((id) => {
        db.collection(presentMenu).doc(id).delete()
            .then(() => {
                console.log("Document successfully deleted!");
                refresh();
            })
            .catch((error) => {
                console.error("Error removing document: ", error);
            });
    });
}