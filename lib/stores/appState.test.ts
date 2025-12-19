import { useAppState } from "./appState";
import { getMockUser } from "~/mocks/data/user";

describe("appState store", () => {
  const mockUser = getMockUser();

  beforeEach(() => {
    useAppState.setState({
      user: null,
      isLoading: true,
      isAuthenticated: false,
    });
  });

  describe("initial state", () => {
    it("starts with null user and unauthenticated", () => {
      const state = useAppState.getState();

      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe("setUser", () => {
    it("sets user and marks as authenticated", () => {
      useAppState.getState().actions.setUser(mockUser);

      const state = useAppState.getState();
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
    });

    it("clears authentication when set to null", () => {
      useAppState.getState().actions.setUser(mockUser);
      expect(useAppState.getState().isAuthenticated).toBe(true);

      useAppState.getState().actions.setUser(null);

      const state = useAppState.getState();
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe("clearUser", () => {
    it("clears user and marks as unauthenticated", () => {
      useAppState.getState().actions.setUser(mockUser);
      expect(useAppState.getState().user).not.toBeNull();

      useAppState.getState().actions.clearUser();

      const state = useAppState.getState();
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe("setLoading", () => {
    it("updates loading state", () => {
      useAppState.getState().actions.setLoading(false);
      expect(useAppState.getState().isLoading).toBe(false);

      useAppState.getState().actions.setLoading(true);
      expect(useAppState.getState().isLoading).toBe(true);
    });
  });
});
