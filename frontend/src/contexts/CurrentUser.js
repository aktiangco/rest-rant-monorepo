import { createContext, useState, useEffect } from "react";


export const CurrentUser = createContext()

function CurrentUserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    
    //  Fetch the current user on page load
    useEffect(() => {
        const getLoggedInUser = async () => {
            let response = await fetch('http://localhost:5000/authentication/profile', {
                // Setting authorization in Headers 
                headers: {
                    // "Bearer" is not really required for the authentication to work, but it is conventional when sending authorization tokens to an API
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            let user = await response.json()
            setCurrentUser(user)
        }
        getLoggedInUser()
    }, [])
  


    return (
        <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUser.Provider>
    )
}

export default CurrentUserProvider

