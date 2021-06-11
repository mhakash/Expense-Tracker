import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {signout, useAuth} from '../hooks/useAuth';
import {Button as ButtonElement} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/core';
import {useTransactions} from '../hooks/useTransactions';

export const HomeScreen = () => {
  const auth = useAuth();
  const navigation = useNavigation();
  const {transactions} = useTransactions();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>
        <Text>Welcome {auth.user?.email}</Text>

        <Text>{auth?.user?.uid}</Text>

        <Button
          title="logout"
          onPress={() =>
            signout().then(() =>
              Snackbar.show({
                text: 'SIGNED OUT',
                duration: Snackbar.LENGTH_SHORT,
              }),
            )
          }
        />

        <ButtonElement
          title=""
          type="solid"
          icon={<Icon name="plus" size={25} color="white" />}
          buttonStyle={styles.button}
          containerStyle={styles.buttoncontainer}
          onPress={() => navigation.navigate('Add transaction')}
        />

        {Object.keys(transactions ?? []).map(e => {
          return (
            <View key={e}>
              <Text>
                {transactions[e].value} {transactions[e].note}
              </Text>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  button: {
    backgroundColor: '#222831',
    width: 50,
    height: 50,
    borderRadius: 30,
    padding: 10,
    bottom: 0,
  },
  view: {
    height: '100%',
  },
  buttoncontainer: {position: 'absolute', bottom: 20, right: 20},
});
