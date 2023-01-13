import axios from 'axios';
import React from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import ModifyProfile from '../Settings/ModifyProfile';
import styles from "./styles.module.css";


const CompleteLogin = () => { 
    const { REACT_APP_BASE_URL } = process.env;
    const [cookie, setCookie, removeCookie] = useCookies("token");
    const user = cookie.user;

    const navigate = useNavigate();
    const commitData = async (data) =>{
        await axios.put(REACT_APP_BASE_URL+'/api/users/'+user+'/completelogin', data);
        navigate('/');
    }
  return (
	<div className={styles.login_container}>
        <div className={styles.login_form_container}>
            <ModifyProfile completing={true} sendData={(data)=>commitData(data)}/>
        </div>
    </div>
  )
}

export default CompleteLogin