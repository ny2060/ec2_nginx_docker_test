importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDQtHhFZZbld2hgmgmSzwEcTMnv45RA5HA",
  authDomain: "triptogether-e7bac.firebaseapp.com",
  projectId: "triptogether-e7bac",
  storageBucket: "triptogether-e7bac.appspot.com",
  messagingSenderId: "920408874636",
  appId: "1:920408874636:web:b46861c88c2123410425a9",
  measurementId: "G-B3BWPC5JH3",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
