import React, { Fragment, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const StoresLocation = () => {
  const { user } = useSelector((state) => state.auth);

  const defaultCenter = {
    lat: 19.36795025545172,
    lng: -99.15054583829414,
  };

  const [stores, setStores] = useState([]);

  const [center, setCenter] = useState(defaultCenter);

  const loadStores = async () => {
    await fetch("http://localhost:5000/api/stores")
      .then((response) => response.json())
      .then((data) => {
        setStores(data.stores);
      });
  };

  useEffect(() => {
    loadStores();
  }, []);

  const [activeItem, setActiveItem] = useState("");
  const handleOnClick = (key, place) => {
    // Conditional to handle current location card
    if (key === activeItem) {
      // click on the same active pin
      setActiveItem("");
    } else {
      setActiveItem(key);
    }
    let location = place.split(" ");
    setCenter({
      lat: parseFloat(location[0]),
      lng: parseFloat(location[1]),
    });
  };

  return (
    <Fragment>
      <div style={{ height: "80vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyDT0y7nhH7yP4GzV0c-v0Ldtqi7cr6Txb8",
            language: "en",
            region: "US",
          }}
          defaultCenter={defaultCenter}
          center={center}
          defaultZoom={13}
        >
          {stores.map((store) => {
            const location = store.location.split(" ");
            return (
              <div
                key={store._id}
                style={{
                  position: "relative",
                  width: "30px",
                  height: "50px",
                  background:
                    'url("/assets/images/map_pin.png") no-repeat center center',
                  backgroundSize: "contain",
                }}
                lat={parseFloat(location[0])}
                lng={parseFloat(location[1])}
                onClick={() => {
                  handleOnClick(store._id, store.location);
                }}
              >
                {store._id === activeItem && (
                  <Card
                    style={{
                      width: "10rem",
                      backgroundColor: "white",
                      bottom: "50px",
                      position: "absolute",
                      left: "-4.2rem",
                    }}
                  >
                    <Card.Body>
                      <Card.Subtitle>{store.name}</Card.Subtitle>
                      <Card.Text
                        style={{
                          margin: 0,
                        }}
                      >
                        {store.address}
                      </Card.Text>
                      <Card.Text
                        style={{
                          margin: 0,
                        }}
                      >
                        {store.phone}
                      </Card.Text>
                      <Card.Text
                        style={{
                          margin: 0,
                        }}
                      >
                        {store.email}
                      </Card.Text>
                      {user ? (
                        <Button
                          variant="primary"
                          size="sm"
                          href={`/reservations?storeId=${store._id}`}
                        >
                          Reserve now
                        </Button>
                      ) : (
                        <Button variant="primary" size="sm" href="/login">
                          Login
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                )}
              </div>
            );
          })}
        </GoogleMapReact>
      </div>
    </Fragment>
  );
};

export default StoresLocation;
