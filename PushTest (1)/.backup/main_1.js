firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // user login success
  } else {
    window.location.href = "/";
  }
});

// assume that if user see this page then user already login
var notices = null;
var contributions = null;

const showLoader = () => {
  document.querySelector("#loader").style.display = "block";
}

const hideLoader = () => {
  document.querySelector("#loader").style.display = "none";
}

/* toast ui image format
![image file name with ext](data)

![image](url)
*/


const loadList = (id, title) => {
  document.querySelector("#content-title").innerHTML = document.querySelector("#template-title").innerHTML.replace("{Title}", title);

  switch (id) {
    case "Notices":
      loadNoticeList();
      break;

    case "Contributions":
      loadContentList(id, contributions);
      break;

    case "Messaging":
      break;
  }
  console.log(id);
}

const loadContentList = (id, snapshot) => {
  if (snapshot === null) {
    const db = firebase.firestore();
    const collection = db.collection(id).orderBy("creation_time");
    collection.get().then((querySnapshot) => {
      snapshot = querySnapshot;
      setContentList(id, snapshot);
    });
  } else {
    setContentList(id, snapshot);
  }
}

const loadNoticeList = () => {
  const id = "Notices";
  if (notices === null) {
    const db = firebase.firestore();
    const collection = db.collection(id).orderBy("creation_time");
    collection.get().then((querySnapshot) => {
      notices = querySnapshot;
      setContentList(id, notices);
    });
  } else {
    setContentList(id, notices);
  }
}


const setContentList = (menu, snapshot) => {
  showLoader();

  var resultHTML = "";
  var index = 1;

  snapshot.forEach((doc) => {
    const id = doc.id;
    const data = doc.data();
    const template = document.querySelector("#template-content-list-item").innerHTML;

    resultHTML += template.replace(/{content-id}/g, id)
      .replace("{number}", index++)
      .replace("{menu-id}", menu)
      .replace("{title}", data.title)
      .replace("{content}", data.content)
      .replace("{date}", new Date(data.creation_time.seconds * 1000).format('yyyy-MM-dd a/p hh:mm:ss'));
  });

  hideLoader();
  document.querySelector("#content-list-ul").innerHTML = resultHTML;
}

const loadPagination = (id) => {
  const db = firebase.firestore();
  const collection = db.collection("Count");

  collection.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const count = doc.data()[id];
      const template = document.querySelector("#template-paging-list-item").innerHTML;
      var resultHTML = "";

      for (let index = 0; index < count; index++) {
        resultHTML += template.replace("{page-number}", index)
          .replace("{number}", index + 1);
      }
    });
    document.querySelector("#content-list-ul").innerHTML = resultHTML;
  });
}

const clickMenu = (event) => {
  var target = event.target;

  while (!target.hasAttribute("data-id") ||
    target.tagName != "LI") {
    target = target.parentElement;
  }

  loadList(target.getAttribute("data-id"), target.getAttribute("data-title"));
}

const addClickListener = () => {
  var items = document.getElementsByClassName("menu_item");
  for (const item of items) {
    item.addEventListener("click", clickMenu);
  }
}

addClickListener();