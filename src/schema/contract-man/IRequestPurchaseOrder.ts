export interface IRequestPurchaseOrder {
  rpono?: string;
  contractNo?: string;
  rpoSubject?: string;
  additionalInfo?: string;
  rostart?: Date;
  roend?: Date;
  totalRpo?: number;
  lastModifiedDate?: Date;
  modifiedBy?: string;
}
