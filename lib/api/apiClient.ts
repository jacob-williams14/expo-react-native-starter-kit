import { SecureStoreTokenManager, TokenManager } from "./tokenManager";
import { config } from "~/lib/config";
import { Logger } from "~/lib/utils/logger";

export type RequestOptions<TBody = unknown> = {
  method?: string;
  headers?: Record<string, string>;
  body?: TBody;
};

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class ApiClient {
  private static instance: ApiClient | null = null;
  private tokenManager: TokenManager;
  private authFailureCallback: (() => void) | null = null;

  private constructor() {
    this.tokenManager = SecureStoreTokenManager.getManager();
  }

  public static getClient(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  setAuthFailureCallback = (callback: () => void): void => {
    this.authFailureCallback = callback;
  };

  public async request<T, TBody = unknown>(
    endpoint: string,
    options: RequestOptions<TBody> = {}
  ): Promise<T> {
    const url = `${config.apiUrl}${endpoint}`;

    const accessToken = await this.tokenManager.getAccessToken();

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const body = options.body
      ? typeof options.body === "string"
        ? options.body
        : JSON.stringify(options.body)
      : undefined;

    try {
      const response = await fetch(url, {
        method: options.method || "GET",
        headers,
        body,
      });

      if (response.status === 401) {
        Logger.debug("Got 401, triggering auth failure callback");
        await this.tokenManager.clearTokens();

        if (this.authFailureCallback) {
          this.authFailureCallback();
        }

        throw new ApiError("Authentication failed", 401);
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new ApiError(
          `API request failed: ${response.status} ${errorText}`,
          response.status
        );
      }

      return await response.json();
    } catch (error) {
      Logger.debug(`API request to ${endpoint} failed:`, error);
      throw error;
    }
  }
}

export const apiClient = ApiClient.getClient();
