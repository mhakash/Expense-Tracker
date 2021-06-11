import {useAuth} from './useAuth';
import useSWR from 'swr';
import {getUserData} from '../lib/storage';

export const useTransactions = () => {
  const auth = useAuth();

  const {data, error} = useSWR(
    () => '/transactions' + auth.user?.uid,
    () => getUserData(auth.user?.uid ?? ''),
  );

  return {
    transactions: data?.transactions,
    error,
  };
};
