
//#region  loader
const showLoader = () => {
    document.querySelector("#loader").style.display = "block";
}

const hideLoader = () => {
    document.querySelector("#loader").style.display = "none";
}
//#endregion loader

//#region List

let totalCount = 0;
const PAGINATION = 10;


const clickRefresh = (e) => {
    sessionStorage.clear();
    location.reload();
}

// use "sessionStorage" for caching. notice, contribution
// https://developer.mozilla.org/ko/docs/Web/API/Window/sessionStorage

const doServerData = (id, startIndex) => {
    const db = firebase.firestore();
    const collection = db.collection(id).orderBy("creation_time", "desc").startAt(startIndex).limit(PAGINATION);
    // each foreach action use server connection....TT
    // https://stackoverflow.com/questions/50244743/firestore-enablepersistence-and-then-using-redux-with-offline-database
    // https://firebase.google.com/docs/firestore/manage-data/enable-offline?hl=ko#%EC%9B%B9
    collection.get()
        .then((querySnapshot) => {
            var listForSaving = [];
            var index = startIndex + 1;

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                listForSaving.push({
                    id: doc.id,
                    index: index++,
                    title: data.title,
                    content: data.content,
                    creation_time: new Date(data.creation_time.seconds * 1000).format('yyyy-MM-dd a/p hh:mm:ss')
                });
            });

            const key = `${id}${startIndex}`;
            sessionStorage.setItem(key, JSON.stringify(listForSaving));
            setList(sessionStorage.getItem(key), id, startIndex);
            pagination(startIndex + 1);
        })
        .catch((e) => {
            console.log("Exception from load server data.");
            window.alert(e);
        });
}

const setList = (data, id, startIndex) => {
    document.querySelector("#content-list-ul").innerHTML = "";

    showLoader();
    const list = JSON.parse(data);
    var resultHTML = "";
    const template = document.querySelector("#template-content-list-item").innerHTML;

    for (let index = startIndex, l = Math.min(startIndex + PAGINATION, totalCount); index < l; index++) {
        const element = list[index];

        resultHTML += template.replace(/{content-id}/g, element.id)
            .replace("{number}", element.index)
            .replace("{menu-id}", id)
            .replace("{title}", element.title)
            .replace("{content}", element.content)
            .replace("{date}", element.creation_time);
    }
    hideLoader();

    document.querySelector("#content-list-ul").innerHTML = resultHTML;
}

const loadTitle = (title) => {
    document.querySelector("#content-title").innerHTML = document.querySelector("#template-title").innerHTML.replace("{Title}", title);
}

const loadList = (id, startIndex) => {
    const localData = sessionStorage.getItem(`${id}${startIndex}`);
    if (localData) {
        console.log("local data exist");
        // local data exist
        setList(localData, id, startIndex);
        pagination(startIndex + 1);
    } else {
        console.log("need server data");
        // need server data
        doServerData(id, startIndex);
    }
}
//#endregion List

//#region pagination
const requestCount = (id) => {
    const db = firebase.firestore();
    const doc = db.collection("Meta").doc("Count");
    totalCount = -1;
    doc.get()
        .then((querySnapshot) => {
            totalCount = parseInt(querySnapshot.data()[id], 10);
            return Promise.resolve(totalCount);
        });
}

const pagination = (postIndex) => {
    currPage = postIndex / PAGINATION + 1;

}
//#endregion pagination

const clickMenu = (event) => {
    let target = event.target;

    while (!target.hasAttribute("data-id") ||
        target.tagName != "LI") {
        target = target.parentElement;
    }

    loadTitle(target.getAttribute("data-title"));

    const id = target.getAttribute("data-id");
    requestCount(id).then(() => {
        loadList(id, 0);
    });
}

const addClickListener = () => {
    const items = document.getElementsByClassName("menu_item");
    for (const item of items) {
        item.addEventListener("click", clickMenu);
    }

    document.getElementById("btn_refresh").addEventListener("click", clickRefresh);
}
addClickListener();
