import { useRef, useState } from "react";
// import Button from "../components/common/Button";
import Keypad from "../components/common/Modals/Keypad";
import Modal from "../components/common/Modals/Modal";
import { HStack, VStack } from "../components/common/Stack";
import TextArea from "../components/common/TextArea";
import useKeypadMappedNumber from "../hooks/useKeypadMappedNumber";
import useToggle from "../hooks/useToggle";
import NavigationLink from "../components/common/Navigation/NavigationLink";
// import SelectCityPage from "./SelectCountryPage";
// import { CountryCartProvider } from "../contexts/City-Cart-Context";
import Calendar from "../components/common/Calendar";
// import { useTrip } from "../contexts/Trip-Context";
// import formatDateToYYYYMMDD from "../utils/formatDateToYYYYMMDD";
import SelectCountryPage from "./SelectCountryPage";
import NavigationBar from "../components/common/TopBars/NavigationBar";

// {
//   “team_idx”:1,
//   “country_idx”: 1,
//   ”trip_name”: “hanaro”,
//   “trip_content”: “일본가자”, “trip_goal_amount”: 10000000,
//   “trip_day”: 20,
//   “trip_start_day”: “2024-07-12”
//   }

export default function CreateTripPage() {
  const tripNameInputRef = useRef<HTMLInputElement | null>(null);
  const tripContentInputRef = useRef<HTMLTextAreaElement | null>(null);
  const [tripDay, setTripDay] = useState(4);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);

  // const { addBasicInfo } = useTrip();
  const [showCalendar, toggleShowCalendar] = useToggle();
  const [showKeypad, toggleShowKeypad] = useToggle();
  const { amount, add, append, remove, clear } = useKeypadMappedNumber();

  const plusDay = () => {
    setTripDay((prev) => prev + 1);
  };
  const minusDay = () => {
    if (tripDay === 1) {
      return;
    }
    setTripDay((prev) => prev - 1);
  };
  const onClickStartDate = (date: Date) => {
    setStartDate(date);
  };

  // const addTripBasicInfo = () => {
  //   addBasicInfo({
  //     tripName: tripNameInputRef.current?.value || "여행 1",
  //     tripContent: tripContentInputRef.current?.value,
  //     tripGoalAmount: amount,
  //     tripDay,
  //     tripStartDay: formatDateToYYYYMMDD(startDate),
  //   });
  // };

  return (
    <VStack className="h-full gap-3 bg-gray-50">
      <NavigationBar title="여행 계획하기 📆" />
      <VStack className="h-full gap-3 p-6 overflow-y-scroll bg-gray-50">
        <label htmlFor={"tripTitle"} className="font-bold">
          여행 이름
        </label>
        <input
          id={"tripTitle"}
          ref={tripNameInputRef}
          type="text"
          className="p-2 text-xl font-bold transition-all border border-gray-300 rounded-md"
          placeholder="여행 1"
        />

        <TextArea
          label={"상세정보"}
          ref={tripContentInputRef}
          border
          placeholder="상세 내용을 적어주세요."
        />

        <HStack className="gap-3">
          <button className="w-16 h-16 rounded-xl shadowed"> </button>
          <button className="w-16 h-16 rounded-xl shadowed"> </button>
          <button className="w-16 h-16 rounded-xl shadowed"> </button>
          <button className="w-16 h-16 rounded-xl shadowed"> </button>
        </HStack>

        <div>
          <label htmlFor="goalAmount" className="font-bold">
            목표금액
          </label>
          <HStack>
            <button
              id="goalAmount"
              className="border-b border-black"
              onClick={toggleShowKeypad}
            >
              <span className="text-primary">{amount.toLocaleString()}원</span>
            </button>
            <span>모으기</span>
          </HStack>
        </div>

        <HStack className="items-center gap-3">
          <button
            className="w-10 h-10 text-xl border border-gray-400 rounded-md"
            onClick={minusDay}
          >
            -
          </button>
          <span className="text-lg">{tripDay}</span>
          <button
            className="w-10 h-10 text-xl border border-gray-400 rounded-md"
            onClick={plusDay}
          >
            +
          </button>
          <span className="font-light text-gray-600">
            {`${tripDay - 1}박 ${tripDay}일 일정이에요.`}
          </span>
        </HStack>

        <button
          className="mt-2 mr-auto text-gray-500 underline"
          onClick={toggleShowCalendar}
        >
          세부일정 선택하기
        </button>

        {showCalendar && (
          <Calendar
            tripDay={tripDay}
            startDate={startDate}
            onClickStartDate={onClickStartDate}
          />
        )}
        {/* <Calendar /> */}
      </VStack>

      <NavigationLink
        className="m-6"
        to={{
          page: <SelectCountryPage />,
        }}
      >
        {/* <Button className="w-full" onClick={addTripBasicInfo}>
          다음
        </Button> */}
      </NavigationLink>

      {/* 키패드 시트 */}
      <Modal
        xButton
        hideBackDrop
        modalType="sheet"
        backDrop
        dark
        show={showKeypad}
        onClose={toggleShowKeypad}
      >
        <Keypad
          onAdd={add}
          onClear={clear}
          onAppend={append}
          onRemove={remove}
          onDone={toggleShowKeypad}
        />
      </Modal>
    </VStack>
  );
}
