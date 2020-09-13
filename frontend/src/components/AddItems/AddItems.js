import React, { useRef, useContext } from "react";
import "./AddItems.css";
import { useAuth0 } from "@auth0/auth0-react";
import AddMovie from "./AddMovie";
import { MainContext } from "../../App"

export default function AddItems({ setItems, setlistType }) {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const movieForm = useRef();
  const API_BACKEND_URL = useContext(MainContext).BACKEND_URL

  const addNewItem = (listType) => async (e) => {
    e.preventDefault();
    let form,
      formData = {};
    if (listType === "movies") {
      form = movieForm.current;
      formData = {
        title: form["title"].value,
        release_date: form["release_date"].value,
      };
    }

    if (isAuthenticated) {
      try {
        const accessToken = await getAccessTokenSilently();
        const res = await fetch(`${API_BACKEND_URL}/${listType}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const resData = await res.json();
        if (resData.success) {
          setlistType(listType);
          setItems(resData[listType]);
        }
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  return (
    <>
          <form
            ref={movieForm}
            onSubmit={addNewItem("movies")}
            className="inputForm"
          >
            <AddMovie />
          </form>
    </>
  );
}
