import React from 'react';

export type ResponseGeneralType = {
  ok: boolean;
};

export type ResponseMsgType = {
  msg: string;
};

export type Theme = {
  themeName: string;
};

export type MessageResponseType = {
  message: string;
};

export interface NewBadRegister {
  name: string;
  error: string;
}

export interface UploadExcelResponse {
  message: string;
  newBadRegisters?: NewBadRegister[];
  fileName?: string;
  file: {
    data: Uint8Array;
  };
}

export type MenuItem = {
  label: string | React.ReactNode;
  key: string;
  icon: React.ReactNode;
};

export type SiderItemsRelationType = {
  [key: string]: MenuItem;
};

export interface DownloadFileProps {
  path?: string;
  fileName?: string;
  url?: string;
}

export interface ErrorFile {
  file: Uint8Array;
}
