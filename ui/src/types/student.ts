export type Student = {
  _id: string;
  name: string;
  cct: string;
  school: string;
  subsystem: string;
  email?: string;
  curp: string;
  year: string;
  schedule: string;
  token?: string;
  userType?: string;
};

export interface UpdateStudentPayload {
  id: string;
  payload: Student;
}

export interface NewStudent extends Student {
  first_lastname: string;
  second_lastname: string;
}

export interface NewForeignerStudent {
  name: string;
  year: string;
  schedule: string;
  subsystem: string;
}

export interface NewForeignerStudentForm extends NewForeignerStudent {
  firstLastName: string;
  secondLastName?: string;
}

export interface NewForeignerStudentResponse {
  message: string;
  student: Student;
}
