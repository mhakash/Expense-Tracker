import 'react-native-get-random-values';
import {nanoid} from 'nanoid';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const addTransaction = async (
  userId: string,
  data: {date: Date; note?: string; value: number},
) => {
  try {
    const id = nanoid();
    const newTransaction = {
      transactions: {
        [id]: {
          date: data.date.toISOString(),
          note: data.note ?? '',
          value: data.value,
        },
      },
    };

    await AsyncStorage.mergeItem(userId, JSON.stringify(newTransaction));

    return {newTransaction, id};
  } catch (err) {
    throw new Error('Opps! Error occured');
  }
};

export const syncUser = async (userId: string) => {
  try {
    const val = await AsyncStorage.getItem(userId);

    if (!val) {
      await AsyncStorage.setItem(userId, JSON.stringify({id: userId}));
    }
  } catch (err) {
    throw new Error('cannot persist');
  }
};

export const getUserData = async (userId: string) => {
  try {
    const val = await AsyncStorage.getItem(userId);

    if (val) {
      const obj: {
        id: string;
        transactions?: {
          [key: string]: {
            date: string;
            note: string;
            value: number;
          };
        };
      } = JSON.parse(val);

      return obj;
    } else {
      throw new Error('no data');
    }
  } catch (err) {
    throw new Error('cannot get');
  }
};
