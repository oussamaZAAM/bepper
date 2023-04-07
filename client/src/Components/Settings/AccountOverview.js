import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import dayjs from 'dayjs';

import { Skeleton } from '@mui/material';

import './Settings.css';

const AccountOverview = () => {
    const REACT_APP_BASE_URL = "https://bepper.cyclic.app";

    const [infos, setInfos] = useState({username: '', email: '', gender: '', birthday: dayjs(''), region: ''});

    //Fetch User's Token
    const [cookie] = useCookies("token");
    const userId = cookie.user;

    //Fetch User's data
    useEffect(() =>{
        const fetchUser = async () => {
          const res = await axios.get(REACT_APP_BASE_URL+'/api/users/'+userId);
          setInfos({
              ...infos, 
              username: res.data.username,
              email: res.data.email,
              gender: res.data.gender,
              birthday: res.data.birthday,
              region: res.data.region,
          })
        }
        fetchUser(userId);
      }, []);
  return (
    /* Account Overview */
    <div className='account-overview row'>
        <div className='col-0 col-md-1 col-lg-2 col-xl-3'></div>
        <div className='flex-column-css col-12 col-md-10 col-lg-8 col-xl-6'>
            <h3 style={{fontSize: '36px'}} className='title'>Account Overview</h3>
            <div className='overview-profile'>
                <h3 className='title'>Profile</h3>
            </div>
            <div className='overview-settings flex-center'>
                <small className='w-50'>Username</small>
                <b className='w-50'>{infos.username ? infos.username : <Skeleton animation="wave" />} </b>
            </div>
            <hr />
            <div className='overview-settings flex-center'>
                <small className='w-50'>Email Adress</small>
                <b className='w-50'>{infos.email ? infos.email : <Skeleton animation="wave" />}</b>
            </div>
            <hr />
            <div className='overview-settings flex-center'>
                <small className='w-50'>Gender</small>
                <b className='w-50'>{infos.gender ? (infos.gender==='none' ? "You didn't Told Us" : infos.gender) : <Skeleton animation="wave" />}</b>
            </div>
            <hr />
            <div className='overview-settings flex-center'>
                <small className='w-50'>Date of Birth</small>
                <b className='w-50'>{infos.birthday ? infos.birthday.toString().substring(0, 10) : <Skeleton animation="wave" />}</b>
            </div>
            <hr />
            <div className='overview-settings flex-center'>
                <small className='w-50'>Country or Region</small>
                <b className='w-50'>{infos.region ? infos.region.label : <Skeleton animation="wave" />}</b>
            </div>
        </div>
        <div className='col-0 col-md-1 col-lg-2 col-xl-3'></div>
    </div>
  )
}

export default AccountOverview