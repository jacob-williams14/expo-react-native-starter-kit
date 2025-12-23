import * as Location from "expo-location";
import { useEffect, useState } from "react";

import { Logger } from "~/lib/utils/logger";

interface LocationPermissionState {
  hasPermission: boolean | null; // null = not asked yet, false = denied, true = granted
  location: Location.LocationObject | null;
  isLoading: boolean;
  canAskAgain: boolean;
}

export function useLocationPermission() {
  const [state, setState] = useState<LocationPermissionState>({
    hasPermission: null,
    location: null,
    isLoading: true,
    canAskAgain: true,
  });

  useEffect(() => {
    (async () => {
      await checkInitialPermissionState();
    })().catch((error) => {
      Logger.error("Error checking initial permission state:", error);
    });
  }, []);

  const checkInitialPermissionState = async () => {
    try {
      // Check current permission status without asking
      const { status, canAskAgain } =
        await Location.getForegroundPermissionsAsync();

      // If status is granted, get location
      if (status === "granted") {
        const currentLocation = await Location.getCurrentPositionAsync({});
        setState({
          hasPermission: true,
          location: currentLocation,
          isLoading: false,
          canAskAgain: false, // Already granted, no need to ask
        });
      }
      // If status is denied or undetermined
      else {
        setState({
          hasPermission: false,
          location: null,
          isLoading: false,
          canAskAgain, // Use the value from OS
        });
      }
    } catch (error) {
      Logger.error("Error checking location permission:", error);
      setState({
        hasPermission: false,
        location: null,
        isLoading: false,
        canAskAgain: true,
      });
    }
  };

  const requestPermission = async (): Promise<boolean> => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));

      const { status, canAskAgain } =
        await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        const currentLocation = await Location.getCurrentPositionAsync({});
        setState({
          hasPermission: true,
          location: currentLocation,
          isLoading: false,
          canAskAgain: false,
        });
        return true;
      } else {
        setState({
          hasPermission: false,
          location: null,
          isLoading: false,
          canAskAgain,
        });
        return false;
      }
    } catch (error) {
      Logger.error("Error requesting location permission:", error);
      setState((prev) => ({
        ...prev,
        hasPermission: false,
        isLoading: false,
      }));
      return false;
    }
  };

  const getCurrentLocation =
    async (): Promise<Location.LocationObject | null> => {
      if (state.hasPermission) {
        try {
          const currentLocation = await Location.getCurrentPositionAsync({});
          setState((prev) => ({ ...prev, location: currentLocation }));
          return currentLocation;
        } catch (error) {
          Logger.error("Error getting current location:", error);
          return null;
        }
      }
      return null;
    };

  return {
    ...state,
    requestPermission,
    getCurrentLocation,
    checkInitialPermissionState,
  };
}

/**
 * Check if we should show the location permission prompt
 * Returns true if permission is not granted AND we can still ask
 */
export async function shouldPromptForLocation(): Promise<boolean> {
  try {
    const { status, canAskAgain } =
      await Location.getForegroundPermissionsAsync();

    // If not granted and we can still ask, show the prompt
    if (status !== "granted" && canAskAgain) {
      return true;
    }

    return false;
  } catch (error) {
    Logger.error("Error checking if should prompt for location:", error);
    return false;
  }
}
