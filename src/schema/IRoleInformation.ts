export interface IRoleInformation {
  sysName: string;
  sysRole: string;
  acl: Array<IAcl>;
}

export interface IAcl {
  componentId?: any;
  urlPath?: any;
  hidden?: any;
  readonly?: any;
  disabled?: any;
  page?: any;
}
