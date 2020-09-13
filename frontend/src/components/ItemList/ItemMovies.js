import React from 'react'

export default function ItemMovies({ item }) {
    let releaseDate = new Date(item.release_date)

    if (!item)
        return "no items"
    return (
        <>
            <div className="itemTitle"><span className="keyItem">{item.title}</span></div>
            <div className="itemContent"><span className="Name">Release Date:  </span><span className="keyItem">{releaseDate.toLocaleDateString()}</span></div>
        </>
    )
}
