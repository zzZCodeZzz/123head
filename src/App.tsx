import React from 'react';
import './App.css';
import {AdminApp} from "./admin/AdminApp";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import {BrowserRouter} from "react-router-dom";
import {CssBaseline} from "@material-ui/core";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDP8503NgR8RWHfg8P_NWoyWOWhG3lo094",
    authDomain: "head-e7830.firebaseapp.com",
    projectId: "head-e7830",
    storageBucket: "head-e7830.appspot.com",
    messagingSenderId: "441274830217",
    appId: "1:441274830217:web:e5067ba035f91116ffa558"
};

firebase.initializeApp(firebaseConfig);

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <CssBaseline/>
                        <AdminApp/>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;
