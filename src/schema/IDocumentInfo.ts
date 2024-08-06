export interface IDocumentInfo {
  link: string;
  documentId: string;
  document: Array<any>;
  documentExisting: Array<any>;
  deletedDocument: Array<any>;

  isDocumentCannotBeChanged?: boolean;
}
