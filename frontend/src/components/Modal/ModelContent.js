import React from 'react'
import ModalActors from './ModalActors'
import ModalMovies from './ModalMovies'

export default function ModelContent({ itemDetails, deleteItem, updateItem }) {
    let listType = Object.keys(itemDetails)[0]
    
    let content

    if (listType === "movies")
        content = <ModalMovies item={itemDetails} deleteItem={deleteItem} updateItem={updateItem}/>
    else if (listType === "actors")
        content = <ModalActors item={itemDetails} deleteItem={deleteItem} updateItem={updateItem}/>

    return (
        <div className="formDetails">
           {content} 
        </div>
    )
}
