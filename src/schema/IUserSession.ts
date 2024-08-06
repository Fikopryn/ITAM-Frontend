import type { IRoleInformation } from "@/schema/IRoleInformation";
export interface IUserSession {
  userInformation?: IUserInformation;
  doaInformation?: IDoaInformation;
  roleInformation?: IRole;
}

export interface IUserInformation {
  userId?: string;
  userName?: string;
  EMPNUM?: string;
  EMAIL?: string;
  POSID?: string;
  posName?: string;
  UNITID?: string;
  UNITNAME?: string;
  COYCODE?: string;
  COYNAME?: string;
  AREAID?: string;
  AREANAME?: string;
  SUBAREAID?: string;
  SUBAREANAME?: string;
  SECTION?: string;
  CCID?: string;
  CCNAME?: string;
  BACKTOBACK?: string;
  POSCATEGORY?: string;
  AUTHSERVER1?: string;
  AUTHSERVER2?: string;
  KBO?: string;
  UIDTYPE?: string;
  RESIDENCESTATUS?: string;
  PARENTUSERID?: string;
  LOCGROUP?: string;
  LOCCATEGORY?: string;
  SUBFUNGSI?: string;
  FUNGSI?: string;
}
export interface IDoaInformation {}

export interface IRole {
  role: Array<IRoleInformation>;
}
