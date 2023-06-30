
import React, { useRef, useState } from "react";
import Link from "next/link";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import pin from "../../../public/pin.png"


export default function MyMap({ locations, marker, onClick, coordinates }) {
  const mapRef = useRef(null);
  
  const [viewport, setViewport] = useState({
    longitude: coordinates[0].longitude,
    latitude: coordinates[0].latitude,
    zoom: 13,
  });

  return (
    <div>
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
    </div>
  );
}




// import useSWR from "swr"

// export default function Map() {
//     const url= "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-122.2528,37.8761,9.09,0/300x200?access_token=pk.eyJ1IjoibGF5YS1hbSIsImEiOiJjbGppY3podDcwZTM5M2Rwd2ZzcjhncXlqIn0.UTrjgvRym9VScITGfCUAGw"

//     const { data: map, error, isLoading } = useSWR(url)
   
//     if (error) return <div>failed to load</div>
//     if (isLoading) return <div>loading...</div>
//     console.log(map);
//     return (
//       <div>
//       <h1>hi</h1>
//       {/* <img src={map} alt="" /> */}
//       </div>
//     )
//   }





// `https://maps.googleapis.com/maps/api/staticmap?center=${address},CA&zoom=14&size=400x400&key=AIzaSyA0J-N9HAX5-fuwJ9lLAHU3Hn8ziUvVckU&signature=YOUR_SIGNATURE`

// pk.eyJ1IjoibGF5YS1hbSIsImEiOiJjbGppZDRhcTQxMDBwM21vZWx6aDgxbjRpIn0.bahL5csUl2eOcv_d-BcFBA



// pages/index.js
// import {useEffect, useRef} from 'react';
// import {Loader} from '@googlemaps/js-api-loader';

// const loader = new Loader({
//     apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
//     version: 'weekly',
//   });

// function Map({ address }) {

//   const googlemap = useRef(null);
//   useEffect(() => {
//     loader.importLibrary("maps").then(({Map}) => {
//       new Map(googlemap.current, {
//         center: {lat: -34.397, lng: 150.644},
//         zoom: 15,
//       });
//     }).catch((err) =>{
//         console.log(err)
//     });
//   });
//   console.log(googlemap);
//   return (
//     <>
//     <div ref={googlemap} style={{width: '400px', height: '400 px'}} />
//     </>
//   );
// }
// export default Map;

// import { useEffect, useRef, useMemo } from "react";
// import { Loader } from "@googlemaps/js-api-loader";

// export default function Map({ address }) {
//     const mapRef = useRef(null);
//     const geocoder = useMemo(() => new google.maps.Geocoder(), []);
//     // console.log(google);
//     useEffect(() => {
//         const loader = new Loader({
//             apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
//             version: "weekly",
//             //   libraries: ['places']
//         });
//     loader.importLibrary().then(() => {
//             const google = window.google;
//     console.log(google);
//       geocoder.geocode({ address: address }, (results, status) => {
//         if (status === "OK") {
//           const map = new google.maps.Map(mapRef.current, {
//             center: results[0].geometry.location,
//             zoom: 8,
//           });
// const marker = new google.maps.Marker({
//             map: map,
//             position: results[0].geometry.location,
//           });
//         } else {
//           console.error(`Geocode was not successful for the following reason: ${status}`);
//         }
//       });
//     });
//   }, [address, geocoder]);
// return <div style={{ height: "400px" }} ref={mapRef} />;
// }