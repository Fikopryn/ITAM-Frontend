export interface IContractRegistration {
  companyId?: number;
  contractOwner?: string;
  contractNomor?: number;
  subject?: string;
  supplierId?: string;
  startContract?: Date;
  endContract?: Date;
  contractValue?: number;
  contractDocument?: string;
  lastModifiedDate?: Date;
  modifiedBy?: string;
  associationStatus?: string;
}
