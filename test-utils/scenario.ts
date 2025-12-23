import { act } from ".";
import { queryClient } from "./queryClient";
import { server } from "./utils";
import { SecureStoreTokenManager } from "~/lib/api/tokenManager";
import { useAppState } from "~/lib/stores/appState";
import { getMockUser } from "~/mocks/data/user";
import { User } from "~/services/authService";

export const Scenario = new (class Scenario {
  private userTypeSpecified: boolean = false;
  private _pendingPromises: Promise<void>[] = [];

  reset() {
    this._pendingPromises = [];
    this.userTypeSpecified = false;
    act(() => {
      useAppState.getState().actions.clearUser();
    });
    server.resetHandlers();
    queryClient.clear();
    return this;
  }

  authenticatedUser(overrides?: Partial<User>) {
    const userPromise = (async () => {
      const user = {
        ...getMockUser(),
        ...overrides,
      };

      await SecureStoreTokenManager.getManager().setTokens("mock-access-token");

      act(() => {
        useAppState.getState().actions.setUser(user);
      });

      this.userTypeSpecified = true;
    })();

    this._pendingPromises.push(userPromise);
    return this;
  }

  guest() {
    const guestPromise = (async () => {
      await SecureStoreTokenManager.getManager().clearTokens();

      act(() => {
        useAppState.getState().actions.clearUser();
      });

      this.userTypeSpecified = true;
    })();

    this._pendingPromises.push(guestPromise);
    return this;
  }

  _throwIfInvalid() {
    if (!this.userTypeSpecified) {
      console.warn(
        "User type (authenticatedUser/guest) may not be fully set yet. Call await Scenario.authenticatedUser() or await Scenario.guest() chain first."
      );
    }
  }

  private async then(
    resolve: (value: unknown) => void,
    reject: (reason?: unknown) => void
  ) {
    const allPromises = Promise.all(this._pendingPromises).then(() => {});
    this._pendingPromises = [];
    await allPromises.then(resolve, reject);
  }
})();
