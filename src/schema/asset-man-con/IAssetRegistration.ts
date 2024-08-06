export interface IAssetRegistration {
  company?: string;
  deliveryOrder?: string;
  deliveryOrderDate?: Date;
  receivedDate?: Date;
  supplierName?: string;
  contract?: number;
  purchaseOrder?: number;
  invoice?: string;
  purchaseType?: string;
  acquistionPrice?: string;
  leasePrice?: string;
  lastModifiedDate?: Date;
  modifiedBy?: string;
  productName?: string;
  qty?: number;
  unit?: string;
  additionalInfo?: string;
  document?: string;
  assetSite?: string;
  building?: string;
  floorRoom?: string;
  assetStatus?: string;
  assetStatusFinance?: string;
  assetKnowledgement?: string;
  associationStatus?: string;
}
