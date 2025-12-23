import { User } from "~/services/authService";

export function getMockUser(): User {
  return {
    id: "test-user-uuid-12345",
    email: "test@example.com",
    name: "Test User",
  };
}
