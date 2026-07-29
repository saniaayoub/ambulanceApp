import React, { FC, memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import { EarningsTab } from '../../screens/App/Driver/Earnings/EarningsScreen';

interface Props {
  activeTab: EarningsTab;
  onChange: (tab: EarningsTab) => void;
}

const tabs: {
  key: EarningsTab;
  label: string;
}[] = [
  {
    key: 'today',
    label: 'Today',
  },
  {
    key: 'weekly',
    label: 'Weekly',
  },
  {
    key: 'monthly',
    label: 'Monthly',
  },
  {
    key: 'yearly',
    label: 'Yearly',
  },
];

const EarningsTabBar: FC<Props> = ({ activeTab, onChange }) => {
  const styles = useGlobalStyles();

  return (
    <View
      style={[
        globalStyles.row,
        styles.border,
        styles.round,
        globalStyles.mB20,
        {
          overflow: 'hidden',
        },
      ]}
    >
      {tabs.map(tab => {
        const active = activeTab === tab.key;

        return (
          <TouchableOpacity
            key={tab.key}
            activeOpacity={0.8}
            onPress={() => onChange(tab.key)}
            style={[
              globalStyles.flex,
              globalStyles.centered,
              globalStyles.paddingV15,
              active && styles.buttonCard,
            ]}
          >
            <Text style={[styles.h6, active && styles.white]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default memo(EarningsTabBar);
