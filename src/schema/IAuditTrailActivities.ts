export interface IAuditTrailActivities {
  activityNumber?: number;
  modulName?: string;
  modulId?: string;
  userId?: string;
  userName?: string;
  action?: string;
  timestamp?: string;
  remarks?: string;
  details?: Array<IAuditTrailActivityDetails>;
}

export interface IAuditTrailActivityDetails {
  revision?: string;
  column?: string;
  before?: string;
  after?: string;
}
