import React,{useContext, useState} from 'react'
import axios from 'axios'
import AppContext from './AppContext.js'
import {useHistory} from "react-router"

export default function Login() {
    const {dispatch} = useContext(AppContext);
    const [userInput,setUserInput] = useState({ username: "",password: ""});
    const [errorMessage,setErrorMessage] = useState(null);
    const history = useHistory();
    const onChangeHandle = async (e) =>{
        setUserInput({...userInput,[e.target.name]:e.target.value});
    }
    const onSubmitHandle = async (e) =>{
        try {
            e.preventDefault();
            const option = {
                method:"post",
                url:"http://localhost:5000/login",
                data:userInput,
            };
            const response = await axios(option);
            console.log(response);
            const {username} = response.data.user;
            dispatch({type:"Current_User",payload:{username}});
            history.push("/main");
        } catch (error) {
            console.log(error);
            //alert("Password/Username is not correct");
            //setErrorMessage('Username/Password is not correct');
        }
    }
    return (
        <div id="login" class="login">
                <section>
                <form onSubmit={onSubmitHandle}>
                    <h2>Enter your Accout</h2>
                    
                    <input type="text" id="Name" name="username" placeholder="Name" required value={userInput.username} onChange={onChangeHandle}/>
                    <br />
                    
                    <input type="password" name="password" id="password" placeholder="Password" value={userInput.password} onChange={onChangeHandle}/>
                    <br/>
                    <button type="submit"> Submit </button>
                </form>
                </section>
                
        </div>
    )
}
