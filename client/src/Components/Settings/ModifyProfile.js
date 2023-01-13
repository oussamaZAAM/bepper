import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

import { Autocomplete, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { inputLabelClasses } from "@mui/material/InputLabel";

import countries from './Countries';
import dayjs from 'dayjs';
// import './Settings.css';

const ModifyProfile = (props) => {
    const [infos, setInfos] = useState({username: '', email: (props.completing ? 'filler' : ''), gender: '', date: dayjs(''), region: ''});
    const [gender, setGender] = useState('');
    const [date, setDate] = useState(dayjs(''));
    const [region, setRegion] = useState();

    //Check Form Validity even though using preventDefault
    // document.getElementByCl('myForm').checkValidity();

    const handleChange = (event) => {
        setInfos({...infos, [event.target.name]: event.target.value});
    }
    
    const handleChangeGender = (event) => {
        setGender(event.target.value);
        setInfos({...infos, gender: event.target.value});
    };
    
    const handleChangeDate = (newValue) => {
        setDate(newValue);
        setInfos({...infos, date: newValue});
    };

    const handleChangeRegion = (event, newValue) => {
        setRegion(newValue);
        setInfos({...infos, region: newValue});
    };

    const today = dayjs(new Date());

    const handleSubmit = (event) => {
        event.preventDefault();
        var birthYear = dayjs(infos.date).get('year');
        if (today.diff(dayjs(infos.date), 'year') >= 18){
            if (birthYear >= 1900 && Object.keys(infos).every(x=>infos[x] !== '') && Object.keys(infos).every(x=>infos[x] !== null)){
                //Send data to Parent
                props.sendData(infos)
            }
        } else {
            alert('You should be over 18 to use this application!');
        }
    }
  return (
    /* Modify Profile */
    <div className='modify-profile row'>
        <div className='col-0 col-md-1 col-lg-2 col-xl-3'></div>
        <div className='flex-column-css col-12 col-md-10 col-lg-8 col-xl-6'>
            <h3 style={{fontSize: '36px'}} className='title'>{props.completing ? 'Complete Profile' : 'Modify Profile'}</h3>
            <Box
                className='myForm flex-column-css w-100 px-3'
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <TextField
                    className='w-100 my-3'
                    required
                    onChange={handleChange}
                    value={infos.username}
                    name='username'
                    type='text'
                    label="Username"
                    variant="filled"
                    InputLabelProps={{
                        sx: {
                          [`&.${inputLabelClasses.shrink}`]: {
                            color: "rgba(93,175,47,255)"
                          }
                        }
                      }}
                />
                {!props.completing && 
                <TextField
                    className='w-100 my-3'
                    required
                    onChange={handleChange}
                    value={infos.email}
                    name='email'
                    type='email'
                    label="Email"
                    variant="filled"
                    InputLabelProps={{
                        sx: {
                          [`&.${inputLabelClasses.shrink}`]: {
                            color: "rgba(93,175,47,255)"
                          }
                        }
                      }}
                />}
                <FormControl className='my-3' variant="filled" fullWidth>
                    <InputLabel id="demo-simple-select-filled-label">Gender</InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        required
                        value={gender}
                        label="Gender"
                        onChange={handleChangeGender}
                        sx={{
                            ':after': { borderBottomColor: 'rgba(93,175,47,255)' },
                          }}
                    >
                    <MenuItem value={'male'}>Male</MenuItem>
                    <MenuItem value={'female'}>Female</MenuItem>
                    <MenuItem value={'none'}>I don't want to Say</MenuItem>
                    </Select>
                </FormControl>
                
                <div className='w-100 row flex-center my-3'>
                    <div className='col-12 col-md-6 flex-center'>
                        <LocalizationProvider className='w-100 flex-center' dateAdapter={AdapterDayjs}>
                            <Stack spacing={0}>
                                <DesktopDatePicker
                                label="Date of Birth"
                                inputFormat="MM/DD/YYYY"
                                value={date}
                                onChange={handleChangeDate}
                                renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </div>
                    <div className='col-12 col-md-6 flex-center'>
                        <Autocomplete className='w-100 flex-center'
                            id="country-select-demo"
                            sx={{ width: 300 }}
                            options={countries}
                            onChange={handleChangeRegion}
                            autoHighlight
                            getOptionLabel={(option) => option.label}
                            renderOption={(props, option) => (
                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                <img
                                    loading="lazy"
                                    width="20"
                                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                    alt=""
                                />
                                {option.label}
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Country or Region"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                    }}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="settings-buttons flex-center">
                    {!props.completing && <Button className='cancel-btn'>Cancel</Button>}
                    <div className='flex-center profile-wrapper'>
                        <Button  className='profile-btn' type='submit'>Save Profile</Button>
                    </div>
                </div>
            </Box>
        </div>
        <div className='col-0 col-md-1 col-lg-2 col-xl-3'></div>
    </div>
  )
}

export default ModifyProfile