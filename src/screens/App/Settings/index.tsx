import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { changeAppLanguage } from '../../../localization/i18n';

const SettingsScreen = () => {
  const { t } = useTranslation();

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>{t('settings')}</Text>

      <TouchableOpacity onPress={() => changeAppLanguage('en')}>
        <Text>{t('english')}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => changeAppLanguage('ur')}>
        <Text>{t('urdu')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
