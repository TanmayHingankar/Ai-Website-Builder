import React from 'react'
import { useEffect } from 'react'
import api from '../services/api'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function useGetCurrentUser() {
    const dispatch=useDispatch()
    useEffect(() => {
        const getCurrentUser = async () => {
            try {
              const result=await api.get(`/user/me`)
              dispatch(setUserData(result.data))
            } catch (error) {
              const status = error?.response?.status
              if (status !== 400 && status !== 401) {
                console.error("getCurrentUser failed:", error)
              }
            }
        }
        getCurrentUser()
    }, [])
}

export default useGetCurrentUser
