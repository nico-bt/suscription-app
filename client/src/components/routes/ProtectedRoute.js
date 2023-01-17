import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from "../../context/UserContext"

function ProtectedRoute() {
    const [user] = useContext(UserContext)

    if(user.loading) {
        return <div>Loading...</div>
    }

    return (user.data? <Outlet /> : <Navigate to={"/"} />)
}

export default ProtectedRoute