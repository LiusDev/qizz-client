import { CreateQuestionLayout } from "@/components/layouts";
import {
  FillInTheBlank,
  MultipleChoice,
} from "@/components/questions/createQuestions";
import { Question } from "@/types/question";
import QuestionRequest from "@/types/question/QuestionRequest";
import { QuestionType } from "@/types/question/QuestionType";
import { instance } from "@/utils";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import React, { createContext, useContext, useState } from "react";

const question: Question = {
  questionId: 1,
  content: "What is the capital of France?",
  point: 1,
  duration: 15,
  type: QuestionType.MULTIPLE_CHOICE,
  answersMetadata: ["Paris", "London", "Berlin", "Madrid"],
  correctAnswersMetadata: ["Paris"],
  explainAnswer: "Paris is the capital of France",
  questionIndex: 1,
  disabled: false,
  quizBankId: 1,
};

const QuestionTypes: Record<QuestionType, React.ReactNode> = {
  [QuestionType.MULTIPLE_CHOICE]: <MultipleChoice question={question} />,
  [QuestionType.FILL_IN_THE_BLANK]: <FillInTheBlank question={question} />,
};

// export interface hello {
//   dataQuestion: {};
//   setDataQuestion: React.Dispatch<React.SetStateAction<{}>>;
//   handleQuestion: () => Promise<void>;
// }
// export type QuestionContextType = {
//   dataQuestion: {};
//   setDataQuestion: React.Dispatch<React.SetStateAction<{}>>;
//   handleQuestion: () => Promise<void>;
// };
interface MyContextValue {
  dataQuestion: QuestionRequest;
  updateDataQuestion: (newValue: QuestionRequest) => void;
}
export const DataContext = createContext<any>({} as any);
export const useMyContext = () => useContext(DataContext);
const Create = () => {
  const router = useRouter();
  const { type } = router.query;
  const bankId = router.query.bank;
  const questionType: QuestionType =
    QuestionType[type as keyof typeof QuestionType];

  // const router = useRouter();
  // const { bankId } = router.query;
  const [dataQuestion, setDataQuestion] = useState({});
  const updateDataQuestion = (newValue: {}) => {
    setDataQuestion(newValue);
  };
  // const handleQuestion = async () => {

  // };
  // const value = {
  //   dataQuestion,
  //   setDataQuestion,
  //   handleQuestion,
  // };
  return (
    <DataContext.Provider value={{ dataQuestion, updateDataQuestion }}>
      <CreateQuestionLayout>{QuestionTypes[questionType]}</CreateQuestionLayout>
    </DataContext.Provider>
  );
};

export default Create;
// export { DataContext };
