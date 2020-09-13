import React, { useRef, useContext } from 'react'
import './Modal.css'
import { MainContext } from "../../App"

export default function ModalActors({ item, deleteItem, updateItem }) {
    const actorForm = useRef()
    const PERMISSIONS = useContext(MainContext).PERMISSIONS


    function deleteActor (e) {
        e.preventDefault()
        let type = Object.keys(item)[0]
        deleteItem(type, item.actors.id)
    }

    function updateActor (e) {
        e.preventDefault()
        let type = Object.keys(item)[0]
        let form = actorForm.current
        let bodyData = {
            'name': form["name"].value,
            'age': form["age"].value,
            'gender': form["gender"].value,
            'movie_id': item.actors.movie.id
        }
        updateItem( bodyData, item.actors.id, type)
    }
    
    let updateBtn, deleteBtn;
    if (PERMISSIONS.includes("delete:actor")) {
        deleteBtn = <button className="submitBtn delete" onClick={deleteActor}>Delete</button>
    }    

    if (PERMISSIONS.includes("modify:actors")) {
        updateBtn = <button className="submitBtn" type="submit">Update Actor</button>
    } 

    return (
        <div className="formDetails">
            <form ref={actorForm} onSubmit={updateActor}>
            <label>ID: <input style={{width: "40px"}} type='number' required="required" name='id' defaultValue={item.actors.id} disabled></input></label>
            <label>Name: <input type='text' required="required" name='name' defaultValue={item.actors.name}></input></label>
            <label>Age: <input type='number' required="required" name='age' defaultValue={item.actors.age}></input></label>
            <label>
                <input type="radio" value="male" defaultChecked={item.actors.gender === "male"} name="gender"/> Male
                <input type="radio" value="female" defaultChecked={item.actors.gender === "female"} name="gender"/> Female
            </label>
            <p>Movie: {item.actors.movie.title} </p>
            <div className="modalButtons">
                {deleteBtn}
                {updateBtn}
            </div>            
            </form>
        </div>
    )
}
