import { Dayjs } from 'dayjs';

export type Numerals = {
  _id: string;
  subsystem: string;
  receivedAnswers: string;
  estimatedAnswers?: string;
  advance?: string;
};

export interface NewNumeralsPayload {
  startDate?: Dayjs;
  startTime?: string;
  endDate?: Dayjs;
  endTime?: string;
}

export interface UpdateNumeralsPayload {
  id: string;
  payload: Numerals;
}
