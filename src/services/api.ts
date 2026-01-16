import api from "@/libs/axios";

export async function getHealthCheck() {
    const { data } = await api.get('/');
    return data;
}