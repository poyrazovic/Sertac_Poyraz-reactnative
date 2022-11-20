import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, MD3LightTheme } from 'react-native-paper';

const Loader = () => {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator animating={true} color={MD3LightTheme.colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
});

export default Loader;
