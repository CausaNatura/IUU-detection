import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import openNotification from 'hooks/notificationHook';

/**
 * Log a warning and show a toast!
 */
export const errorLoggingMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    openNotification({
      type: 'error',
      placement: 'top',
      message: 'Error',
      description: `${action.payload}`,
    });
  }

  return next(action);
};
