import React, { FC, useCallback, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';

import BackButton from '../../../../components/BackButton';
import EarningsEmpty from '../../../../components/earnings/EarningsEmpty';
import EarningsHorizontalList from '../../../../components/earnings/EarningsVerticalList';
import EarningsSkeleton from '../../../../components/earnings/EarningsSkeleton';
import EarningsSummaryCard from '../../../../components/earnings/EarningsSummaryCard';
import EarningsTabBar from '../../../../components/earnings/EarningsTabBar';
import EarningsVerticalList from '../../../../components/earnings/EarningsHorizontalList';
import { useDriverEarnings } from '../../../../hooks/useDriverEarnings';
import { globalStyles, useGlobalStyles } from '../../../../styles/globalStyles';
export type EarningsTab = 'today' | 'weekly' | 'monthly' | 'yearly';

const EarningsScreen: FC = () => {
  const styles = useGlobalStyles();

  const [activeTab, setActiveTab] = useState<EarningsTab>('today');

  const { data, isLoading, isRefetching, refetch } =
    useDriverEarnings(activeTab);

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const summaryTitle = {
    today: "Today's Earnings",
    weekly: 'This Week',
    monthly: 'This Month',
    yearly: 'This Year',
  };

  const breakdownTitle = {
    today: 'Today Breakdown',
    weekly: 'Daily Breakdown',
    monthly: 'Weekly Breakdown',
    yearly: 'Monthly Breakdown',
  };

  const isHorizontal = activeTab === 'today';

  if (isLoading) {
    return (
      <View style={[globalStyles.flex, styles.card]}>
        <BackButton title="Earnings" />
        <EarningsSkeleton />
      </View>
    );
  }

  return (
    <View style={[globalStyles.flex, styles.card]}>
      <BackButton title="Earnings" />

      <FlatList
        data={[]}
        keyExtractor={() => 'header'}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <>
            <View style={globalStyles.padding15}>
              <EarningsTabBar activeTab={activeTab} onChange={setActiveTab} />

              <EarningsSummaryCard
                title={summaryTitle[activeTab]}
                earnings={data?.summary?.earnings ?? 0}
                trips={data?.summary?.trips ?? 0}
                average={data?.summary?.averagePerTrip ?? 0}
              />

              {isHorizontal ? (
                <EarningsHorizontalList
                  title={breakdownTitle[activeTab]}
                  data={data?.breakdown ?? []}
                />
              ) : (
                <EarningsVerticalList
                  title={breakdownTitle[activeTab]}
                  data={data?.breakdown ?? []}
                />
              )}

              {data?.breakdown?.length === 0 && <EarningsEmpty />}
            </View>
          </>
        }
        renderItem={null}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={globalStyles.paddingB40}
      />
    </View>
  );
};

export default EarningsScreen;
