import React from 'react'

import './Toolbar.css'
import '../SideDrawer/DrawerToggleButton'
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton'
import LoginButton from '../Buttons/LoginButton'
import LogoutButton from '../Buttons/LogoutButton'
import MoviesButton from '../Buttons/MoviesButton'
import ActorsButton from '../Buttons/ActorsButton'

const Toolbar = ({toggle, getList}) => {
    return (
        <header className="toolbar">
            <nav className="toolbar_navigation">
                <div className="drawToggle">
                    <DrawerToggleButton toggle={toggle} />
                </div>
                <div className="toolbar_logo"><a href='/'>CAPSTONE </a></div>
                <div className="spacer"></div>
                <div className="toolbar_navigation-items">
                    <ul>
                        <li><LoginButton /></li>
                        <li><LogoutButton /></li>
                        <li><MoviesButton getList={getList}/></li>
                        <li><ActorsButton getList={getList}/></li>
                    </ul>
                </div>
            </nav>
        </header>
            
        
    )
}

export default Toolbar
