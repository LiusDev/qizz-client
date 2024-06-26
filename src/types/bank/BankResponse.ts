import { Category, SubCategory } from "../category";
import ManageBank from "../manageBank/ManageBank";
import { UserResponse } from "../user";

export default interface BankResponse {
  quizBankId: number;
  name: string;
  description?: string | null;
  featuresImage?: string | null;
  createdAt: string;
  modifiedAt: string;
  quizPublicity: boolean;
  publicEditable: boolean;
  subCategories?: SubCategory[];
  draft?: boolean;
  disabled?: boolean;
  totalQuestions?: number;
  createdBy: UserResponse;
  modifiedBy?: UserResponse;
  manageBanks?: ManageBank[];
  totalUpVotes?: number;
}
