export interface Options {
  value: string;
  label: string;
  optionImage?: string;
  school_code?: string;
  subsystem?: string;
}

export interface subQuestion {
  id: number;
  name: string;
  question: string;
  option?: Options[];
  type: string;
  min?: number;
  max?: number;
  step?: string;
  size?: number;
  required?: true;
}

export interface Question extends ILabel {
  complementaryList?: string[];
  name: string;
  required: boolean;
  option: Options[];
  answer: string;
  style?: unknown;
  type?: string;
  indication?: string;
}

export interface ILabel {
  id: number;
  complementaryText: complementaryText[];
  complementary?: string;
  complementaryTop?: string;
  image?: string;
  imageComplementary?: string;
  question: string;
  complementaryList?: string[];
}

export interface IForm {
  title?: string;
  subtitle?: string;
  timeMins?: number;
  id: number;
  name: string;
  value: string;
  questions: Question[];
}

export interface IQuestionnaire {
  sections: IForm[];
  title: string;
  subtitle: string;
  year: string;
  timeMins: number;
}

export interface complementaryText {
  instructions: string;
  title: string;
  author: string;
  references: string[];
  paragraphs: paragraphs[];
  glossary?: glossary[];
  notes?: string;
}

export interface paragraphs {
  id: number;
  title?: string;
  text: string;
  image?: string;
  pointList?: string[];
}

export interface glossary {
  title: string;
  words: words[];
}

export interface words {
  word: string;
  description: string;
}

export interface Rule {
  pattern?: RegExp;
  min?: number;
  differentFrom?: string;
  message: string;
  equalTo?: string;
}

export interface IGetQuestionnaire {
  year: string;
  state: string;
}
