import Button from "../../../components/common/Button";
import { VStack } from "../../../components/common/Stack";
import NavigationBar from "../../../components/common/TopBars/NavigationBar";
import { useNavigation } from "../../../contexts/useNavigation";
// import MainPage from "../../Main/MainPage";
// import MoimDetailPage from "../MoimDetailPage";
// import MoimServiceMainPage from "../MoimServiceMainPage";

export default function ExchangeRateDonePage() {
  const { back } = useNavigation();

  const onClckComplete = () => {
    back();
    back();
    // setPath([
    //   { backgroundColor: "bg-[#e3e7e9]", page: <MainPage /> },
    //   { backgroundColor: "bg-gray-50", page: <MoimServiceMainPage /> },
    //   { backgroundColor: "bg-gray-50", page: <MoimDetailPage /> },
    // ]);
  };

  return (
    <VStack className="items-center w-full h-full gap-4 px-6 bg-gray-50">
      <NavigationBar title="환율 알림신청 🔔" />

      <VStack className="gap-4 mt-32">
        <p className="mx-auto text-9xl">💵</p>
        <p className="mb-10 text-2xl text-primary">
          🔆 환율 알림 신청이 완료되었어요!
        </p>
      </VStack>
      <Button className="w-60" roundedFull onClick={onClckComplete}>
        확인
      </Button>
    </VStack>
  );
}
