import axios, {AxiosError} from "axios";
import {AuthService} from "@/modules/auth/lib/service/auth-service.ts";
import {useAuthStore} from "@/modules/auth/lib/hooks/use-auth-store.ts";

export const baseUrl =
    process.env.NODE_ENV === "production"
        ? "https://invento.sawasoft.co.tz/api"
        : "http://127.0.0.1:8080/api";

export const api = axios.create({
    baseURL: baseUrl,
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
});

api.interceptors.request.use(
    config => {
        if (config.headers?.["X-Skip-Interceptor"] === "true") return config;

        const {accessToken} = useAuthStore.getState();

        if (accessToken) {
            config.headers = config.headers ?? {};
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    error => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.headers?.["X-Skip-Interceptor"]
        ) {
            originalRequest._retry = true;
            const {logout} = useAuthStore.getState();

            try {
                const {accessToken, user} = await AuthService.refreshToken();

                if (!accessToken) {
                    await logout();
                    return Promise.reject(new Error("No access token after refresh"));
                }

                useAuthStore.setState({accessToken, currentUser: user});

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return api(originalRequest);
            } catch (err) {
                await logout();
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export async function download(downloadUrl: string, filename?: string) {
    try {
        const response = await api.get(downloadUrl, {responseType: "blob"});

        const blob = new Blob([response.data], {type: "application/pdf"});
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.setAttribute("download", filename ?? "");
        document.body.appendChild(link);
        link.click();

        if (link.parentNode) link.parentNode.removeChild(link);

        window.URL.revokeObjectURL(url);
    } catch (error) {
        handleServerError(error);
    }
}

export function handleServerError(error: unknown): never {
    if (error instanceof AxiosError) {
        throw new Error(
            error?.response?.data?.message ??
            error?.response?.data?.error ??
            "Unable to connect to our servers. Please check your internet connection."
        );
    }

    throw new Error("Something went wrong.");
}