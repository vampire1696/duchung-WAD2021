import React ,{useCallback,useContext,useEffect, useState}from 'react'
import '../css/MainScreen.css'
import Contact from './Contact';
import MapLef from './MapLef';
import axios from "axios";
import AppContext from './AppContext';
import {useHistory} from "react-router"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'


export default function MainScreen() {
    const {state,dispatch} = useContext(AppContext);
    const {contacts,user} = state;
    console.log(user.username);
    const history = useHistory();
    const [isshowmycontact,setIsShowMyContact] = useState(false);
    const [mapcontacts,setMapMyContact] = useState([]);
    const getAllContacts = useCallback(async ()=>{
        try {
            const option = {
                method: "get",
                url:"http://localhost:5000/contact",
            }
            const response = await axios(option);
            const contacts = response.data.contacts;
            setMapMyContact(contacts);
            dispatch({type:"Get_All_Contacts",payload:contacts})
            console.log(contacts); 
            console.log('hello');
        } catch (error) {
            console.log(error);
        }
    },[dispatch]);
    useEffect(()=>{
        getAllContacts()
    },[getAllContacts]);

    const defaultPosition = [52.5220, 13.4133];
    const defaultPosition2 = [52.5229, 13.4133];
    return (
        <div id="mainScreen" className="mainscreen">
                <div className="karte" id="karte">
                    
                    {
                        <MapContainer center={defaultPosition} zoom={13} scrollWheelZoom={true}>
                        <TileLayer
                          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {console.log('map'+mapcontacts)}
                        <Marker position={defaultPosition2}>
                          <Popup>
                             Hell33
                          </Popup>
                        </Marker>
                        
                        { (mapcontacts!==null) &&
                        mapcontacts.map((contact)=>{
                          //{[parseFloat(contact.lat), parseFloat(contact.long)]}
                          //{contact.firstName}
                          //{console.log([parseFloat(contact.lat), parseFloat(contact.long)])}
                          //[parseFloat(contact.lat), parseFloat(contact.long)]
                          <Marker position={[parseFloat(contact.lat), parseFloat(contact.long)]}>
                          <Popup>
                             {contact.firstName} {contact.lastName} / {contact.streetNumber} , {contact.zip}
                          </Popup>
                        </Marker>  
                        })}
                        
                      </MapContainer>
                      }
                    
                </div>
                <div className="hartcodiert" id="hartcodiert">
                    <div className="buttons">
                        <button name="showmycontact" onClick={()=>setIsShowMyContact(true)} >Show my contacts</button>
                        <button name="showallcontact" onClick={()=>setIsShowMyContact(false)}>Show all contacts</button>
                        <button name="addnewcontact" onClick={()=>{history.push('/contact')}} >Add new contacts</button>
                    </div>

                    
                    {isshowmycontact && (<div>
                        {contacts.filter((contact)=> contact.owerID===user.username).map((contact) => (
                            <Contact contact={contact} key={contact._id}/>
                        ))}
                    </div>)}
                    {!isshowmycontact && user.username==="admina" &&(
                        <div>
                        {contacts.map((contact) => (
                            <Contact contact={contact} key={contact._id}/>
                        ))}
                    </div>
                    ) }
                    {!isshowmycontact && user.username==="normalo" &&(
                        <div>
                        {contacts.filter((contact)=> contact.owerID==="normalo").map((contact) => (
                            <Contact contact={contact} key={contact._id}/>
                        ))}
                        {contacts.filter((contact)=> contact.owerID==="admina"&&contact.isPublic===true).map((contact) => (
                            <Contact contact={contact} key={contact._id}/>
                        ))}
                    </div>
                    ) }
                
                </div>
            </div>    
    )
}
