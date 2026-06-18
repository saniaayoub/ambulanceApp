import { Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';

const SearchingLoader = () => {
  const [dots, setDots] = useState('');
  const styles = useGlobalStyles();

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length === 3 ? '' : prev + '.'));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Text
      style={[styles?.h6, styles.link, globalStyles.mB10]}
    >{`Searching${dots}`}</Text>
  );
};

export default SearchingLoader;
