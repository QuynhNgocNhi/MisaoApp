// import dependencies
import React from 'react';
import { StyleSheet, TextStyle } from 'react-native';

// import components
import { ButtonText } from '../Text';

// import colors
import color from '../../theme/color';

// LinkButton Styles
const styles = StyleSheet.create({
  title: {
    padding: 2,
    color: color.primaryColor,
  },
});

// LinkButton Props
type Props = {
  onPress: () => void,
  title: string,
  titleStyle: TextStyle,
};

// LinkButton
const LinkButton = ({ onPress, title, titleStyle }: Props) => (
  <ButtonText onPress={onPress} style={[styles.title, titleStyle]}>
    {title || 'Link Button'}
  </ButtonText>
);

export default LinkButton;