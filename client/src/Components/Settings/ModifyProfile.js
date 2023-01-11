import React, { useState } from 'react'

import { Autocomplete, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import countries from './Countries';
import dayjs from 'dayjs';
import './Settings.css'

const ModifyProfile = () => {
    const [gender, setGender] = useState('');

    const handleChangeGender = (event) => {
        setGender(event.target.value);
    };

    const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));

    const handleChange = (newValue) => {
        setValue(newValue);
    };
  return (
    /* Modify Profile */
    <div className='modify-profile row'>
        <div className='col-0 col-md-1 col-lg-2 col-xl-3'></div>
        <div className='flex-column-css col-12 col-md-10 col-lg-8 col-xl-6'>
            <h3 style={{fontSize: '36px'}} className='title'>Modify Profile</h3>
            <Box
                className='flex-column-css w-100 px-3'
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                autoComplete="off"
            >
                <TextField
                    className='w-100 my-3'
                    required
                    type='text'
                    label="Username"
                    variant="filled"
                />
                <TextField
                    className='w-100 my-3'
                    required
                    type='email'
                    label="Email"
                    variant="filled"
                />
                <FormControl className='my-3' variant="filled" fullWidth>
                    <InputLabel id="demo-simple-select-filled-label">Gender</InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={gender}
                        label="Gender"
                        onChange={handleChangeGender}
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
                                value={value}
                                onChange={handleChange}
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
                    <Button className='cancel-btn'>Cancel</Button>
                    <div className='flex-center submit-wrapper'>
                        <Button className='submit-btn' type='submit'>Submit</Button>
                    </div>
                </div>
            </Box>
        </div>
        <div className='col-0 col-md-1 col-lg-2 col-xl-3'></div>
    </div>
  )
}

export default ModifyProfile