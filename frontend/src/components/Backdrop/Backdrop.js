import React from 'react'
import './Backdrop.css'

export default function Backdrop({closeDrawer}) {
    return (
        <div className="backdrop" onClick={closeDrawer}>
            
        </div>
    )
}
