import React from "react";

export default function AddMovie() {
  return (
    <>
      <div className="inputContainer">
        <input
          type="text"
          title="Enter a Title"
          required="required"
          placeholder="Enter a Title"
          name="title"
        ></input>
        <input
          type="text"
          title="Enter a Release Date"
          placeholder="Release Date"
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) =>
            e.target.value === "" ? (e.target.type = "text") : null
          }
          required="required"
          name="release_date"
        ></input>
        <input className="submitBtn" type="submit" value="Add Movie" />
      </div>
    </>
  );
}
