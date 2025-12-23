import { setupServer } from "msw/native";

import { handlers } from "~/mocks/handlers";

export const server = setupServer(...handlers);
