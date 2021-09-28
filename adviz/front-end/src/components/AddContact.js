import React, { useEffect ,useCallback, useContext, useState} from 'react'
import '../css/AddContact.css'
import axios from "axios";
import AppContext from './AppContext';
import {useHistory} from "react-router"

export default function AddContact() {
    const {state,dispatch} = useContext(AppContext);
    const {user} = state;
    const history = useHistory();
    const [contactInput,setContactInput] = useState({ firstName: "",lastName: "",streetNumber:"",zip:"",city:"",state:"",country:"",isPublic:false,lat:"",long:"",owerID:"normalo"});
   
    
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
                method:"post",
                url:"http://localhost:5000/contact",
                data:contactInput,
            };
            const response = await axios(option);
            console.log(response);
            history.push("/main");
            const {contact} = response.data;
            dispatch({type:"Create_One_Contact",payload:{...contact}});
            
        } catch (error) {
            console.log(error);
            //alert("Password/Username is not correct");
            //setErrorMessage('Username/Password is not correct');
        }
    }
    return (
        <div id="addcontact" className="addcontact">
                    <section>
                    <form onSubmit={onSubmitHandle}>

                        <table>
                             <tr>
                             <td><label for="firstname">First name: </label></td>
                                 <td> <input type="text" id="firstName" name="firstName" placeholder="firstName" required value={contactInput.firstName} onChange={(e) =>{
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
                                    
        
                                    setContactInput({...contactInput,[e.target.name]:e.target.value}
                                
            );
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
                        <button id="savebtn" type="submit">Save</button>
                        <button id="savebtn" onClick={()=> history.push('/main')}>Cancel</button>
                    </form>
                    </section>
                    
                    <br/> 

            </div> 
    )
}
