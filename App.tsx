/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import NetInfo from '@react-native-community/netinfo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import FullScreenLoader from './src/components/FullScreenLoader';
import './src/localization/i18n';
import MainStack from './src/navigation/MainStack';
import { useLoaderStore } from './src/stores/loaderStore';
import { useQueueStore } from './src/stores/queueStore';
// import { useThemeStore } from './src/stores/themeStore';
import { globalStyles } from './src/styles/globalStyles';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: 2,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
  },
});

function App() {
  // const isDark = useThemeStore(state => state.isDark);
  const isLoading = useLoaderStore(state => state.isLoading);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        useQueueStore.getState().processQueue();
      }
    });
    return unsubscribe;
  }, []);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        {/* <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} /> */}
        <KeyboardAvoidingView
          style={globalStyles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <MainStack />
          <FullScreenLoader loading={isLoading} />
          <Toast />
        </KeyboardAvoidingView>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
