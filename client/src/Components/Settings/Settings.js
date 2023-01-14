import React, { useState } from 'react'

import Avatar from '@mui/material/Avatar';
import { Badge } from '@mui/material';
import { styled } from '@mui/material/styles';

//Components
import AccountOverview from '../Settings/AccountOverview';
import ModifyProfile from '../Settings/ModifyProfile';
import ChangePassword from '../Settings/ChangePassword';
//Styles
import './Settings.css'

const sideBorder = 2;
const clickedBorder = 4;

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  }));

const Settings = () => {
    const [swapper, setSwapper] = useState('overview');
  return (
    <div className='dashboard'>
        <div className='avatar-container'>
            <Avatar
                alt="Username"
                className="avatar"
                src={require('../../Logos/border logo/border-red.png')}
                sx={{ width: 75, height: 75 }}
            />
            <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                <SmallAvatar alt="Remy Sharp" src={require('../../Logos/border logo/border-red.png')} />
                }
            >
                <Avatar alt="Travis Howard" src={require('../../Logos/border logo/border-green.png')} />
            </Badge>
        </div>
        <div className='settings'>
            {/* Settings Swapper */}
            <div className='settings-swapper row'>
                <div className='col-0 col-md-1 col-lg-2 col-xl-3'></div>
                <div className='flex-center col-12 col-md-10 col-lg-8 col-xl-6 row settings-swapper-wrapper'>
                    <div 
                        className='flex-center settings-parameters col-4 col-md-4 col-lg-4 col-xl-4'
                        style={{borderBottom: 'solid '+(swapper==='overview' ? clickedBorder : '0')+'px black', 
                                borderRight: 'solid '+((swapper==='overview'||'profile') ? sideBorder : '0')+'px black',
                                backgroundColor: swapper==='overview' && 'rgba(93, 175, 47, 1)'}}
                                onClick={()=>setSwapper('overview')}
                                >
                        <b className='settings-labels'>Account Overview</b>
                    </div>
                    <div 
                        className='flex-center settings-parameters col-4 col-md-4 col-lg-4 col-xl-4'
                        style={{borderBottom: 'solid '+(swapper==='profile' ? clickedBorder : '0')+'px black', 
                                borderLeft: 'solid '+((swapper==='overview'||'profile') ? sideBorder : '0')+'px black',
                                borderRight: 'solid '+((swapper==='profile'||'password') ? sideBorder : '0')+'px black',
                                backgroundColor: swapper==='profile' && 'rgba(93, 175, 47, 1)'}}
                                onClick={()=>setSwapper('profile')}
                                >
                        <b className='settings-labels'>Modify Profile</b>
                    </div>
                    <div 
                        className='flex-center settings-parameters col-4 col-md-4 col-lg-4 col-xl-4'
                        style={{borderBottom: 'solid '+(swapper==='password' ? clickedBorder : '0')+'px black', 
                                borderLeft: 'solid '+((swapper==='profile'||'password') ? sideBorder : '0')+'px black',
                                backgroundColor: swapper==='password' && 'rgba(93, 175, 47, 1)'}}
                                onClick={()=>setSwapper('password')}
                                >
                        <b className='settings-labels'>Change Password</b>
                    </div>
                </div>
                <div className='col-0 col-md-1 col-lg-2 col-xl-3'></div>
            </div>

            {/* Account Overview */}
            {swapper === 'overview' && <AccountOverview />}

            {/* Modify Profile */}
            {swapper === 'profile' && <ModifyProfile />}

            {/* Change Password */}
            {swapper === 'password' && <ChangePassword />}

        </div>
    </div>
  )
}

export default Settings

