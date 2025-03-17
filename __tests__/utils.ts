import { act } from '@testing-library/react-native';

/**
 * Helper function to wait for state updates in tests
 * @param timeout Optional timeout in milliseconds (default: 0)
 */
export const waitForStateUpdate = async (timeout: number = 0) => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, timeout));
  });
};
