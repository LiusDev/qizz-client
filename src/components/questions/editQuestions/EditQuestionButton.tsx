import { QuestionType } from "@/types/question/QuestionType"
import { Button, rem } from "@mantine/core"
import { IconPencil, IconRectangle, IconSquareCheck } from "@tabler/icons-react"
import Link from "next/link"
import React from "react"

const questionTypes = [
    {
        label: "Multiple Choice",
        icon: <IconSquareCheck style={{ width: rem(14), height: rem(14) }} />,
        type: QuestionType.MULTIPLE_CHOICE,
    },
    {
        label: "Fill in the blank",
        icon: <IconRectangle style={{ width: rem(14), height: rem(14) }} />,
        type: QuestionType.FILL_IN_THE_BLANK,
    },
]

const EditQuestionButton = ({
    quizBankId,
    questionId,
    type,
}: {
    questionId: number
    quizBankId: number
    type: string
}) => {
    return (
        <Button
            variant="default"
            p={6}
            mx={4}
            component={Link}
            href={`/bank/${quizBankId}/edit/edit-question/${questionId}?type=${type}`}
        >
            <IconPencil size={16}></IconPencil>Edit
        </Button>
    )
}

export default EditQuestionButton
