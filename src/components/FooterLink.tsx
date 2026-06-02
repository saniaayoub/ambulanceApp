import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { globalStyles, useGlobalStyles } from '../styles/globalStyles';
type Props = {
  handleNavigate: () => void;
  text: string;
  linkText: string;
};
const FooterLink = ({ handleNavigate, text, linkText }: Props) => {
  const styles = useGlobalStyles();
  return (
    <TouchableOpacity
      style={globalStyles.absBottomTxt}
      onPress={handleNavigate}
    >
      <Text style={[styles.lightText]}>
        {text}
        <Text style={styles.link}> {linkText}</Text>
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(FooterLink);
