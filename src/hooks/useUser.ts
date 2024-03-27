import { AuthResponse } from "@/types/auth"
import { UserResponse } from "@/types/user"
import { localInstance } from "@/utils"
import { useEffect, useState } from "react"

const USER_PROFILE_ROUTE = "auth/profile"

const useUser = () => {
    const [user, setUser] = useState<UserResponse | null>(null)
    const [token, setToken] = useState<string>("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<unknown | null>(null)
    const handleGetUserData = async () => {
        try {
            const data: AuthResponse = await localInstance
                .get(USER_PROFILE_ROUTE)
                .json()

            setUser(data.user)
            setToken(data.token)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        handleGetUserData()
    }, [])

    return { user, token, loading, error }
}

export default useUser
