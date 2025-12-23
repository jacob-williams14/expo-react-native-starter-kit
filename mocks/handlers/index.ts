/**
 * MSW request handlers for mocking API responses in tests
 *
 * Add handlers here as needed for testing different API scenarios.
 * Handlers can be organized into separate files and imported here.
 */
import { userHandlers } from "./userHandlers";

export const handlers = [...userHandlers];
