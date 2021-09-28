import React,{useContext} from 'react'
import AppContext from './AppContext'
import '../css/Navi.css'
import {useHistory} from "react-router"

export default function Navi() {
    const {state,dispatch} = useContext(AppContext);
    const {user} =state;
    const history = useHistory();
    const signout = ()=>{
        history.push('/login');
        if(user)
        dispatch({type:'Current_User',payload:null});
        
    }
    return (
        <nav id="navi">
        {user ? (
            <>
        <h1 id="welcome">{user.username}</h1>
        
        <button onClick={()=>signout()}>Logout</button>
        </>) : (<>
        <h1 id="welcome">Welcome</h1>
        
        <button onClick={()=>signout()}>Logout</button>
        </>)}
        
        
        </nav>
    )
}
