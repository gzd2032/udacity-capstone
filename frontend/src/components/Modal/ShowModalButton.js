import React, { useState, useContext } from "react";
import Modal from "./Modal";
import { useAuth0 } from "@auth0/auth0-react";
import { MainContext } from "../../App"

export default function ShowModalButton({
  item,
  listType,
  setlistType,
  setItems
}) {
  const [ itemDetails , setItemDetails ] = useState({})
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const API_BACKEND_URL = useContext(MainContext).BACKEND_URL


  const getItemDetails = async (listType) => {
    if (isAuthenticated) {
      try {
        const jwt = await getAccessTokenSilently();
        const userDetailsByIdUrl = `${API_BACKEND_URL}/${listType}/${item.id}`;

        await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setItemDetails(data);
          });
      } catch (e) {
        console.log(e.message);
      }
    }

    setIsOpen(true);
  };


  const deleteItem = async (type, id) => {
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
            setIsOpen(false)
            setlistType(type);
          setItems((prevState) => {
            let newlist = prevState.filter((item) => item.id !== id);
            return newlist;
          });
        }
      } catch (e) {
        console.log(e.message);
      }
    }
  }

  const updateItem = async (bodyData, itemId, type) => {
    if (isAuthenticated) {
      try {
        const accessToken = await getAccessTokenSilently();
        const res = await fetch(`${API_BACKEND_URL}/${type}/${itemId}`, {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        });

        const resData = await res.json();

        if (resData.success) {
          let updatedItem = resData[listType];
          setIsOpen(false)
          setlistType(type);
          setItems((prevState) => {
            let updatedItems = prevState.map((item) => {
              if (item.id === updatedItem.id) {
                return updatedItem;
              }
              return item;
            });
            return updatedItems;
          });
        }
      } catch (e) {
        console.log(e.message);
      }
    }
  }

  return (
    <>
      <button onClick={() => getItemDetails(listType)}>Details</button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        updateItem={updateItem}
        deleteItem={deleteItem}
        itemDetails={itemDetails}
        listType={listType}
        setlistType={setlistType}
        setItems={setItems}
      />
    </>
  );
}
