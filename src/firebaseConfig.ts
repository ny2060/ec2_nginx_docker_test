import firebase from "firebase/app";
import "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDQtHhFZZbld2hgmgmSzwEcTMnv45RA5HA",
  authDomain: "triptogether-e7bac.firebaseapp.com",
  projectId: "triptogether-e7bac",
  storageBucket: "triptogether-e7bac.appspot.com",
  messagingSenderId: "920408874636",
  appId: "1:920408874636:web:b46861c88c2123410425a9",
  measurementId: "G-B3BWPC5JH3",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // 이미 초기화되었다면, 초기화 된 것을 사용함
}

const messaging = firebase.messaging();

export function requestPermission() {
  void Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      messaging
        .getToken({
          vapidKey:
            "BLTEGJyz9jByUf8b8G7RIDhvy6VpPNsvvU7T8Nlcw_7pz7SHzzARDrnev2JLlnZnoYAAvxIvZxpgqfxelO97IaM",
        })
        .then((token: string) => {
          console.log(`푸시 토큰 발급 완료 : ${token}`);
        })
        .catch((_) => {
          console.log("푸시 토큰 가져오는 중에 에러 발생");
        });
    } else if (permission === "denied") {
      console.log("푸시 권한 차단");
    }
  });
  messaging.onMessage((payload) => {
    console.log("asdf", payload);
  });
}
requestPermission();
