import { http, HttpResponse } from "msw";

import { config } from "~/lib/config";
import { getMockUser } from "~/mocks/data/user";

export const userHandlers = [
  http.get(`${config.apiUrl}/api/v1/user`, () => {
    return HttpResponse.json(getMockUser());
  }),
];
