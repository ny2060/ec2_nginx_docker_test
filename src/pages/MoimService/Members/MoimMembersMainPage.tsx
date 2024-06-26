import { useEffect, useState } from "react";
import Arrow from "../../../components/common/Arrow";
import Avatar from "../../../components/common/Avatar";
import Button from "../../../components/common/Button";
import { HStack, Spacer, VStack } from "../../../components/common/Stack";
import NavigationBar from "../../../components/common/TopBars/NavigationBar";
import { useNavigation } from "../../../contexts/useNavigation";
import { useFetch } from "../../../hooks/useFetch";
import {
  AcceptTeamMemberReqDto,
  AcceptTeamMembersReqDto,
  RejectTeamMembersReqDto,
  TeamMembersReqDto,
} from "../../../types/teamMember/TeamMemberRequestDto";
import { TeamMembersResDto } from "../../../types/teamMember/TeamMemberResponseDto";
import {
  AcceptTeamMemberPutURL,
  AcceptTeamMembersPutURL,
  ExportTeamMemberPutURL,
  ExportTeamMembersPutURL,
  ExportTeamPutURL,
  GenerateInviteLinkPostURL,
  RejectTeamMemberPutURL,
  TeamMembersPostURL,
} from "../../../utils/urlFactory";
import { useFetchTrigger } from "../../../hooks/useFetchTrigger";
import Loading from "../../../components/common/Modals/Loading";
import { useAuth } from "../../../contexts/useAuth";
import { useModal } from "../../../hooks/useModal";
import { ExportTeamReqDto } from "../../../types/team/TeamRequestDto";
import Modal from "../../../components/common/Modals/Modal";

interface MoimMembersMainPageProps {
  teamIdx: number;
}

