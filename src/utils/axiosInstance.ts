import axios from "axios";

const fetcher = () => {
    const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const axiosInstance = axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
    });

    axiosInstance.interceptors.request.use(function (config) {
        const token = localStorage.getItem("token");
        config.headers.Authorization = token ? `${token}` : "";
        return config;
    });

    return axiosInstance;
};

export default fetcher();
