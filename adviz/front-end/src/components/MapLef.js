import axios from 'axios';
import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import '../css/MapLef.css'

export default function MapLef(contacts) {
    const defaultPosition = [52.5220, 13.4133];
    const dataMap = Array.from(contacts.contacts);
    console.log(dataMap);
    const Arraylatlong=[];
    //dataMap.map((contact)=>{latlongHandle(contact)})
    
    return (
      <MapContainer center={defaultPosition} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {dataMap.filter((contact)=>contact.lat!=="").map((contact)=>{
        //{[parseFloat(contact.lat), parseFloat(contact.long)]}
        //{contact.firstName}
        {console.log([parseFloat(contact.lat), parseFloat(contact.long)])}
        
        <Marker position={[parseFloat(contact.lat), parseFloat(contact.long)]}>
        <Popup>
           {contact.firstName} {contact.lastName} / {contact.streetNumber} , {contact.zip}
        </Popup>
      </Marker>  
      })}
      
    </MapContainer>
    )
}
