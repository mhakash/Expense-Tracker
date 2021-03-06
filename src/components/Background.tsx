import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
});

const Background: React.FC = ({children}) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

export default Background;
