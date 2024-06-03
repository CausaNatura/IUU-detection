export interface Questions {
  question: string;
  answer: string;
}

export type FAQ = {
  _id: string;
  topic: string;
  questions: Questions[];
};

export type NewFAQ = {
  topic: string;
  questions: Questions[];
};

export type UpdateFAQPayload = {
  id: string;
  payload: FAQ;
};
