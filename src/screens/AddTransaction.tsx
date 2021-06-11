import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Background from '../components/Background';
import {Switch, Button} from 'react-native-elements';
import {TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {MonthName} from '../lib/time';
import Snackbar from 'react-native-snackbar';
import {addTransaction} from '../lib/storage';
import {useAuth} from '../hooks/useAuth';
import {mutate} from 'swr';
import _ from 'lodash';

function isNumeric(value: string) {
  return /^\d+$/.test(value);
}

const AddTransaction = () => {
  const auth = useAuth();
  const [sw, setSw] = useState(false);
  const [value, setValue] = useState('');
  const [date, setDate] = useState(new Date());
  const [note, setNote] = useState('');

  const changeDate = (delta: number) => {
    const newDate = new Date(date.getTime() + delta * 1000 * 3600 * 24);
    setDate(newDate);
  };

  const handleClear = () => {
    setDate(new Date());
    setValue('');
    setNote('');
  };

  const handleAdd = useCallback(() => {
    if (!isNumeric(value)) {
      Snackbar.show({text: 'not a valid amount'});
    } else {
      const num = parseFloat(value);
      mutate(
        '/transactions' + auth.user?.uid,
        async (transactions: any) => {
          try {
            const {newTransaction, id} = await addTransaction(
              auth.user?.uid ?? '',
              {
                date,
                note,
                value: num,
              },
            );

            const newResult = _.cloneDeep(transactions);

            if (newResult.transactions) {
              newResult.transactions[id] = newTransaction.transactions[id];
            } else {
              newResult.transactions = newTransaction.transactions;
            }

            Snackbar.show({
              text: `Added ${num} to ${sw ? 'to income' : 'to expense'}`,
            });

            return newResult;
          } catch (err) {
            console.log(err);

            Snackbar.show({
              text: 'Something went wrong',
            });

            return transactions;
          }
        },
        false,
      );
    }
  }, [auth.user?.uid, date, note, sw, value]);

  return (
    <Background>
      <View style={styles.switchCon}>
        <Text style={styles.txt}>{sw ? 'Add income' : 'Add expense'}</Text>

        <Switch
          value={sw}
          color="#00adb5"
          onChange={() => setSw(e => !e)}
          style={styles.sw}
        />
      </View>

      <View style={styles.switchCon}>
        <Button
          onPress={() => {
            changeDate(+1);
          }}
          icon={<Icon color="#eee" name="down" size={20} />}
          type="clear"
        />

        <Text style={styles.date}>
          {date.getDate()} {MonthName[date.getMonth()]} {date.getFullYear()}
        </Text>

        <Button
          onPress={() => {
            changeDate(-1);
          }}
          icon={<Icon color="#eee" name="up" size={20} />}
          type="clear"
        />
      </View>

      <View style={styles.inputCon}>
        <TextInput
          value={value}
          onChangeText={setValue}
          keyboardType="numeric"
          placeholder="amount"
          style={styles.input}
        />
      </View>

      <View style={styles.inputCon}>
        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="optional note"
          style={styles.input}
        />
      </View>

      <View style={styles.buttons}>
        <Button
          title="clear"
          type="solid"
          onPress={handleClear}
          buttonStyle={styles.btn}
        />

        <Button
          title="Add"
          type="solid"
          onPress={handleAdd}
          buttonStyle={styles.btn}
        />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  switchCon: {
    backgroundColor: '#393e46',
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 6,
    justifyContent: 'space-between',
  },
  inputCon: {
    backgroundColor: '#393e46',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 6,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  input: {
    width: '100%',
    textAlign: 'center',
    color: '#eee',
    fontSize: 20,
  },
  sw: {},
  txt: {
    color: '#eee',
    fontSize: 16,
    paddingLeft: 10,
    // fontWeight: 'bold',
  },
  date: {
    color: '#eee',
    textTransform: 'capitalize',
    fontSize: 20,
  },
  buttons: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 50,
    borderRadius: 6,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    backgroundColor: '#393e46',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 6,
  },
});

export default AddTransaction;
