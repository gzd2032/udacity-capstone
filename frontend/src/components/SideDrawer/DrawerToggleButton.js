import React from 'react'
import './DrawerToggle.css'

export default function DrawerToggleButton({toggle}) {
    return (
        <button className="toggle-button" onClick={toggle}>
            <div className="toggle-button_line" />
            <div className="toggle-button_line" />
            <div className="toggle-button_line" />
        </button>
    )
}
