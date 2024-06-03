import { Dayjs } from 'dayjs';

export interface ReportRequest {
  _id: string;
  fileName: string;
  reportType: string;
  user: string;
  year?: string;
  reportStatus: string;
  errorDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewReportRequestPayload {
  reportType: string;
  startDate?: Dayjs;
  startTime?: string;
  endDate?: Dayjs;
  endTime?: string;
}

export interface NewReportRequestModal {
  open: boolean;
}
