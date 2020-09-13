import React from 'react'
import './Display.css'

export default function DisplayProfileInfo({ user, permissions }) {

    return (
            <div className="displayProfile">
                <span className="welcomeTitle" title={JSON.stringify(permissions)}>Welcome {user.name} </span>               
            </div>
    )
}
