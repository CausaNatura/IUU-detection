import { DownloadFileProps } from 'types/global';

export const downloadFile = async ({
  path,
  fileName,
  url,
}: DownloadFileProps) => {
  const link = document.createElement('a');
  link.href = url ? url : `/${path}`;
  link.setAttribute('download', fileName ?? '');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
