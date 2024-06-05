import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDQtHhFZZbld2hgmgmSzwEcTMnv45RA5HA",
  authDomain: "triptogether-e7bac.firebaseapp.com",
  projectId: "triptogether-e7bac",
  storageBucket: "triptogether-e7bac.appspot.com",
  messagingSenderId: "920408874636",
  appId: "1:920408874636:web:b46861c88c2123410425a9",
  measurementId: "G-B3BWPC5JH3",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
console.log("bbb", messaging);
getToken(messaging, {
  vapidKey:
    "BLTEGJyz9jByUf8b8G7RIDhvy6VpPNsvvU7T8Nlcw_7pz7SHzzARDrnev2JLlnZnoYAAvxIvZxpgqfxelO97IaM",
}).then((token) => {
  if (token.length > 0) {
    console.log("푸시 토큰 : ", token);
  } else {
    console.log("푸시 토큰 실패 !");
  }
});

onMessage(messaging, (payload) => {
  console.log("message received.", payload);
});
