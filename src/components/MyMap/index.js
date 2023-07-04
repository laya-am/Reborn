
import React, { useRef, useState } from "react";
import Link from "next/link";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import pin from "../../../public/pin.png"
import styled from "styled-components";

const StyledDiv= styled.div`
  margin-left: auto;
  margin-right: auto;
`

export default function MyMap({ locations, marker, onClick, coordinates }) {
  const mapRef = useRef(null);
  
  const [viewport, setViewport] = useState({
    longitude: coordinates[0].longitude,
    latitude: coordinates[0].latitude,
    zoom: 13,
  });

  return (
    <StyledDiv>
      <Map
        initialViewState={{ ...viewport }}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        ref={(instance) => (mapRef.current = instance)}
        minZoom={-2}
        maxZoom={15}
        style={{ width: "70vw", height: "20vh" }}
        onClick={onClick}
        mapStyle="mapbox://styles/laya-am/cljiepcke001n01p74at2755e"
      >
        {locations &&
          locations.map(({ latitude, longitude, _id }) => (
            <Marker
              key={_id}
              longitude={longitude}
              latitude={latitude}
              anchor="bottom"
            >
              <Link href={`/places/${_id}`}>
                <Image src={pin} alt="marker" width={30} height={30} />
              </Link>
            </Marker>
          ))}{" "}
        {marker && <Marker {...marker} />}
      </Map>
    </StyledDiv>
  );
}