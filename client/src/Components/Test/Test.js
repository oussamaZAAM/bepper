import React from 'react'
import './Test.css'
import Avatar from '@mui/material/Avatar';
import { Badge } from '@mui/material';
import { styled } from '@mui/material/styles';

const sideBorder = 2;
const clickedBorder = 4;
const unClickedBorder = 0;

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  }));

const Test = () => {
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
            <div className='settings-swapper row'>
                <div className='col-0 col-md-1 col-lg-2 col-xl-3'></div>
                <div 
                    className='flex-center settings-parameters col-6 col-md-5 col-lg-4 col-xl-3' 
                    style={{borderBottom: 'solid '+clickedBorder+'px black', 
                            borderRight: 'solid '+sideBorder+'px black'}}>
                    <b className='settings-labels'>Account Overview</b>
                </div>
                <div 
                    className='flex-center settings-parameters col-6 col-md-5 col-lg-4 col-xl-3' 
                    style={{borderBottom: 'solid '+unClickedBorder+'px black', 
                            borderLeft: 'solid '+sideBorder+'px black'}}>
                    <b className='settings-labels'>Change Password</b>
                </div>
                <div className='col-0 col-md-1 col-lg-2 col-xl-'></div>
            </div>
            <div className='account-overview row'>
                <div className='col-0 col-md-1 col-lg-2 col-xl-3'></div>
                <div className='flex-column-css col-12 col-md-10 col-lg-8 col-xl-6'>
                    <h3 style={{fontSize: '36px'}} className='title'>Account Overview</h3>
                    <div className='overview-profile'>
                        <h3 className='title'>Profile</h3>
                    </div>
                </div>
                <div className='col-0 col-md-1 col-lg-2 col-xl-3'></div>
            </div>
        </div>
    </div>
  )
}

export default Test