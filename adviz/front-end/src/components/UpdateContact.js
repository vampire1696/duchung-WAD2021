import React, { useContext, useState } from 'react'
import '../css/UpdateContact.css'
import {useHistory} from "react-router"
import AppContext from './AppContext';
import axios from 'axios';


export default function UpdateContact() {
    const history = useHistory();
    const {state,dispatch} = useContext(AppContext);
    const {contacts,user} = state;
    const contactUpdate = JSON.parse(localStorage.getItem("toEdit"));
   const [contactInput,setContactInput] = useState(contactUpdate); 
   const deleteHandle  = async (e) =>{
    console.log(onsubmit);
    try {
        e.preventDefault();
        const option = {
            method:"delete",
            url:`http://localhost:5000/contact/${contactUpdate._id}`, 
        };
        await axios(option);
        history.push("/main");
        dispatch({type:"Delete_One_Contact",payload:{_id:contactUpdate._id}});
        
    } catch (error) {
        console.log(error);
        //alert("Password/Username is not correct");
        //setErrorMessage('Username/Password is not correct');
    }
}   
const latlongHandle = async (contact) =>{
    try {
        //e.preventDefault();
        const option = {
            method:"get",
            url:`https://nominatim.openstreetmap.org/search?q=${contact.streetNumber}+${contact.zip}&format=json`,
        };
        const response = await axios(option);
        try {
            const latlong = response.data[0];
            setContactInput({...contact,lat:latlong.lat,long:latlong.lon});
            console.log(contact);
                
        } catch (error) {
            alert("falsche Adresse");    
        }
        
        //dispatch({type:"Update_One_Contact",payload:{...contact}});
        //return contact;
        
    } catch (error) {
        console.log(error);
        //alert("Password/Username is not correct");
        //setErrorMessage('Username/Password is not correct');
    }
}
   const onSubmitHandle = async (e) =>{
        latlongHandle(contactInput);
        if(contactInput.lat===""){
            e.preventDefault();
        }   
        try {
            e.preventDefault();
            const option = {
                method:"put",
                url:`http://localhost:5000/contact/${contactUpdate._id}`, 
                data:contactInput,
            };
            const response = await axios(option);
            
            history.push("/main");
            dispatch({type:"Update_One_Contact",payload:{...contactInput}});
            
        } catch (error) {
            console.log(error);
            //alert("Password/Username is not correct");
            //setErrorMessage('Username/Password is not correct');
        }
    }
    return (
        <div id="updatescreen" className="updatescreen">
                <section>
                    <form onSubmit={onSubmitHandle}>

                        <table>
                             <tr>
                             <td><label for="firstname">First name: </label></td>
                                 <td> <input type="text" id="firstName" name="firstName" placeholder="firstName" value={contactInput.firstName} required onChange={(e) =>{
        setContactInput({...contactInput,[e.target.name]:e.target.value});
    }}/></td>
                             </tr>  

                                    
                             <tr>
                                <td>  <label for="lastname">Last name: </label>  </td>
                                <td> <input type="text" id="lastName" name="lastName" placeholder="your last mame" required value={contactInput.lastName} onChange={(e) =>{
        setContactInput({...contactInput,[e.target.name]:e.target.value});
    }}/></td>

                             </tr>

                             <tr>
                                <td><label for="streetNumber">Street and number: </label></td>
                                <td><input type="text" id="adresse" name="streetNumber" placeholder="your adresse" required value={contactInput.streetNumber} onChange={(e) =>{
        setContactInput({...contactInput,[e.target.name]:e.target.value});
    }} /></td>
                            </tr>
                            
                            
                            <tr>
                                    <td><label for="zip">Zip: </label></td>
                                    <td><input type="text" id="zip" name="zip" required value={contactInput.zip} onChange={(e) =>{
        setContactInput({...contactInput,[e.target.name]:e.target.value});
    }}/></td>
                            </tr>
                            
                            <tr>
                                <td><label for="city">City: </label></td>
                                <td><input type="text" id="city" name="city" required value={contactInput.city} onChange={(e) =>{
        setContactInput({...contactInput,[e.target.name]:e.target.value});
    }}/></td>
                            </tr>
                            
                            <tr>
                                <td><label for="state">State: </label></td>
                                <td><input type="text" id="state" name="state" value={contactInput.state} onChange={(e) =>{
        setContactInput({...contactInput,[e.target.name]:e.target.value});
    }}/></td>
                            </tr>
                            
                            <tr>
                                <td><label for="country">Country: </label></td>
                                <td><input type="text" id="country" name="country" value={contactInput.country} onChange={(e) =>{
        setContactInput({...contactInput,[e.target.name]:e.target.value});
    }} /></td>
                            </tr>

                        </table>

                        <button id="isprivate" name="private" onClick={(e) =>{
                            try {
                                latlongHandle(contactInput);e.preventDefault(); 
                            } catch (error) {
                                alert("falsche Adresse");
                            }
                            
        
    }} > Check Adress </button>
                        
                        <input type="checkbox" id="ispublic" name="isPublic" checked={contactInput.isPublic} onChange={(e) =>{
        setContactInput({...contactInput,[e.target.name]:e.target.value});
    }}/>
                        <label for="isPublic"> Public</label><br/>
                        <label for="owner">Owner of new contact:</label>
                        <select name="owner" id="owner">
                            <option value="self" selected>self</option>
                            <option value="normalo">normalo</option>
                        </select>  
                        <button id="update" type="submit" >Update</button>
                        <button id="delete" type="delete" onClick={deleteHandle}>Delete</button>    
                    </form>
                    </section>
                
                <button onClick={()=> history.push('/main')}>Cancel</button>
                <br/> 

            </div> 
    )
}
