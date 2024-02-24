import React, { useContext, useEffect, useState } from "react"
import GameBackground from "../../GameBackground"
import { QuizRoomInfoResponse } from "@/types/takeQuiz"
import PlayingResponse, {
    PlayingState,
} from "@/types/takeQuiz/playing/PlayingResponse"
import { CompatClient } from "@stomp/stompjs"
import { QuizResponse } from "@/types/quiz"
import { QuizContext } from "@/pages/play/[quizCode]"
import PlayingQuestionResponse from "@/types/takeQuiz/playing/PlayingQuestionResponse"
import { Container, Group, Paper, Stack } from "@mantine/core"
import { QuestionType } from "@/types/question/QuestionType"
import { AnimatePresence, motion } from "framer-motion"
import { IconClock } from "@tabler/icons-react"
import MultipleChoice from "./MultipleChoice"

const mockPlayingData: PlayingResponse<PlayingQuestionResponse> = {
    state: PlayingState.ANSWERING,
    data: {
        questionId: 1,
        content: "What is the capital of Indonesia?",
        answersMetadata: `[
            "Jakarta",
            "Bandung",
            "Surabaya",
            "Bali"
        ]`,
        correctAnswersMetadata: `[
            "Jakarta"
        ]`,
        duration: 10,
        point: 100,
        type: QuestionType.MULTIPLE_CHOICE,
    },
}

const Answering = () => {
    const {
        message: roomInfo,
        connected,
        quiz,
    }: {
        message: QuizRoomInfoResponse<PlayingResponse<any>> | null
        client: CompatClient
        connected: boolean
        quiz: QuizResponse
    } = useContext(QuizContext)!

    const {
        data: playingData,
    }: { data: PlayingResponse<PlayingQuestionResponse> | null } = roomInfo || {
        data: null,
    }

    const duration = playingData?.data.duration || 10
    const [timeLeft, setTimeLeft] = useState(duration)

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prevTimeLeft) => {
                if (prevTimeLeft <= 0) {
                    clearInterval(interval)
                    return 0
                }
                return prevTimeLeft - 1
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <GameBackground className="flex flex-col items-center p-16 gap-16">
            <Group justify="end" w="100%">
                <Paper p={16}>
                    <Group gap={8}>
                        <IconClock />
                        <p className="font-semibold text-lg">{timeLeft}</p>
                    </Group>
                </Paper>
            </Group>
            <Container size="xl" className="w-full">
                <Stack>
                    <motion.div
                        key={playingData?.data.questionId}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            duration: 0.25,
                        }}
                        exit={{ scale: 0 }}
                    >
                        <Paper
                            className="p-16 w-full text-white border-2 border-white"
                            shadow="md"
                            bg="indigo"
                        >
                            <div
                                className="flex items-center justify-center h-60"
                                dangerouslySetInnerHTML={{
                                    __html: playingData?.data.content || "",
                                }}
                            />
                        </Paper>
                    </motion.div>
                    {playingData?.data.type === QuestionType.MULTIPLE_CHOICE ? (
                        <MultipleChoice timeLeft={timeLeft} />
                    ) : (
                        <></>
                    )}
                </Stack>
            </Container>
        </GameBackground>
    )
}

export default Answering
