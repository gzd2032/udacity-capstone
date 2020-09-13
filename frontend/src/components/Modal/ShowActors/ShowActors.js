import React, { useState, useRef, useContext } from "react";
import Actor from "./Actor";
import { useAuth0 } from "@auth0/auth0-react";
import { MainContext } from "../../../App";

export default function ShowActors({ actors }) {
  const [actorsList, setActorsList] = useState(actors.actors);
  const actorForm = useRef();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const childContext = useContext(MainContext);
  const PERMISSIONS = childContext.PERMISSIONS;
  const API_BACKEND_URL = childContext.BACKEND_URL;

  const addItem = async (e) => {
    e.preventDefault();
    const form = actorForm.current;
    let bodyData = {
      name: form["name"].value,
      age: form["age"].value,
      gender: form["gender"].value,
    };
    if (isAuthenticated) {
      try {
        const accessToken = await getAccessTokenSilently();
        const res = await fetch(`${API_BACKEND_URL}/actors/${actors.id}/movie`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        });

        const resData = await res.json();

        if (resData.success) {
          let updatedList = resData.actors;
          form["name"].value = "";
          form["age"].value = "";
          setActorsList(updatedList);
        }
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  const deleteActorFromMovie = async (type, id) => {
    if (isAuthenticated) {
      try {
        const accessToken = await getAccessTokenSilently();
        const res = await fetch(`${API_BACKEND_URL}/${type}/${id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        const resData = await res.json();
        if (resData.success) {
          setActorsList((prevState) => {
            const newlist = prevState.filter((item) => item.id !== id);
            return newlist;
          });
        }
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  let addActorInfo;
  if (PERMISSIONS.includes("add:actor")) {
    addActorInfo = (
      <>
        <h3>Actors in the Movie</h3>
        <form ref={actorForm} onSubmit={addItem} className="actorForm">
          <div className="nameColumn">
            <input
              type="text"
              placeholder="Enter Name"
              required="required"
              name="name"
            ></input>
          </div>
          <div>
            <input
              style={{ width: "200px" }}
              type="text"
              title="Enter Age"
              placeholder="Enter Age"
              onFocus={(e) => (e.target.type = "number")}
              onBlur={(e) => {
                if (e.target.value === null) e.target.type = "text";
              }}
              required="required"
              name="age"
            ></input>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="male"
                required="required"
                defaultChecked
                name="gender"
              />{" "}
              Male
              <input
                type="radio"
                value="female"
                required="required"
                name="gender"
              />{" "}
              Female
            </label>
          </div>
          <div className="modalButtons">
            <button className="submitBtn" type="submit">
              Add
            </button>
          </div>
        </form>
      </>
    );
  }

  return (
    <div>
      {addActorInfo}
      {actorsList.map((actor) => {
        return (
          <Actor
            key={actor.id}
            actor={actor}
            deleteActorFromMovie={deleteActorFromMovie}
          />
        );
      })}
    </div>
  );
}