function MoimMembersMainPage({ teamIdx }: MoimMembersMainPageProps) {
  const { home } = useNavigation();
  const { member } = useAuth();

  const requestData: TeamMembersReqDto = { teamIdx: teamIdx };
  const [currentTeamMemberIdx, setCurrentTeamMemberIdx] = useState<number>();

  // 모임원 전체 정보 가져오기
  const {
    data: teamMemersData,
    isLoading: isTeamMembersLoading,
    refetch,
  } = useFetch<TeamMembersReqDto, TeamMembersResDto[]>(
    TeamMembersPostURL(),
    "POST",
    requestData
  );

  // 초대하기
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const openInvitationModal = () => {
    setShowInvitationModal(true);
  };
  const closeInvitationModal = () => {
    setShowInvitationModal(false);
  };

  // const { data: link, trigger: inviteLinkTrigger } = useFetchTrigger<
  //   InviteTeamReqDto,
  //   string
  // >(GenerateInviteLinkPostURL(), "POST");

  // const generateInviteLink = () => {
  //   const inviteTeamDto: InviteTeamReqDto = {
  //     // Todo: teamIdx 가져오기
  //     memberIdx: member.memberIdx,
  //     teamIdx: 1,
  //   };
  //   inviteLinkTrigger(inviteTeamDto);
  //   alert("초대 링크가 복사되었습니다."); // Todo: 복사 기능 추가하기
  // };

  // useEffect(() => {
  //   if (link) {
  //     console.log("링크 확인: " + link);
  //   }
  // }, [link]);

  // 초대링크 복사
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("초대 링크가 복사되었습니다!");
    } catch (error) {
      console.error(error);
    }
  };

  const BASE_URL = import.meta.env.VITE_API_URL;

  const fetchGenerateLink = () => {
    fetch(GenerateInviteLinkPostURL(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        memberIdx: member.memberIdx,
        teamIdx: teamIdx,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("오류 발생");
        }
      })
      .then((data) => {
        // http://localhost:8080을 BASE_URL로 치환
        const updatedData = data.replace("http://localhost:8080", BASE_URL);
        copyToClipboard(updatedData);
      })
      .catch((error) => {
        console.error("오류 발생: ", error);
      });
  };

  // 모임원 전체 수락하기
  const { trigger: allAcceptTrigger, isLoading: allAcceptIsLoading } =
    useFetchTrigger<AcceptTeamMembersReqDto, null>(
      AcceptTeamMembersPutURL(),
      "PUT"
    );

  const acceptAll = () => {
    const acceptAllDto: AcceptTeamMembersReqDto = {
      teamIdx: teamIdx,
      memberIdx: member.memberIdx,
    };
    allAcceptTrigger(acceptAllDto);
  };

  const acceptAllModalData = useModal(
    "모임 가입 신청을 전체 수락할까요?",
    () => {
      acceptAll();
      acceptedAllModalData.triggerModal();
    },
    true
  );

  const acceptedAllModalData = useModal("모임 가입 신청을 전체 수락했습니다.");

  // 모임원 거절하기
  const { trigger: rejectTrigger, isLoading: rejectIsLoading } =
    useFetchTrigger<AcceptTeamMemberReqDto, null>(
      RejectTeamMemberPutURL(),
      "PUT"
    );

  const reject = (teamMemberIdx: number | undefined) => {
    if (!teamMemberIdx) return;
    const rejectReqDto: AcceptTeamMemberReqDto = {
      teamIdx: teamIdx,
      teamMemberIdx: teamMemberIdx,
      memberIdx: member.memberIdx,
    };
    rejectTrigger(rejectReqDto);
  };

  const rejectModalData = useModal(
    "모임 가입 신청을 거절할까요?",
    () => {
      reject(currentTeamMemberIdx);
      rejectedModalData.triggerModal();
    },
    true
  );

  const rejectedModalData = useModal("모임 가입 신청을 거절했습니다.");

  // 모임원 수락하기
  const { trigger: acceptTrigger, isLoading: acceptIsLoading } =
    useFetchTrigger<AcceptTeamMemberReqDto, null>(
      AcceptTeamMemberPutURL(),
      "PUT"
    );

  const accept = (teamMemberIdx: number | undefined) => {
    if (!teamMemberIdx) return;
    const acceptDto: AcceptTeamMemberReqDto = {
      teamIdx: teamIdx,
      teamMemberIdx: teamMemberIdx,
      memberIdx: member.memberIdx,
    };
    acceptTrigger(acceptDto);
  };

  const acceptModalData = useModal(
    "모임 가입 신청을 수락할까요?",
    () => {
      accept(currentTeamMemberIdx);
      acceptedModalData.triggerModal();
    },
    true
  );

  const acceptedModalData = useModal("모임 가입 신청을 수락했습니다.");

  // 모임원 전체 내보내기
  const { trigger: exportAllTrigger, isLoading: exportAllIsLoading } =
    useFetchTrigger<RejectTeamMembersReqDto, null>(
      ExportTeamMembersPutURL(),
      "PUT"
    );

  const exportAll = () => {
    const exportAllDto: RejectTeamMembersReqDto = {
      teamIdx: teamIdx,
      memberIdx: member.memberIdx,
    };
    exportAllTrigger(exportAllDto);
  };

  const exportAllModalData = useModal(
    "모임원 전체를 내보낼까요?",
    () => {
      exportAll();
      exportedAllModalData.triggerModal();
    },
    true
  );

  const exportedAllModalData = useModal("모임원 전체를 내보냈습니다.");

  // 모임원 내보내기
  const { trigger: exportTrigger, isLoading: exportIsLoading } =
    useFetchTrigger<AcceptTeamMemberReqDto, null>(
      ExportTeamMemberPutURL(),
      "PUT"
    );

  const exportMember = (teamMemberIdx: number | undefined) => {
    if (!teamMemberIdx) return;
    const exportDto: AcceptTeamMemberReqDto = {
      teamIdx: teamIdx,
      teamMemberIdx: teamMemberIdx,
      memberIdx: member.memberIdx,
    };
    exportTrigger(exportDto);
  };

  const exportMemberModalData = useModal(
    "모임원을 내보낼까요?",
    () => {
      exportMember(currentTeamMemberIdx);
      exportedMemberModalData.triggerModal();
    },
    true
  );

  const exportedMemberModalData = useModal("모임원을 내보냈습니다.");

  // 모임나가기
  const { trigger: exportTeamTrigger } = useFetchTrigger<
    ExportTeamReqDto,
    null
  >(ExportTeamPutURL(), "PUT");

  const exportTeam = () => {
    const exportTeamDto: ExportTeamReqDto = {
      teamIdx: teamIdx,
      memberIdx: member.memberIdx,
    };
    exportTeamTrigger(exportTeamDto);
    setTimeout(() => {
      home();
    }, 1500);
  };

  const exportTeamModalData = useModal(
    "모임을 나가시겠습니까?",
    () => {
      exportTeam();
      exportedTeamModalData.triggerModal();
    },
    true
  );

  const exportedTeamModalData = useModal("모임을 나갔습니다.");

  useEffect(() => {
    console.log("teamIdx: " + teamIdx);
    if (!teamMemersData) return;
  }, [teamMemersData]);

  // 새로고침
  useEffect(() => {
    if (
      !allAcceptIsLoading &&
      !rejectIsLoading &&
      !acceptIsLoading &&
      !exportAllIsLoading &&
      !exportIsLoading
    ) {
      refetch();
    }
  }, [
    allAcceptIsLoading,
    rejectIsLoading,
    acceptIsLoading,
    exportAllIsLoading,
    exportIsLoading,
  ]);

  return (
    <>
      <VStack className="min-h-full pb-8 bg-gray-50">
        <NavigationBar title={"모임원 관리"} />
        <HStack className="items-center justify-between py-4 mx-6 border-b border-gray-200">
          <span>{teamMemersData?.length}명 참여 중</span>
          <Button
            className="!bg-gray-200 !text-black"
            onClick={openInvitationModal}
          >
            초대하기
          </Button>
        </HStack>
        <VStack className="min-w-full gap-8 px-6 overflow-y-scroll">
          {/* 총무 */}
          <VStack className="w-full gap-4">
            <span className="text-sm"> 총무 </span>
            {teamMemersData?.map(
              (member) =>
                member.teamMemberState === "총무" && (
                  <HStack
                    key={member.teamMemberIdx}
                    className="items-center gap-4"
                  >
                    <Avatar crown />
                    <span>{member.memberName}</span>
                    <Spacer />
                    <span className="text-sm text-gray-500 underline">
                      총무변경
                    </span>
                  </HStack>
                )
            )}
          </VStack>
          {/* 대기 중 */}
          <VStack className="w-full gap-4">
            <HStack className="justify-between">
              <span className="text-sm"> 대기 중 </span>
              <button
                className="text-sm text-gray-500 underline"
                onClick={() => {
                  acceptAllModalData.triggerModal();
                }}
              >
                전체 수락하기
              </button>
            </HStack>
            {teamMemersData?.map(
              (member) =>
                member.teamMemberState === "수락대기" && (
                  <HStack
                    key={member.teamMemberIdx}
                    className="items-center gap-4"
                  >
                    <Avatar
                      backgroundColor="bg-cyan-200"
                      skinColor="white"
                      eye="smile"
                    />
                    <span>{member.memberName}</span>
                    <Spacer />

                    <button
                      className="text-sm text-gray-500 underline"
                      onClick={() => {
                        setCurrentTeamMemberIdx(member.teamMemberIdx);
                        rejectModalData.triggerModal();
                      }}
                    >
                      거절
                    </button>
                    <button
                      className="text-sm text-gray-500 underline"
                      onClick={() => {
                        setCurrentTeamMemberIdx(member.teamMemberIdx);
                        acceptModalData.triggerModal();
                      }}
                    >
                      수락
                    </button>
                  </HStack>
                )
            )}
          </VStack>
          {/* 모임원 */}
          <VStack className="w-full gap-4">
            <HStack className="justify-between">
              <span className="text-sm"> 모임원 </span>
              <button
                className="text-sm text-gray-500 underline"
                onClick={() => {
                  exportAllModalData.triggerModal();
                }}
              >
                전체 내보내기
              </button>
            </HStack>
            {teamMemersData?.map(
              (member) =>
                member.teamMemberState === "모임원" && (
                  <HStack
                    key={member.teamMemberIdx}
                    className="items-center gap-4"
                  >
                    <Avatar
                      crown
                      backgroundColor="bg-purple-400"
                      mouth="upset"
                      eye="upset"
                    />
                    <span>{member.memberName}</span>
                    <Spacer />
                    <button
                      className="text-sm text-gray-500 underline"
                      onClick={() => {
                        setCurrentTeamMemberIdx(member.teamMemberIdx);
                        exportMemberModalData.triggerModal();
                      }}
                    >
                      내보내기
                    </button>
                  </HStack>
                )
            )}
          </VStack>
        </VStack>
        <Spacer />
        <button
          className="py-4 mx-6 border-gray-200 border-y"
          onClick={exportTeamModalData.triggerModal}
        >
          <HStack>
            <span> 모임나가기</span>
            <Spacer />
            <Arrow direction="right" />
          </HStack>
        </button>
      </VStack>
      <Loading show={isTeamMembersLoading} label="모임원을 불러오는 중 ..." />
      {/* 모임 가입 신청을 전체 수락할까요? */}
      {acceptAllModalData.modal}
      {/* 모임 가입 신청을 전체 수락했습니다. */}
      {acceptedAllModalData.modal}
      {/* 모임 가입 신청을 거절할까요? */}
      {rejectModalData.modal}
      {/* 모임 가입 신청을 거절했습니다. */}
      {rejectedModalData.modal}
      {/* 모임 가입 신청을 수락할까요? */}
      {acceptModalData.modal}
      {/* 모임 가입 신청을 수락했습니다. */}
      {acceptedModalData.modal}
      {/* 모임원 전체를 내보낼까요? */}
      {exportAllModalData.modal}
      {/* 모임원 전체를 내보냈습니다. */}
      {exportedAllModalData.modal}
      {/* 모임원을 내보낼까요? */}
      {exportMemberModalData.modal}
      {/* 모임원을 내보냈습니다. */}
      {exportedMemberModalData.modal}
      {/* 모임을 나가시겠습니까? */}
      {exportTeamModalData.modal}
      {/* 모임을 나갔습니다. */}
      {exportedTeamModalData.modal}
      {/* 초대링크 */}
      <Modal
        xButton
        backDrop
        show={showInvitationModal}
        onClose={closeInvitationModal}
      >
        <VStack className="items-center w-full">
          <span>초대하기</span>
          <HStack className="gap-4 m-6" onClick={fetchGenerateLink}>
            <img
              className="h-20"
              src={`/images/moim/invite.png`}
              alt="invite"
            />
          </HStack>
          <Button className="w-full" onClick={closeInvitationModal}>
            확인
          </Button>
        </VStack>
      </Modal>
    </>
  );
}

export default MoimMembersMainPage;
