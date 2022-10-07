import React from 'react';
import { StyleSheet } from 'react-native';
import { Card as PaperCard } from 'react-native-paper';
import { moderateScale } from '../libs/scaling';

export function Card(props) {
  const {
    children,
    style,
    padding = moderateScale(16),
    contentStyle,
    ...restProps
  } = props;
  const paddingCard = {
    paddingHorizontal: padding ? padding : 0,
    paddingVertical: padding ? padding : 0,
  };
  return (
    <PaperCard style={[styles.container, style]} {...restProps}>
      <PaperCard.Content style={[paddingCard, contentStyle]}>
        {children}
      </PaperCard.Content>
    </PaperCard>
  );
}

export function CardView(props) {
  const {
    children,
    style,
    padding = moderateScale(16),
    contentStyle,
    ...restProps
  } = props;
  const paddingCard = {
    paddingHorizontal: padding ? padding : 0,
    paddingVertical: padding ? padding : 0,
  };
  return (
    <PaperCard
      style={[styles.container, style]}
      accessible={false}
      {...restProps}
    >
      <PaperCard.Content style={[paddingCard, contentStyle]}>
        {children}
      </PaperCard.Content>
    </PaperCard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});
