import Button from "./Button";
import NavigationBar from "./TopBars/NavigationBar";
import { HStack, VStack } from "./Stack";
import StatusBar from "./TopBars/StatusBar";
import Modal from "./Modals/Modal";
import { useState } from "react";
import Toggle from "./Toggle";
import Keypad from "./Modals/Keypad";
// import TripView from "./TripView";
// import SelectCityPage from "../../pages/SelectCountryPage";
// import { CountryCartProvider } from "../../contexts/City-Cart-Context";

// TODO: mustDelete
// const mockTripData = [
//   {
//     id: 1,
//     name: "포켓몬 센터 메가 도쿄",
//     category: "쇼핑",
//     image:
//       "http://media-cdn.tripadvisor.com/media/photo-o/1a/2c/d4/38/photo8jpg.jpg",
//   },
//   {
//     id: 2,
//     name: "츠지한",
//     category: "맛집",
//     image:
//       "http://media-cdn.tripadvisor.com/media/photo-o/1b/da/38/2d/tsujihan.jpg",
//   },
//   {
//     id: 3,
//     name: "도쿄 국립 신 미술관",
//     category: "관광명소",
//     image:
//       "https://search.pstatic.net/common?src=https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_16/20211223144425153_BFGX9I7VU.jpg/fb521_17_i2.jpg?type=w540_fst",
//   },
// ];

function IPhoneDemo() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [darkModal, setDarkModal] = useState<boolean>(false);
  const [keyPadModal, setKeyPadModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"modal" | "sheet">("modal");
  const toggleShowModal = () => {
    setShowModal((value) => !value);
  };
  const toggleDarkModal = () => {
    setDarkModal((value) => !value);
  };
  const toggleKeyPadModal = () => {
    setKeyPadModal((value) => !value);
  };
  const toggleModalType = () => {
    if (modalType == "modal") setModalType("sheet");
    else setModalType("modal");
  };
  return (
    <VStack className="relative w-iPhone h-iPhone rounded-3xl overflow-hidden border-2 border-black items-center !gap-0">
      <Modal
        show={showModal}
        modalType={modalType}
        onClose={() => setShowModal(false)}
        xButton
        dark={darkModal}
      >
        {keyPadModal ? (
          <Keypad
            type={2}
            onAppend={() => {}}
            onAdd={() => {}}
            onClear={() => {}}
            onRemove={() => {}}
            onDone={() => {}}
          />
        ) : (
          <VStack>
            <span className="text-center text-gray-500 text-bold">
              참여중인 모임이 없어요.
            </span>
            <span className="pb-4 text-center text-gray-500 text-bold">
              모임통장 서비스를 이용하시겠어요?
            </span>
            <HStack>
              <Button gray>취소</Button>
              <Button className="flex-grow">확인</Button>
            </HStack>
          </VStack>
        )}
      </Modal>
      <StatusBar />
      <NavigationBar title={"Title"} onBack={() => {}} onHome={() => {}} />
      <Toggle
        selected={showModal}
        onClick={toggleShowModal}
        label="모달 띄우기"
      />
      <Toggle
        selected={darkModal}
        onClick={toggleDarkModal}
        label="어두운 모달"
      />
      <Toggle
        selected={modalType == "sheet"}
        onClick={toggleModalType}
        label="시트 모달"
      />
      <Toggle
        selected={keyPadModal}
        onClick={toggleKeyPadModal}
        label="계산기 모달"
      />
      {/* <VStack className="w-full p-1">
        {mockTripData.map((trip) => (
          <TripView key={trip.id} {...trip} />
        ))} */}
      {/* <TripView />
        <TripView />
        <TripView /> */}
      {/* </VStack> */}
      {/* <CountryCartProvider>
        <SelectCityPage />
      </CountryCartProvider> */}
    </VStack>
  );
}

export default IPhoneDemo;
