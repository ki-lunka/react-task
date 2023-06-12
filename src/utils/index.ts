import { IUser, TrafficLog, UserFields, LogType } from '../types';
import _sortBy from 'lodash.sortby';

const getLogsByType = (logs: TrafficLog[], type: LogType) => {
  return logs.filter((log) => log.type === type);
};

const calculateLogsSum = (logs: TrafficLog[]) => {
  return logs.reduce((acc, log) => acc + log.revenue, 0);
};

export const populateUserLogs = (users: UserFields[], logs: TrafficLog[]): IUser[] => {
  return users.map((user) => {
    const accordingLogs = (logs as unknown as TrafficLog[]).filter(
      (log) => log.user_id === user.Id,
    );
    const impressions = getLogsByType(accordingLogs, LogType.IMPRESSION);
    const conversions = getLogsByType(accordingLogs, LogType.CONVERSION);
    const totalImpressions = calculateLogsSum(impressions);
    const totalConversions = calculateLogsSum(conversions);

    return {
      ...user,
      totalImpressions: impressions.length,
      totalConversions: conversions.length,
      totalRevenue: totalImpressions + totalConversions,
      conversions,
    };
  });
};

export const numberToLocaleString = (num: number, format = 'en-US') => {
  return num.toLocaleString(format);
};

export const sortArrayBy = <T>(data: T[], ...keys: string[]) => {
  if (!keys.length) return data;
  return _sortBy(data, ...keys);
};
