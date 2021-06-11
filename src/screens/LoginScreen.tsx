import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Snackbar from 'react-native-snackbar';
import Background from '../components/Background';
import {signin} from '../hooks/useAuth';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = () => {
  return (
    <Background>
      <View style={styles.view}>
        <Text>sign in with</Text>

        <Button
          type="solid"
          onPress={() =>
            signin()
              .then(() =>
                Snackbar.show({
                  text: 'SIGNED IN',
                  duration: Snackbar.LENGTH_SHORT,
                }),
              )
              .catch(() =>
                Snackbar.show({
                  text: 'cannot sign in',
                  duration: Snackbar.LENGTH_SHORT,
                }),
              )
          }
          icon={<Icon name="google" size={40} color="#eee" />}
          iconPosition="bottom"
          buttonStyle={styles.button}
          iconContainerStyle={styles.buttonContainer}
          titleStyle={styles.title}
        />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  view: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginBottom: 50,
    marginTop: 10,
    backgroundColor: '#222831',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonContainer: {},
  title: {
    color: '#222831',
    marginRight: 10,
  },
});

export default LoginScreen;
