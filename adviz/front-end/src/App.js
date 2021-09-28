import AddContact from "./components/AddContact";
import Login from "./components/Login";
import MainScreen from "./components/MainScreen";
import Navi from "./components/Navi";
import UpdateContact from "./components/UpdateContact";
import './css/Content.css';
import './css/Showscreen.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import AppReducer from './reducers/AppReducer';
import {useReducer} from "react";

import AppContext from "./components/AppContext";



function App() {
  const initialState = {user:null,contacts:[]};
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <Router>
      <AppContext.Provider value={{state,dispatch}}>
      <div className="App">
        <Navi/>
        <div className="contend">
            <div className="showscreen">
              <Switch>
                <Route exact path='/'>
                  <Login/>
                </Route>
                <Route exact path='/login'>
                  <Login/>
                </Route>

                <Route exact path='/main'>
                    <MainScreen/>
                </Route>

              

                <Route exact path='/contact'>
                    <AddContact/>
                </Route>
                <Route exact path='/update'>
                    <UpdateContact/>
                </Route>


              
              </Switch>
              
            </div> 
        </div>
      </div>
      </AppContext.Provider>
    </Router>
  );
}

export default App;
