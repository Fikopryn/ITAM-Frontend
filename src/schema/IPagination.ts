export interface IPagination {
  page?: number;
  length?: number;
  parameters: Array<IParameters>;
  order: IOrder;
  pageInfo?: IPageInfo;
}

export interface IParameters {
  name?: string;
  searchValue?: any;
}

interface IPageInfo {
  currentPage?: number;
  totalPages?: number;
  pageSize?: number;
  hasPrevious?: boolean;
  hasNext?: boolean;
  recordsFiltered?: number;
  recordsTotal?: number;
  data?: Array<any>;
}

interface IOrder {
  parameterName?: string;
  dir?: string;
}
