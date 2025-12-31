import { api, handleServerError } from '@/api'
import type { IAuth, LoginInput } from '@/modules/auth/lib/types.ts'

const baseUrl = '/auth'

export const AuthService = {
    async userLogin(credentials: LoginInput): Promise<IAuth> {
        try {
            const response = await api.post(`${baseUrl}/login`, credentials, {
                headers: { 'X-Skip-Interceptor': 'true' },
            })

            const { payload } = response.data

            return payload
        } catch (error) {
            handleServerError(error)
        }
    },

    async refreshToken(): Promise<IAuth> {
        try {
            const response = await api.get(`${baseUrl}/refresh-token`, {
                headers: { 'X-Skip-Interceptor': 'true' },
            })

            const { payload } = response.data

            return payload
        } catch (error) {
            handleServerError(error)
        }
    },

    async userLogout(allDevices: boolean = true) {
        const queryParams = allDevices ? '?all=true' : ''

        try {
            await api.post(`${baseUrl}/logout${queryParams}`)
        } catch (error) {
            handleServerError(error)
        }
    },
}