import { create } from 'zustand';

export type EarningsTab = 'today' | 'weekly' | 'monthly' | 'yearly';

export interface BreakdownItem {
  label: string;
  amount: number;
  trips: number;
}

export interface EarningsSummary {
  earnings: number;
  trips: number;
  averagePerTrip: number;
}

export interface EarningsResponse {
  summary: EarningsSummary;
  breakdown: BreakdownItem[];
}
export interface EarningsDay {
  date: string;
  amount: number;
  trips: number;
}

export interface EarningsWeek {
  week: string;
  amount: number;
  trips: number;
}

export interface EarningsMonth {
  month: string;
  amount: number;
  trips: number;
}

interface EarningsState {
  todayEarnings: number;
  weeklyEarnings: number;
  monthlyEarnings: number;
  todayTrips: number;
  weeklyTrips: number;
  monthlyTrips: number;

  dailyBreakdown: EarningsDay[];
  weeklyBreakdown: EarningsWeek[];
  monthlyBreakdown: EarningsMonth[];

  updateTodayEarnings: (amount: number) => void;
}

export const useEarningsStore = create<EarningsState>(set => ({
  todayEarnings: 2500,
  weeklyEarnings: 18500,
  monthlyEarnings: 72500,
  todayTrips: 2,
  weeklyTrips: 14,
  monthlyTrips: 58,

  dailyBreakdown: [
    { date: 'Mon', amount: 4500, trips: 3 },
    { date: 'Tue', amount: 3200, trips: 2 },
    { date: 'Wed', amount: 5100, trips: 4 },
    { date: 'Thu', amount: 2800, trips: 2 },
    { date: 'Fri', amount: 6200, trips: 5 },
    { date: 'Sat', amount: 3900, trips: 3 },
    { date: 'Sun', amount: 2500, trips: 2 },
  ],

  weeklyBreakdown: [
    { week: 'Week 1', amount: 18500, trips: 14 },
    { week: 'Week 2', amount: 22000, trips: 16 },
    { week: 'Week 3', amount: 17500, trips: 13 },
    { week: 'Week 4', amount: 14500, trips: 11 },
  ],

  monthlyBreakdown: [
    { month: 'Jan', amount: 62000, trips: 48 },
    { month: 'Feb', amount: 58000, trips: 45 },
    { month: 'Mar', amount: 72500, trips: 58 },
    { month: 'Apr', amount: 68000, trips: 52 },
    { month: 'May', amount: 45000, trips: 35 },
    { month: 'Jun', amount: 50000, trips: 40 },
  ],

  updateTodayEarnings: amount =>
    set(state => ({
      todayEarnings: state.todayEarnings + amount,
    })),
}));
