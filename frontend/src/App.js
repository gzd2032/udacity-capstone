import React, { useState, useEffect } from "react";
import "./App.css";
import DisplayProfile from "./components/DisplayProfile/DisplayProfile";
import AddItems from "./components/AddItems/AddItems";
import ItemList from "./components/ItemList/ItemList";
import Toolbar from "./components/Toolbar/Toolbar";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Backdrop from "./components/Backdrop/Backdrop";
import decode from "jwt-decode";
import { useAuth0 } from "@auth0/auth0-react";

export const MainContext = React.createContext();

function App() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [items, setItems] = useState([]);
  const [sideDrawerOpen, setsideDrawerOpen] = useState(false);
  const [listType, setlistType] = useState();
  const [permissions, setPermissions] = useState([]);
  const [messageArea, setMessageArea] = useState();

  const API_BACKEND_URL = process.env.REACT_APP_API_BACKEND_URL;

  const drawerToggleClickHandler = () => {
    setsideDrawerOpen((prevState) => {
      return { SideDrawerOpen: !prevState.SideDrawerOpen };
    });
  };

  const backdropClickHander = () => {
    setsideDrawerOpen(false);
  };

  useEffect(() => {
    const getuserToken = async () => {
      try {
        const jwt = await getAccessTokenSilently();
        const permissions = decode(jwt)["permissions"];
        setPermissions(permissions);
        getList("movies");
      } catch (e) {
        console.log(e.message);
      }
    };

    if (isAuthenticated) getuserToken();
  }, [isAuthenticated]);

  async function getList(listType) {
    if (isAuthenticated) {
      try {
        setItems([]);
        setMessageArea("loading items...");
        const jwt = await getAccessTokenSilently();
        const userDetailsByIdUrl = `${API_BACKEND_URL}/${listType}`;

        await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              setMessageArea(null);
              setlistType(listType);
              setItems(data[listType]);
              setsideDrawerOpen(false);
            } else {
              setMessageArea(data.message);
              setsideDrawerOpen(false);

            }

          });
      } catch (e) {
        console.log(e.message);
      }
    }
  }

  let backdrop, showAddItemsSection, loadingMessage;

  if (sideDrawerOpen) {
    backdrop = <Backdrop closeDrawer={backdropClickHander} />;
  }

  if (permissions.includes("add:movie")) {
    showAddItemsSection = (
      <AddItems setItems={setItems} setlistType={setlistType} />
    );
  }

  if (messageArea) {
    loadingMessage = <p className="loading">{messageArea}</p>;
  }

  return (
    <MainContext.Provider
      value={{ BACKEND_URL: API_BACKEND_URL, PERMISSIONS: permissions }}
    >
      <div style={{ height: "100%" }}>
        <Toolbar toggle={drawerToggleClickHandler} getList={getList} />
        <SideDrawer showDrawer={sideDrawerOpen} getList={getList} />
        {backdrop}
        <main>
          {!isAuthenticated && "Please Login to Begin"}
          <div className="mainContent">
            <div className="topRow">
              {isAuthenticated && <DisplayProfile />}
              {showAddItemsSection}
            </div>
            <div>
              {loadingMessage}
              {isAuthenticated && !messageArea && listType && (
                <ItemList
                  items={items}
                  listType={listType}
                  setlistType={setlistType}
                  setItems={setItems}
                  permissions={permissions}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </MainContext.Provider>
  );
}

export default App;
