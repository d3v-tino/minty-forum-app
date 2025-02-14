export class ApiClient {
    baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    };

    private async request(endpoint: string, method: "GET" | "POST", data?: Record<string, string>, additionalHeaders?: Record<string,string>) {
        try {
            const response = await fetch(`${this.baseUrl}/${endpoint}`, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    ...additionalHeaders,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            return response;

        } catch (e) {
            console.error("API request failed", e);
            return null;
        }
    }

    public async post(endpoint: string, data: Record<string, string>, additionalHeaders?: Record<string, string>) {
        return this.request(endpoint, "POST", data, additionalHeaders);
    }

    public async get(endpoint: string, additionalHeaders?: Record<string, string>) {
        return this.request(endpoint, "GET", additionalHeaders);
    }
}

export const api = new ApiClient("http://localhost:5000/api/v1");