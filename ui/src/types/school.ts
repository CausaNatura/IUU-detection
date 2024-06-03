export type School = {
  _id: string;
  state: string;
  municipality: string;
  cct: string;
  name: string;
  subsystem: string;
};

export interface UpdateSchoolPayload {
  id: string;
  payload: School;
}
