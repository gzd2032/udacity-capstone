import React, { useRef, useContext } from "react";
import ShowActors from "./ShowActors/ShowActors";
import "./Modal.css";
import { MainContext } from "../../App";

export default function ModalMovies({ item, deleteItem, updateItem }) {
  const movieForm = useRef();
  const PERMISSIONS = useContext(MainContext).PERMISSIONS;
  const itemDate = new Date(item.movies.release_date);
  const dateValue = itemDate.toISOString().substr(0, 10);

  function deleteMovie() {
    let type = Object.keys(item)[0];
    deleteItem(type, item.movies.id);
  }

  function updateMovie(e) {
    e.preventDefault();
    let type = Object.keys(item)[0];
    let form = movieForm.current;
    let bodyData = {
      title: form["title"].value,
      release_date: form["release_date"].value,
    };
    updateItem(bodyData, form["id"].value, type);
  }

  let deleteBtn, updateBtn;

  if (PERMISSIONS.includes("delete:movie")) {
    deleteBtn = (
      <button className="submitBtn delete" onClick={deleteMovie}>
        Delete
      </button>
    );
  }

  if (PERMISSIONS.includes("modify:movies")) {
    updateBtn = (
      <button className="submitBtn" type="submit">
        Update Movie
      </button>
    );
  }

  return (
    <div className="formDetails">
      <h1>Movie Details</h1>
      <form ref={movieForm} onSubmit={updateMovie}>
        <label>
          ID:{" "}
          <input
            style={{ width: "40px" }}
            type="number"
            required="required"
            name="id"
            defaultValue={item.movies.id}
            disabled
          ></input>
        </label>
        <label>
          Title:{" "}
          <input
            type="text"
            placeholder="Enter Title"
            required="required"
            name="title"
            defaultValue={item.movies.title}
          ></input>
        </label>
        <label>
          Release Date:{" "}
          <input
            type="date"
            required="required"
            name="release_date"
            placeholder="Enter Release Date"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) =>
              e.target.value === "" ? (e.target.type = "text") : null
            }
            defaultValue={dateValue}
          ></input>
        </label>
        <div className="modalButtons">
          {deleteBtn}
          {updateBtn}
        </div>
      </form>
      <div className="actorList">
        <ShowActors actors={item.movies} updateActor={updateItem} />
      </div>
    </div>
  );
}
