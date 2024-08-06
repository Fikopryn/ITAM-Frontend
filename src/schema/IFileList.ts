export type IFileList = IFile[];

export interface IFile {
  fileNumber?: string;
  modulId?: string;
  modulName?: string;
  fileCategory?: string;
  fileNameExtention?: string;
  timestamp?: string;
}
