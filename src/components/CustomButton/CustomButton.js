import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

const CustomButton = ({
  onPress,
  text,
  type = 'PRIMARY',
  bgColor,
  fgColor,
  width,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : {},
        width ? {width: width} : {},
      ]}>
      <Text style={[styles.text, fgColor ? {color: fgColor} : {}]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#008001',
    width: '100%',
    padding: 12,
    marginVertical: 5,
    alignItems: 'center',
  },
  container_PRIMARY: {
    borderRadius: 10,
  },
  container_ROUNDED: {
    borderRadius: 100,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default CustomButton;
