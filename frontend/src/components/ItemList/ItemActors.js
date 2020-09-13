import React from 'react'

export default function ItemActors({ item }) {
    if (!item)
        return "no items"    
    return (
        <>
            <p> Movie:  {item.movie}</p>
            <div className="itemTitle"><span className="Item">{item.name}</span></div>
        </>
    )
}
