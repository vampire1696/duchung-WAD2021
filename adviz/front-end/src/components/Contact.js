import React, { useContext, useState } from 'react'
import  '../css/Contact.css'
import axios from 'axios'
import AppContext from './AppContext'
import {useHistory} from "react-router"
import UpdateContact from './UpdateContact'

export default function Contact({contact}) {
    const {dispatch} = useContext(AppContext);
    const [contactToEdit,setContactToEdit] = useState(contact);
    const history=useHistory();
    const [openUpdateScreen,setOpenUpdateScreen] = useState(false);
    return (
        <div className="rechtecke" onClick={()=>setOpenUpdateScreen(true)}>
            {contact.firstName} {contact.lastName}
        
        {openUpdateScreen && history.push('/update')}
        {openUpdateScreen && localStorage.setItem("toEdit",JSON.stringify(contact))}
        
        </div>    

    )
}
