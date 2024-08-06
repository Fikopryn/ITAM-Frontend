export interface IDeliveryOrder {
  company?: string;
  contractNomor?: number;
  deliveryOrderNomor?: number;
  deliveryOrderDate?: Date;
  receivedDate?: Date;
  supplierName?: string;
  deliveryOrderDocument?: string;
  lastModifiedDate?: Date;
  modifiedBy?: string;
  associationStatus?: string;
}
