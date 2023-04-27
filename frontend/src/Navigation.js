import { useState, useEffect, useContext } from 'react'
import { useHistory } from "react-router";
import { CurrentUser } from './contexts/CurrentUser';

function Navigation() {

    const history = useHistory()

    const { currentUser, setCurrentUser } = useContext(CurrentUser)
    
    const handleLogout = async () => {
        await fetch('http://localhost:5000/authentication/logout', {
          method: 'POST',
          credentials: 'include',
        })
    
        setCurrentUser(null)
        history.push('/login')
      }

    let loginActions = (
        <>
            <li style={{ float: 'right' }}>
                <a href="#" onClick={() => history.push("/sign-up")}>
                    Sign Up
                </a>
            </li>
            <li style={{ float: 'right' }}>
                <a href="#" onClick={() => history.push("/login")}>
                    Login
                </a>
            </li>
        </>
    )

    if (currentUser) {
        loginActions = (
            <li style={{ float: 'right', fontSize: 15, margin: 0, padding: 0 }}>
                    Logged in as <strong style={{fonSize: 25}}> {currentUser.firstName} {currentUser.lastName}</strong> 
                    <a style={{ float: 'top', margin: 0, fontSize: 11 }} href="#" onClick={handleLogout}><br />Logout </a>
                
            </li>
        )
    }

    let addPlaceButton = null

    if (currentUser?.role === 'admin') {
        addPlaceButton = (
            <li>
                <a href="#" onClick={() => history.push("/places/new")}>
                    Add Place
                </a>
            </li>
        )
    }

    return (
        <nav style={{padding: 20}}>
            <ul>
                <li>
                    <a href="#" onClick={() => history.push("/")}>
                        Home
                    </a>
                </li>
                <li>
                    <a href="#" onClick={() => history.push("/places")}>
                        Places
                    </a>
                </li>
                <li>
                    <a href="#" onClick={() => history.push("/places/new")}>
                        Add Place
                    </a>
                </li>
                {addPlaceButton}
                {loginActions}
            </ul>
        </nav>
    )
}

export default Navigation;