// import React, { useState, type FC } from 'react';
// import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
// import { moderateScale } from 'react-native-size-matters';
// import BackButton from '../../../../components/BackButton';
// import { useEarningsStore } from '../../../../stores/earningsStore';
// import { globalStyles, useGlobalStyles } from '../../../../styles/globalStyles';

// type TabKey = 'today' | 'weekly' | 'monthly';

// const EarningsScreen: FC = () => {
//   const styles = useGlobalStyles();
//   const [activeTab, setActiveTab] = useState<TabKey>('today');
//   const {
//     todayEarnings,
//     weeklyEarnings,
//     monthlyEarnings,
//     todayTrips,
//     weeklyTrips,
//     monthlyTrips,
//     dailyBreakdown,
//     weeklyBreakdown,
//     monthlyBreakdown,
//   } = useEarningsStore();

//   const tabs: { key: TabKey; label: string }[] = [
//     { key: 'today', label: 'Today' },
//     { key: 'weekly', label: 'Weekly' },
//     { key: 'monthly', label: 'Monthly' },
//   ];

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'today':
//         return (
//           <View>
//             <View
//               style={[
//                 styles.border,
//                 globalStyles.padding20,
//                 globalStyles.centered,
//                 globalStyles.mB10,
//               ]}
//             >
//               <Text style={styles.smallText}>Today's Earnings</Text>
//               <Text style={[styles.h4, globalStyles.mT5]}>
//                 Rs. {todayEarnings}
//               </Text>
//               <Text style={[styles.smallText, globalStyles.mT5]}>
//                 {todayTrips} Trips Completed
//               </Text>
//             </View>

//             <Text style={[styles.h6, globalStyles.mB10]}>Daily Breakdown</Text>
//             <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               style={globalStyles.mB10}
//             >
//               {dailyBreakdown.map((day, _index) => (
//                 <View
//                   key={day.date}
//                   style={[
//                     styles.border,
//                     globalStyles.padding15,
//                     globalStyles.centered,
//                     globalStyles.mR10,
//                     { minWidth: moderateScale(80) },
//                   ]}
//                 >
//                   <Text style={styles.smallText}>{day.date}</Text>
//                   <Text style={[styles.h6, globalStyles.mT5]}>
//                     Rs. {day.amount}
//                   </Text>
//                   <Text style={[styles.smallText, globalStyles.mT5]}>
//                     {day.trips} trips
//                   </Text>
//                 </View>
//               ))}
//             </ScrollView>
//           </View>
//         );

//       case 'weekly':
//         return (
//           <View>
//             <View
//               style={[
//                 styles.border,
//                 globalStyles.padding20,
//                 globalStyles.centered,
//                 globalStyles.mB10,
//               ]}
//             >
//               <Text style={styles.smallText}>This Week</Text>
//               <Text style={[styles.h4, globalStyles.mT5]}>
//                 Rs. {weeklyEarnings}
//               </Text>
//               <Text style={[styles.smallText, globalStyles.mT5]}>
//                 {weeklyTrips} Trips Completed
//               </Text>
//             </View>

//             <Text style={[styles.h6, globalStyles.mB10]}>Weekly Breakdown</Text>
//             {weeklyBreakdown.map((week, _index) => (
//               <View
//                 key={week.week}
//                 style={[
//                   styles.border,
//                   globalStyles.padding15,
//                   globalStyles.row,
//                   globalStyles.spaceBetween,
//                   globalStyles.alignCenter,
//                   globalStyles.mB5,
//                 ]}
//               >
//                 <View>
//                   <Text style={styles.h6}>{week.week}</Text>
//                   <Text style={styles.smallText}>{week.trips} trips</Text>
//                 </View>
//                 <Text style={styles.h5}>Rs. {week.amount}</Text>
//               </View>
//             ))}
//           </View>
//         );

//       case 'monthly':
//         return (
//           <View>
//             <View
//               style={[
//                 styles.border,
//                 globalStyles.padding20,
//                 globalStyles.centered,
//                 globalStyles.mB10,
//               ]}
//             >
//               <Text style={styles.smallText}>This Month</Text>
//               <Text style={[styles.h4, globalStyles.mT5]}>
//                 Rs. {monthlyEarnings}
//               </Text>
//               <Text style={[styles.smallText, globalStyles.mT5]}>
//                 {monthlyTrips} Trips Completed
//               </Text>
//             </View>

//             <Text style={[styles.h6, globalStyles.mB10]}>
//               Monthly Breakdown
//             </Text>
//             {monthlyBreakdown.map((month, _index) => (
//               <View
//                 key={month.month}
//                 style={[
//                   styles.border,
//                   globalStyles.padding15,
//                   globalStyles.row,
//                   globalStyles.spaceBetween,
//                   globalStyles.alignCenter,
//                   globalStyles.mB5,
//                 ]}
//               >
//                 <View>
//                   <Text style={styles.h6}>{month.month}</Text>
//                   <Text style={styles.smallText}>{month.trips} trips</Text>
//                 </View>
//                 <Text style={styles.h5}>Rs. {month.amount}</Text>
//               </View>
//             ))}
//           </View>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <View style={[globalStyles.flex, styles.card]}>
//       <BackButton title="Earnings" />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         style={[globalStyles.flex, globalStyles.padding15]}
//       >
//         {/* Tab Bar */}
//         <View
//           style={[
//             globalStyles.row,
//             styles.border,
//             styles.round,
//             globalStyles.mB15,
//             { overflow: 'hidden' },
//           ]}
//         >
//           {tabs.map(tab => (
//             <TouchableOpacity
//               key={tab.key}
//               style={[
//                 globalStyles.flex,
//                 globalStyles.centered,
//                 globalStyles.paddingV15,
//                 activeTab === tab.key && styles.buttonCard,
//               ]}
//               onPress={() => setActiveTab(tab.key)}
//             >
//               <Text style={[styles.h6, activeTab === tab.key && styles.white]}>
//                 {tab.label}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {renderTabContent()}
//       </ScrollView>
//     </View>
//   );
// };

// export default EarningsScreen;

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
import { EarningsTab } from '../../../../stores/earningsStore';

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
