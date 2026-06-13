import React, { useState, type FC } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import BackButton from '../../../../components/BackButton';
import { useEarningsStore } from '../../../../stores/earningsStore';
import { globalStyles, useGlobalStyles } from '../../../../styles/globalStyles';

type TabKey = 'today' | 'weekly' | 'monthly';

const EarningsScreen: FC = () => {
  const styles = useGlobalStyles();
  const [activeTab, setActiveTab] = useState<TabKey>('today');
  const {
    todayEarnings,
    weeklyEarnings,
    monthlyEarnings,
    todayTrips,
    weeklyTrips,
    monthlyTrips,
    dailyBreakdown,
    weeklyBreakdown,
    monthlyBreakdown,
  } = useEarningsStore();

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'today', label: 'Today' },
    { key: 'weekly', label: 'Weekly' },
    { key: 'monthly', label: 'Monthly' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'today':
        return (
          <View>
            <View
              style={[
                styles.border,
                globalStyles.padding20,
                globalStyles.centered,
                globalStyles.mB10,
              ]}
            >
              <Text style={styles.smallText}>Today's Earnings</Text>
              <Text style={[styles.h4, globalStyles.mT5]}>
                Rs. {todayEarnings}
              </Text>
              <Text style={[styles.smallText, globalStyles.mT5]}>
                {todayTrips} Trips Completed
              </Text>
            </View>

            <Text style={[styles.h6, globalStyles.mB10]}>Daily Breakdown</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={globalStyles.mB10}
            >
              {dailyBreakdown.map((day, _index) => (
                <View
                  key={day.date}
                  style={[
                    styles.border,
                    globalStyles.padding15,
                    globalStyles.centered,
                    globalStyles.mR10,
                    { minWidth: moderateScale(80) },
                  ]}
                >
                  <Text style={styles.smallText}>{day.date}</Text>
                  <Text style={[styles.h6, globalStyles.mT5]}>
                    Rs. {day.amount}
                  </Text>
                  <Text style={[styles.smallText, globalStyles.mT5]}>
                    {day.trips} trips
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        );

      case 'weekly':
        return (
          <View>
            <View
              style={[
                styles.border,
                globalStyles.padding20,
                globalStyles.centered,
                globalStyles.mB10,
              ]}
            >
              <Text style={styles.smallText}>This Week</Text>
              <Text style={[styles.h4, globalStyles.mT5]}>
                Rs. {weeklyEarnings}
              </Text>
              <Text style={[styles.smallText, globalStyles.mT5]}>
                {weeklyTrips} Trips Completed
              </Text>
            </View>

            <Text style={[styles.h6, globalStyles.mB10]}>Weekly Breakdown</Text>
            {weeklyBreakdown.map((week, _index) => (
              <View
                key={week.week}
                style={[
                  styles.border,
                  globalStyles.padding15,
                  globalStyles.row,
                  globalStyles.spaceBetween,
                  globalStyles.alignCenter,
                  globalStyles.mB5,
                ]}
              >
                <View>
                  <Text style={styles.h6}>{week.week}</Text>
                  <Text style={styles.smallText}>{week.trips} trips</Text>
                </View>
                <Text style={styles.h5}>Rs. {week.amount}</Text>
              </View>
            ))}
          </View>
        );

      case 'monthly':
        return (
          <View>
            <View
              style={[
                styles.border,
                globalStyles.padding20,
                globalStyles.centered,
                globalStyles.mB10,
              ]}
            >
              <Text style={styles.smallText}>This Month</Text>
              <Text style={[styles.h4, globalStyles.mT5]}>
                Rs. {monthlyEarnings}
              </Text>
              <Text style={[styles.smallText, globalStyles.mT5]}>
                {monthlyTrips} Trips Completed
              </Text>
            </View>

            <Text style={[styles.h6, globalStyles.mB10]}>
              Monthly Breakdown
            </Text>
            {monthlyBreakdown.map((month, _index) => (
              <View
                key={month.month}
                style={[
                  styles.border,
                  globalStyles.padding15,
                  globalStyles.row,
                  globalStyles.spaceBetween,
                  globalStyles.alignCenter,
                  globalStyles.mB5,
                ]}
              >
                <View>
                  <Text style={styles.h6}>{month.month}</Text>
                  <Text style={styles.smallText}>{month.trips} trips</Text>
                </View>
                <Text style={styles.h5}>Rs. {month.amount}</Text>
              </View>
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={[globalStyles.flex, styles.card]}>
      <BackButton title="Earnings" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[globalStyles.flex, globalStyles.padding15]}
      >
        {/* Tab Bar */}
        <View
          style={[
            globalStyles.row,
            styles.border,
            styles.round,
            globalStyles.mB15,
            { overflow: 'hidden' },
          ]}
        >
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab.key}
              style={[
                globalStyles.flex,
                globalStyles.centered,
                globalStyles.paddingV15,
                activeTab === tab.key && styles.buttonCard,
              ]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text style={[styles.h6, activeTab === tab.key && styles.white]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {renderTabContent()}
      </ScrollView>
    </View>
  );
};

export default EarningsScreen;
