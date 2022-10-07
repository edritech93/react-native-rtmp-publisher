import React from 'react';
import { StyleSheet } from 'react-native';
import { Text as DefaultText } from 'react-native-paper';
import { moderateScale } from '../libs/scaling';

export function Text(props) {
  const { children, style, ...restProps } = props;
  return (
    <DefaultText style={[styles.textStyle, style]} {...restProps}>
      {children}
    </DefaultText>
  );
}

export function Title(props) {
  const { children, style, ...restProps } = props;
  return (
    <Text style={[styles.titleStyle, style]} {...restProps}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: moderateScale(16),
    lineHeight: moderateScale(25),
    color: 'red',
  },
  titleStyle: {
    fontSize: moderateScale(24),
    lineHeight: moderateScale(29),
    fontWeight: '600',
  },
});
