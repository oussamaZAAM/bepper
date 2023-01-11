import React from 'react';
import './Settings.css';

const AccountOverview = () => {
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
                <b className='w-50'>KaikiMAX</b>
            </div>
            <hr />
            <div className='overview-settings flex-center'>
                <small className='w-50'>Email Adress</small>
                <b className='w-50'>oussamazaam449@gmail.com</b>
            </div>
            <hr />
            <div className='overview-settings flex-center'>
                <small className='w-50'>Gender</small>
                <b className='w-50'>Male</b>
            </div>
            <hr />
            <div className='overview-settings flex-center'>
                <small className='w-50'>Date of Birth</small>
                <b className='w-50'>01-01-2000</b>
            </div>
            <hr />
            <div className='overview-settings flex-center'>
                <small className='w-50'>Country or Region</small>
                <b className='w-50'>Morocco</b>
            </div>
        </div>
        <div className='col-0 col-md-1 col-lg-2 col-xl-3'></div>
    </div>
  )
}

export default AccountOverview