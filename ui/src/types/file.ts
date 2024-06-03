export interface IFile {
  uid: string;
  name: string;
  _id: string;
  url: string;
  directory: string;
  extension: string;
  mime: string;
}

export interface IPresignedRequest {
  name: string;
  extension: string;
  mime: string;
  key: string;
}

export interface IPresignedResponse {
  file: IFile;
  key: string;
  preSignedUrl: string;
  presignedRaw: string;
}
