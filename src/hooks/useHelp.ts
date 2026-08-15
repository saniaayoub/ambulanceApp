// Utility file for future step-specific sheet content routing

import { toastError, toastSuccess } from '../services/toast';
import { createSupportTicketApi } from '../services/userService';
import { useLoaderStore } from '../stores/loaderStore';
import { getErrorMessage } from './useAuth';

export const useHelp = () => {
  const { showLoader, hideLoader } = useLoaderStore();

  const createSupportTicket = async (payload: any) => {
    showLoader();
    try {
      const response = await createSupportTicketApi(payload);

      if (!response.success) {
        toastError(getErrorMessage(response.error));
        return response;
      }

      toastSuccess(
        'Your issue has been submitted successfully. Our support team will review it shortly.',
        'Issue Submitted',
      );

      return response.data;
    } finally {
      hideLoader();
    }
  };

  return {
    createSupportTicket,
  };
};
