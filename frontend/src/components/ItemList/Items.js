import React from 'react'
import './Items.css'
import ItemMovies from './ItemMovies'
import ItemActors from './ItemActors'
import ShowModalButton from '../Modal/ShowModalButton'

export default function Item({item, listType, setlistType, setItems, permissions}) {
   
    let itemDetails, showDetailsButton
    if (listType === 'movies')
        itemDetails = <ItemMovies item={item} />
    else if (listType === 'actors')
        itemDetails = <ItemActors item={item} />
    
    if (permissions.includes("modify:actors")) {
        showDetailsButton = <ShowModalButton item={item} listType={listType} setlistType={setlistType} setItems={setItems} permissions={permissions}/>
    }

    return (
        <div className="itemContainer">
            {itemDetails}
            {showDetailsButton}
        </div>
    )
}


