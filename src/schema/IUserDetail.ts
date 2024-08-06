// import type { IEmpfamilies } from "./IEmpfamilies";
// import type { IOrgassignments } from "./IOrgassignments";
export interface IUserDetail {
  userid?: string;
  uidtype?: number;
  empnum?: string;
  email?: string;
  authserver1?: string;
  authserver2?: string;
  idtype?: string;
  idnum?: string;
  expireddate?: string;
  activedate?: string;
  contractnum?: string;
  company?: string;
  hiredby?: string;
  sex?: string;
  birthdate?: string;
  birthplace?: string;
  address1?: string;
  address2?: string;
  phoneoffice1?: string;
  phoneoffice2?: string;
  phonemobile1?: string;
  phonemobile2?: string;
  poh?: string;
  poo?: string;
  city?: string;
  religion?: string;
  updateby?: string;
  updatedate?: string;
  userprl?: string;
  username?: string;
  isactive?: boolean;
  status?: string;
  residencestatus?: string;
  notifcode?: string;
  emgcontactname?: string;
  emgcontactphone?: string;
  attribute4?: string;
  attribute5?: string;
  attribute6?: string;
  attribute7?: string;
  attribute8?: string;
  nationality?: number;
  nationalitytext?: string;
  marital?: string;
  workingstatus?: string;
  persno?: string;
  idcardnumber?: string;
  // empfamilies?: IEmpfamilies[];
  orgassignmentdoas?: any[];
  // orgassignments?: IOrgassignments[];
  roleadditionals?: any[];
}
