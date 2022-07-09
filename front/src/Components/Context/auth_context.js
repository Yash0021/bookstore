
import React from 'react'

const AuthContext = React.createContext({
    isLoggedIn: false,
    totalItems: 0,
    increaseItems: () => {},
    onLogout: () => {}
})

export default AuthContext
