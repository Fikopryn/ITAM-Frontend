export interface IAxiosMiddlewareParams {
  needConfirmation?: boolean;
  confirmation?: IConfirmation;
  permissions?: Array<string>;
}

export interface IConfirmation {
  title?: string;
  desc?: string;
  icon?: string;
}
