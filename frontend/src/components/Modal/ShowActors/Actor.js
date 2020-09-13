import React, { useContext } from "react";
import './ShowActors.css';
import { MainContext } from '../../../App'

export default function AddActor({actor, deleteActorFromMovie}) {
  const PERMISSIONS = useContext(MainContext).PERMISSIONS;

  let deleteActorBtn, getActorInfo;
  if (PERMISSIONS.includes("delete:actor")) {
    deleteActorBtn = (
      <button className="submitBtn deleteSmall" onClick={() => deleteActorFromMovie('actors', actor.id)}>X</button>
    );
  }

  if (PERMISSIONS.includes("get:actors")) {
    getActorInfo = (
      <>
        <div className="actorId">ID: {actor.id} </div>
        <div className="actorName">{actor.name}</div>
        <div>Age: {actor.age}</div>
        <div>{actor.gender}</div>
      </>
    );
  }

  return (
    <div className="listActors">
        {deleteActorBtn}
        {getActorInfo}
    </div>
  )
}
