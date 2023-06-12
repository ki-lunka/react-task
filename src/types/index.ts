export interface AirtableResponse<T> {
  records: AirTableRecord<T>[];
  offset?: string;
}

export interface AirTableRecord<T> {
  id: string;
  createdTime: Date;
  fields: T;
}

export interface UserFields {
  Id: number;
  Name: string;
  avatar?: string;
  occupation: string;
}

export interface TrafficLog {
  time: Date;
  type: LogType;
  user_id: number;
  revenue: number;
}

export interface IUser {
  Id: number;
  Name: string;
  avatar?: string;
  occupation: string;
  totalImpressions: number;
  totalConversions: number;
  totalRevenue: number;
  conversions: TrafficLog[];
}

export enum LogType {
  IMPRESSION = 'impression',
  CONVERSION = 'conversion',
}

export enum SortingOptions {
  NAME = 'Name',
  TOTAL_IMPRESSIONS = 'totalImpressions',
  TOTAL_CONVERSIONS = 'totalConversions',
  TOTAL_REVENUE = 'totalRevenue',
}
