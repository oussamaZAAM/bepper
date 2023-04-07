import React, { useState } from 'react'
import { useCookies } from 'react-cookie';

import { Box, Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import './Settings.css'
import axios from 'axios';

const ChangePassword = (props) => {
    const REACT_APP_BASE_URL = "https://bepper.cyclic.app";

    //Fetch User's Token
    const [cookie, setCookie, removeCookie] = useCookies("token");
    const userId = cookie.user;

    //Set Valid-Error Message
    const [valid, setValid] = useState("");
    const [error, setError] = useState("");

    const [current, setCurrent] = useState({
        password: '',
        showPassword: false,
      });
    const [newOne, setNewOne] = useState({
        password: '',
        showPassword: false,
      });
    const [verify, setVerify] = useState({
        password: '',
        showPassword: false,
      });

    const handleChange = (arg, event) => {
    switch (arg) {
        case 'current':
            setCurrent({ ...current, password: event.target.value });
            break;
        case 'newOne':
            setNewOne({ ...newOne, password: event.target.value });
            break;
        case 'verify':
            setVerify({ ...verify, password: event.target.value });
            break;
    }
    };
    
    const handleClickShowPassword = (arg) => {
    switch (arg) {
        case 'current':
            setCurrent({...current, showPassword: !current.showPassword});
            break;
        case 'newOne':
            setNewOne({...newOne, showPassword: !newOne.showPassword});
            break;
        case 'verify':
            setVerify({...verify, showPassword: !verify.showPassword});
            break;
    }
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (newOne.password === verify.password) {
            try{
                const data = {
                    current: current.password,
                    newOne: newOne.password,
                    verify: verify.password,
                    userId: userId
                }
                const res = await axios.put(REACT_APP_BASE_URL+'/api/auth/change-password', data);
                setValid(res.data);
                setError('');
            } catch (error) {
                if (
                    error.response &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                ) {
                    setValid('');
                    setError(error.response.data.message);
                }
            }
        } else {
            alert('Passwords do not match!');
        }
    }
  return (
    <div className='w-100 row m-0'>
        <div className='col-0 col-md-1 col-lg-2 col-xl-3'></div>
        <div className='flex-column-css col-12 col-md-10 col-lg-8 col-xl-6'>
            <h3 style={{fontSize: '36px'}} className='title'>Change Password</h3>
            <Box
                className='flex-column-css w-100 px-3'
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <FormControl sx={{ m: 1, width: '100%' }} variant="filled">
                    <InputLabel htmlFor="filled-adornment-password">Current Password</InputLabel>
                    <FilledInput
                        className='w-100'
                        required
                        id="filled-adornment-password1"
                        type={current.showPassword ? 'text' : 'password'}
                        value={current.password}
                        onChange={(e)=>handleChange('current', e)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={()=>handleClickShowPassword('current')}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {current.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '100%' }} variant="filled">
                    <InputLabel htmlFor="filled-adornment-password">New Password</InputLabel>
                    <FilledInput
                        className='w-100'
                        required
                        id="filled-adornment-password2"
                        type={newOne.showPassword ? 'text' : 'password'}
                        value={newOne.password}
                        onChange={(e)=>handleChange('newOne', e)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={()=>handleClickShowPassword('newOne')}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {newOne.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '100%' }} variant="filled">
                    <InputLabel htmlFor="filled-adornment-password">Verify New Password</InputLabel>
                    <FilledInput
                        className='w-100'
                        required
                        id="filled-adornment-password3"
                        type={verify.showPassword ? 'text' : 'password'}
                        value={verify.password}
                        onChange={(e)=>handleChange('verify', e)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={()=>handleClickShowPassword('verify')}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {verify.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <div className='flex-center'>{valid && <div className='valid_msg'>{valid}</div>}</div>
                <div className='flex-center'>{error && <div className='error_msg'>{error}</div>}</div>
                <div className="settings-buttons flex-center">
                    <Button className='cancel-btn' onClick={props.handleCancel}>Cancel</Button>
                    <div className='flex-center password-wrapper'>
                        <Button className='password-btn' type='submit'>Define a New Password</Button>
                    </div>
                </div>
            </Box>
        </div>
        <div className='col-0 col-md-1 col-lg-2 col-xl-3'></div>
    </div>
  )
}

export default ChangePassword