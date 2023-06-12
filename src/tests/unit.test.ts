import { numberToLocaleString, sortArrayBy, populateUserLogs } from '../utils';
import { UserFields, TrafficLog, LogType } from '../types';

const dataForSorting = [
  {
    name: 'John',
    age: 23,
  },
  {
    name: 'Adam',
    age: 19,
  },
  {
    name: 'Ben',
    age: 27,
  },
];

const usersFields: UserFields[] = [
  {
    Id: 75,
    Name: 'Charlie S. Gerardi',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg',
    occupation: 'Residential electrician',
  },
  {
    Id: 23,
    Name: 'Riley D. Norris',
    occupation: 'Transmission engineer',
  },
  {
    Id: 45,
    Name: 'Aaron E. Poynton',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/c_southam/128.jpg',
    occupation: 'Public address system announcer',
  },
  {
    Id: 60,
    Name: 'Henry A. Gilchrist',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/rssems/128.jpg',
    occupation: 'Professor',
  },
  {
    Id: 27,
    Name: 'Cody I. Tunbridge',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg',
    occupation: 'Product designer',
  },
];

const logs: TrafficLog[] = [
  {
    time: new Date('2023-06-12'),
    type: LogType.IMPRESSION,
    user_id: 75,
    revenue: 0,
  },
  {
    time: new Date('2023-06-12'),
    type: LogType.CONVERSION,
    user_id: 75,
    revenue: 12.76,
  },
  {
    time: new Date('2023-06-12'),
    type: LogType.CONVERSION,
    user_id: 75,
    revenue: 32,
  },
  {
    time: new Date('2023-06-12'),
    type: LogType.CONVERSION,
    user_id: 45,
    revenue: 15,
  },
  {
    time: new Date('2023-06-12'),
    type: LogType.CONVERSION,
    user_id: 45,
    revenue: 23.1,
  },
];

describe('Test numberToLocaleString function', () => {
  test('should return formatted string with default en-US formatting', () => {
    const result = numberToLocaleString(123000.57);
    const expected = '123,000.57';
    expect(result).toBe(expected);
  });

  test('should return formatted string with provided formatting', () => {
    const result = numberToLocaleString(123456.789, 'de-DE');
    const expected = '123.456,789';
    expect(result).toBe(expected);
  });
});

describe('Test sortArrayBy function', () => {
  test('should sort by provided key (name)', () => {
    const result = sortArrayBy(dataForSorting, 'name');
    expect(result[0].name).toBe('Adam');
    expect(result[2].name).toBe('John');
  });

  test('should sort by provided key (age)', () => {
    const result = sortArrayBy(dataForSorting, 'age');
    expect(result[0].age).toBe(19);
    expect(result[2].age).toBe(27);
  });

  test('should return provided data if no options specifyed', () => {
    const result = sortArrayBy(dataForSorting);
    expect(result).toBe(dataForSorting);
  });
});

describe('Test populateUserLogs function', () => {
  test('should return valid user data', () => {
    const result = populateUserLogs(usersFields, logs);
    const expected = [
      {
        Id: 75,
        Name: 'Charlie S. Gerardi',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg',
        occupation: 'Residential electrician',
        conversions: [
          {
            time: new Date('2023-06-12'),
            type: LogType.CONVERSION,
            user_id: 75,
            revenue: 12.76,
          },
          {
            time: new Date('2023-06-12'),
            type: LogType.CONVERSION,
            user_id: 75,
            revenue: 32,
          },
        ],
        totalConversions: 2,
        totalImpressions: 1,
        totalRevenue: 44.76,
      },
      {
        Id: 23,
        Name: 'Riley D. Norris',
        conversions: [],
        occupation: 'Transmission engineer',
        totalConversions: 0,
        totalImpressions: 0,
        totalRevenue: 0,
      },
      {
        Id: 45,
        Name: 'Aaron E. Poynton',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/c_southam/128.jpg',
        conversions: [
          {
            revenue: 15,
            time: new Date('2023-06-12'),
            type: 'conversion',
            user_id: 45,
          },
          {
            revenue: 23.1,
            time: new Date('2023-06-12'),
            type: 'conversion',
            user_id: 45,
          },
        ],
        occupation: 'Public address system announcer',
        totalConversions: 2,
        totalImpressions: 0,
        totalRevenue: 38.1,
      },
      {
        Id: 60,
        Name: 'Henry A. Gilchrist',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/rssems/128.jpg',
        conversions: [],
        occupation: 'Professor',
        totalConversions: 0,
        totalImpressions: 0,
        totalRevenue: 0,
      },
      {
        Id: 27,
        Name: 'Cody I. Tunbridge',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg',
        conversions: [],
        occupation: 'Product designer',
        totalConversions: 0,
        totalImpressions: 0,
        totalRevenue: 0,
      },
    ];
    expect(result).toStrictEqual(expected);
  });
});
