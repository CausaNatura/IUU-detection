import { Student } from './student';
import { User } from './user';

export interface IQuestion {
  [key: string]: string;
}

export interface IAnswerQuestion {
  isCorrect: boolean;
  name: string;
  answer: string;
}

export interface IAnswer {
  questions: IAnswerQuestion[];
  student: Student | User;
  studentId: string;
  modality: string;
  tookTime: number;
  answeredAt: Date;
}

export interface FoundStudentAnswers {
  _id: string;
  questions: IAnswerQuestion[];
  student: Student;
  modality: string;
}
