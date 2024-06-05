importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js"
);

self.addEventListener("install", function (e) {
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm service worker가 실행되었습니다.");
});

const firebaseConfig = {
  apiKey: "AIzaSyDQtHhFZZbld2hgmgmSzwEcTMnv45RA5HA",
  authDomain: "triptogether-e7bac.firebaseapp.com",
  projectId: "triptogether-e7bac",
  storageBucket: "triptogether-e7bac.appspot.com",
  messagingSenderId: "920408874636",
  appId: "1:920408874636:web:b46861c88c2123410425a9",
  measurementId: "G-B3BWPC5JH3",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("alaarm", payload);
  const notificationTitle = payload.title;
  const notificationOptions = {
    body: payload.body,
    // icon: payload.icon
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
