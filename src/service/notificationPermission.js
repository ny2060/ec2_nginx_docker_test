import { getToken } from "firebase/messaging";
// import { sendTokenToServer } from './api';
import { registerServiceWorker } from "./registerServiceWorker";
import { messaging } from "./foregroundMessage";

export async function handleAllowNotification() {
  registerServiceWorker(); // 나중에 설명
  console.log("22222");
  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BLTEGJyz9jByUf8b8G7RIDhvy6VpPNsvvU7T8Nlcw_7pz7SHzzARDrnev2JLlnZnoYAAvxIvZxpgqfxelO97IaM",
      });
      if (token) {
        console.log("asdf", token);
        //sendTokenToServer(token); // (토큰을 서버로 전송하는 로직)
      } else {
        alert("토큰 등록이 불가능 합니다. 생성하려면 권한을 허용해주세요");
      }
    } else if (permission === "denied") {
      alert(
        "web push 권한이 차단되었습니다. 알림을 사용하시려면 권한을 허용해주세요"
      );
    }
  } catch (error) {
    console.error("푸시 토큰 가져오는 중에 에러 발생", error);
  }
}
