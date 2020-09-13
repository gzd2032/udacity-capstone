import React from 'react'
import './SideDrawer.css'
import LoginButton from '../Buttons/LoginButton'
import LogoutButton from '../Buttons/LogoutButton'
import MoviesButton from '../Buttons/MoviesButton'
import ActorsButton from '../Buttons/ActorsButton'

export default function SideDrawer({showDrawer, getList}) {
    let drawerClasses = 'side-drawer';
    if (showDrawer){
        const newClasses = drawerClasses + ' open'
        drawerClasses = newClasses
    }
    return (
        <nav className={drawerClasses}>
            <ul>
                <li><LoginButton /></li>
                <li><LogoutButton /></li>
                <li><MoviesButton getList={getList}/></li>
                <li><ActorsButton getList={getList}/></li>
            </ul>
        </nav>
    )
}
