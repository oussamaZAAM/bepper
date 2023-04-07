import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { Button, Card, CardActionArea, CardContent, CardMedia, MenuItem, MobileStepper, Select, TextField, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import { TbGenderMale, TbGenderFemale } from 'react-icons/tb';
import { FiSkipForward } from 'react-icons/fi';

import "./NutritionCalc.css"

const singleQuote = "'"
const doubleQuotes = '"'
var thisDate = new Date();

const NutritionCalc = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [nutritionValue, setNutritionValue] = useState({
        age: '',
        gender: '',
        height: '',
        weight: '',
        goalWeight: '',
        goalDate: '',
        activity: '',
        workout: '',
        eatStyle: '',
    });
    const [nutritionState, setNutritionState] = useState([false, false, false, false]);
    const [calories, setCalories] = useState();
    const [isCalories, setIsCalories] = useState(false);
    const [body, setBody] = useState({
        height: 'cm',
        weight: 'kg'
    })
    const [isRecap, setIsRecap] = useState(false);

    const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleChangeBody = (e) => {
        setIsCalories(false)
        setBody({...body, [e.target.name]: e.target.value})
    }
    const handleActivity = (e) => {
        setIsCalories(false)
        setNutritionValue({...nutritionValue, activity: e})
        setNutritionState(prevArray => {
            const newArray = prevArray;
            newArray[4] = true;
            return newArray;
        })
    }
    const handleWorkout = (e) => {
        setIsCalories(false)
        setNutritionValue({...nutritionValue, workout: e})
        setNutritionState(prevArray => {
            const newArray = prevArray;
            newArray[5] = true;
            return newArray;
        })
    }
    const handleEatStyle = (e) => {
        setIsCalories(false)
        setNutritionValue({...nutritionValue, eatStyle: e})
        setNutritionState(prevArray => {
            const newArray = prevArray;
            newArray[6] = true;
            return newArray;
        })
    }
    const handleChange = (e, gender) => {
        setIsCalories(false)
        if (gender) {
            setNutritionValue({...nutritionValue, gender: gender});
            setNutritionState(prevArray => {
                const newArray = prevArray;
                newArray[1] = true;
                return newArray;
            })
        }
        if (e.target.name) {
            setNutritionValue({...nutritionValue, [e.target.name]: e.target.value})
            setNutritionState(prevArray => {
                const newArray = prevArray;
                if (e.target.name === 'age') {
                    if (e.target.value >= 18 && e.target.value <= 120) {
                        newArray[0] = true;
                    } else {
                        newArray[0] = false;
                    }
                }
                if (e.target.name === 'height' || e.target.name === 'weight') {
                    if (e.target.name === 'height') {
                        if (e.target.value >= 60 && e.target.value <= 300) {
                            newArray[10] = true;
                        } else {
                            newArray[10] = false;
                        }
                    }
                    if (e.target.name === 'weight') {
                        if (e.target.value >= 23 && e.target.value <= 227) {
                            newArray[11] = true;
                        } else {
                            newArray[11] = false;
                        }
                    }
                    newArray[2] = (newArray[10] && newArray[11]) ? true : false
                }
                if (e.target.name === 'goalWeight' || e.target.name === 'goalDate') {
                    if (e.target.name === 'goalDate') {
                        if (nutritionValue.weight === nutritionValue.goalWeight) {
                            newArray[8] = true;
                        } else {
                            var thisDate = new Date();
                            if (dateFormatter(thisDate) <= e.target.value) {
                                newArray[8] = true;
                            } else {
                                newArray[8] = false;
                            }
                        }
                    }
                    if (e.target.name === 'goalWeight') {
                        if (e.target.value >= 23 && e.target.value <= 227) {
                            newArray[9] = true;
                        } else {
                            newArray[9] = false;
                        }
                    }
                    newArray[3] = (newArray[8] && newArray[9]) ? true : false
                }
                return newArray;
            })
        }
    }

    const skipGoal = () => {
        const thisTime = Date.now();
        setNutritionValue({...nutritionValue, goalWeight: nutritionValue.weight, goalDate: thisTime});
        setActiveStep(4)
    }

    const generateCalories = () => {
        setIsCalories(true)
        if (nutritionValue.gender === 'male') {
            const cals = 10*nutritionValue.weight + 6.25*nutritionValue.height - 5*nutritionValue.age + 5;
            switch (nutritionValue.activity) {
                case 'low':
                    setCalories(cals * 1.375);
                    break
                case 'medium':
                    setCalories(cals * 1.55);
                    break
                case 'high':
                    setCalories(cals * 1.725);
                    break
                default:
                    void(0);
            }
        } else {
            const cals = 10*nutritionValue.weight + 6.25*nutritionValue.height - 5*nutritionValue.age - 161
            switch (nutritionValue.activity) {
                case 'low':
                    setCalories(cals * 1.375);
                    break
                case 'medium':
                    setCalories(cals * 1.55);
                    break
                case 'high':
                    setCalories(cals * 1.725);
                    break
                default:
                    void(0);
            }
        }
    }

    const applyResults = (cals, nutriValues) => {
        localStorage.setItem('calories', cals)
        localStorage.setItem('nutritionValues', nutriValues)
        navigate('/diets')
    }

    function dateFormatter(date) {
        return date.getFullYear() + "-" + ("0"+(date.getMonth()+1)).slice(-2) + "-" +
        ("0" + date.getDate()).slice(-2);
    }

    const handleNavigation = (factor) => {
        switch(factor) {
            case 'age':
                setActiveStep(0);
                break
            case 'gender':
                setActiveStep(1);
                break
            case 'height':
                setActiveStep(2);
                break
            case 'weight':
                setActiveStep(2);
                break
            case 'goalWeight':
                setActiveStep(3);
                break
            case 'goalDate':
                setActiveStep(3);
                break
            case 'activity':
                setActiveStep(4);
                break
            case 'workout':
                setActiveStep(5);
                break
            case 'eatStyle':
                setActiveStep(6);
                break
            case 'recap':
                setActiveStep(7);
                break
            default:
                void(0);
        }
    }
    useEffect(()=>{
        if(Object.keys(nutritionValue).every(x=>nutritionValue[x] !== '')&&(Object.keys(nutritionState).every(x=>nutritionState[x]!==false))){
            setIsRecap(true)
        } else {
            setIsRecap(false)
        }
    }, [nutritionValue])

    return (
        <div className='nutritioncalculator flex-column-css'>
            {isRecap && activeStep!==7 && <Button size='large' onClick={()=>handleNavigation('recap')}>Recap</Button>}
            {activeStep === 0 &&<div className='Card flex-column-css'>
                <h1 className='m-3' style={{fontFamily: 'Comfortaa, cursive'}}>What's your Age?</h1>
                <h6>(Valid age is between <b style={{fontWeight: '900'}}>18</b> and <b style={{fontWeight: '900'}}>120</b>!)</h6>
                <div className='container flex-center'>
                    <TextField 
                        className='calculator-textfield' 
                        id="outlined-basic" 
                        variant="outlined"
                        onChange={handleChange}
                        name='age'
                        type='number'
                        value={nutritionValue.age}
                        inputProps={{style: {textAlign: 'center', fontSize: 60, fontFamily: 'Noto Sans Mono, monospace'}}} />
                </div>
            </div>}

            {activeStep === 1 &&<div className='Card flex-column-css'>
                <h1 className='m-3' style={{fontFamily: 'Comfortaa, cursive'}}>Choose your <span>biological</span> Gender</h1>
                <div className='container flex-center row'>
                    {nutritionValue.gender !== 'male'
                    ? <div className='flex-column-css gender-m col-12 col-md-4' onClick={(e)=>handleChange(e, 'male')}>
                        <TbGenderMale className='gender-male' size={100}/>
                        <h6>Male</h6>
                    </div>
                    : <div className='flex-column-css gender-m-clicked col-12 col-md-4'>
                        <TbGenderMale className='gender-male' size={100}/>
                        <h6>Male</h6>
                    </div>}
                    {nutritionValue.gender !== 'female'
                    ? <div className='flex-column-css gender-f col-12 col-md-4'  onClick={(e)=>handleChange(e, 'female')}>
                        <TbGenderFemale className='gender-female' size={100}/>
                        <h6>Female</h6>
                    </div>
                    : <div className='flex-column-css gender-f-clicked col-12 col-md-4'>
                        <TbGenderFemale className='gender-female' size={100}/>
                        <h6>Female</h6>
                    </div>}
                </div>
            </div>}

            {activeStep === 2 &&<div className='Card flex-column-css'>
                <h1 className='m-3' style={{fontFamily: 'Comfortaa, cursive'}}>What's
                your Height ?</h1>
                <div className='container flex-center row'>
                    <div className='height flex-column-css col-10 col-md-6'>
                        <h6>
                            (<b style={{fontWeight: '900'}}>{body.height === 'cm' ? 60 : 2+singleQuote} </b>
                            {"<"} Valid Height
                            {/* <span style={{color: 'rgba(93,175,47,1)'}}>H</span> */}
                            <b style={{fontWeight: '900'}}>{"<"} {body.height === 'cm' ? 300 : 9+singleQuote+11+doubleQuotes}</b>!)
                        </h6>
                        <div className='flex-center'>
                            <TextField 
                                className='calculator-textfield mx-3' 
                                id="outlined-basic" 
                                variant="outlined"
                                value={nutritionValue.height}
                                name='height'
                                onChange={handleChange}
                                type='number'
                                InputProps={{
                                    style: {textAlign: 'center', fontSize: 30, fontFamily: 'Noto Sans Mono, monospace'},
                                    endAdornment: (
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={body.height}
                                            name='height'
                                            onChange={handleChangeBody}
                                            autoWidth
                                            >
                                            <MenuItem value={'cm'}>cm</MenuItem>
                                            <MenuItem value={'ft'}>ft</MenuItem>
                                        </Select>
                                      ),
                                }}/>
                        </div>
                        
                    </div>
                    <div className='weight flex-column-css col-10 col-md-6'>
                        <div className='flex-column-css'>
                            <h6>
                                (<b style={{fontWeight: '900'}}>{body.weight === 'kg' ? 23 : 50} </b>
                                {"<"} Valid Weight  
                                <b style={{fontWeight: '900'}}>{"<"} {body.weight === 'kg' ? 227 : 500}</b>!)
                            </h6>
                            <TextField 
                                className='calculator-textfield mx-3' 
                                id="outlined-basic" 
                                variant="outlined"
                                value={nutritionValue.weight}
                                name='weight'
                                onChange={handleChange}
                                type='number'
                                InputProps={{
                                    style: {textAlign: 'center', fontSize: 30, fontFamily: 'Noto Sans Mono, monospace'},
                                    endAdornment: (
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={body.weight}
                                            name='weight'
                                            onChange={handleChangeBody}
                                            autoWidth
                                            >
                                            <MenuItem value={'kg'}>kg</MenuItem>
                                            <MenuItem value={'lbs'}>lbs</MenuItem>
                                        </Select>
                                    ),
                                }}/>
                            </div>
                    </div>
                </div>
            </div>}

            {activeStep === 3 && 
            <div className='container flex-column-css'>
                <h1 className='m-3' style={{fontFamily: 'Comfortaa, cursive'}}>What's your Weight Goal ?</h1>
                <Button className='mb-3' variant="outlined" color='success' endIcon={<FiSkipForward />} onClick={skipGoal}>
                    Skip This Part
                </Button>
                <h6>
                    (<b style={{fontWeight: '900'}}>{body.weight === 'kg' ? 23 : 50} </b>
                    {"<"} Valid Weight  
                    <b style={{fontWeight: '900'}}>{"<"} {body.weight === 'kg' ? 227 : 500}</b>!)
                </h6>
                <TextField 
                    className='calculator-textfield mx-3' 
                    id="outlined-basic" 
                    variant="outlined"
                    value={nutritionValue.goalWeight}
                    name='goalWeight'
                    onChange={handleChange}
                    type='number'
                    InputProps={{
                        style: {textAlign: 'center', fontSize: 30, fontFamily: 'Noto Sans Mono, monospace'},
                        endAdornment: (
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={body.weight}
                                name='weight'
                                onChange={handleChangeBody}
                                autoWidth
                                >
                                <MenuItem value={'kg'}>kg</MenuItem>
                                <MenuItem value={'lbs'}>lbs</MenuItem>
                            </Select>
                        ),
                    }}/>
                {nutritionValue.goalWeight!=='' && nutritionValue.goalWeight!==nutritionValue.weight && <>
                <h3 className='m-3' style={{fontFamily: 'Comfortaa, cursive'}}>By which date ?</h3>
                <TextField 
                    className='calculator-textfield mx-3' 
                    id="outlined-basic" 
                    variant="outlined"
                    value={nutritionValue.goalDate}
                    name='goalDate'
                    error={dateFormatter(thisDate) > nutritionValue.goalDate}
                    onChange={handleChange}
                    type='date'
                    inputProps={{style: {textAlign: 'center', fontSize: 30, fontFamily: 'Noto Sans Mono, monospace'}}}/>
                </>}
            </div>}

            {activeStep === 4 && 
                <div className='container flex-column-css'>
                    <h1 className='m-3' style={{fontFamily: 'Comfortaa, cursive'}}>What's your Activity Level ?</h1>
                    <h6>Describe your activity through the day (not inluding any workout)</h6>
                    <div className="container row flex-center">
                        <Card className='col-sm-12 col-md-5 m-3' sx={{ maxWidth: 345, backgroundColor: nutritionValue.activity === "low" && "#bed0b4"  }}>
                            <CardActionArea onClick={()=>handleActivity('low')}>
                                <CardMedia
                                    component="img"
                                    height="150"
                                    image={require("../../Logos/Charts/low.png")}
                                    alt="low activity"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    LOW
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Sitting most of the day
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <Card className='col-sm-12 col-md-5 m-3' sx={{ maxWidth: 345, backgroundColor: nutritionValue.activity === "medium" && "#bed0b4"  }}>
                            <CardActionArea onClick={()=>handleActivity('medium')}>
                                <CardMedia
                                    component="img"
                                    height="150"
                                    image={require("../../Logos/Charts/medium.png")}
                                    alt="medium activity"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    MEDIUM
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Continuous gentle to moderate activity
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <Card className='col-sm-12 col-md-5 m-3' sx={{ maxWidth: 345, backgroundColor: nutritionValue.activity === "high" && "#bed0b4" }}>
                            <CardActionArea onClick={()=>handleActivity('high')}>
                                <CardMedia
                                    component="img"
                                    height="150"
                                    image={require("../../Logos/Charts/high.png")}
                                    alt="high activity"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    HIGH
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Activity of great effort throughout the day
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </div>
                </div>
            }

            {activeStep === 5 && 
                <div className='container flex-column-css'>
                    <h1 className='m-3' style={{fontFamily: 'Comfortaa, cursive'}}>What's your Workout Level ?</h1>
                    <h6>Describe your daily Workout</h6>
                    <div className="container row flex-center">
                        <Card className='col-sm-12 col-md-5 m-3' sx={{ maxWidth: 345, backgroundColor: nutritionValue.workout === "low" && "#bed0b4"  }}>
                            <CardActionArea onClick={()=>handleWorkout('low')}>
                                <CardMedia
                                    component="img"
                                    height="150"
                                    image={require("../../Logos/Charts/low.png")}
                                    alt="low workout"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    LOW
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Slowly lifting weights.
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Light jogging.
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <Card className='col-sm-12 col-md-5 m-3' sx={{ maxWidth: 345, backgroundColor: nutritionValue.workout === "medium" && "#bed0b4"  }}>
                            <CardActionArea onClick={()=>handleWorkout('medium')}>
                                <CardMedia
                                    component="img"
                                    height="150"
                                    image={require("../../Logos/Charts/medium.png")}
                                    alt="medium workout"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    MEDIUM
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    150 minutes of moderate physical activity.
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    2 days of muscle strengthening activity.
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Walking very brisk (4 mph).
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <Card className='col-sm-12 col-md-5 m-3' sx={{ maxWidth: 345, backgroundColor: nutritionValue.workout === "high" && "#bed0b4" }}>
                            <CardActionArea onClick={()=>handleWorkout('high')}>
                                <CardMedia
                                    component="img"
                                    height="150"
                                    image={require("../../Logos/Charts/high.png")}
                                    alt="high workout"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    HIGH
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Streneous heavy weight-lifting.
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Jogging at 6 mph.
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </div>
                </div>
            }
            {activeStep === 6 && 
                <div className="container flex-column-css">
                    <h1 className='m-3' style={{fontFamily: 'Comfortaa, cursive'}}>Choose your Food Preferences</h1>
                    <div className="container flex-center row">
                        <div 
                          onClick={()=>handleEatStyle('keto')}
                          style={{backgroundColor: nutritionValue.eatStyle === 'keto' && 'rgba(219,174,126,1)'}}
                          className='col-sm-12 col-md-4 m-1 container flex-column-css keto-diet'>
                            <img alt='' src={require("../../Logos/Diets/keto.png")}/>
                            <p style={{fontFamily: 'Akaya Kanadaka, cursive'}} className='text-center'><small>low in carbohydrates but high in protein</small></p>
                        </div>

                        <div 
                          onClick={()=>handleEatStyle('low-carb')}
                          style={{backgroundColor: nutritionValue.eatStyle === 'low-carb' && 'rgba(246,219,3,255)'}}
                          className='col-sm-12 col-md-4 m-1 container flex-column-css low-carb-diet'>
                            <img alt='' src={require("../../Logos/Diets/low-carb.png")}/>
                            <p style={{fontFamily: 'Akaya Kanadaka, cursive'}} className='text-center'><small>restricts carbohydrates, but high in protein, fat, and vegetables</small></p>
                        </div>

                        <div 
                          onClick={()=>handleEatStyle('paleo')}
                          style={{backgroundColor: nutritionValue.eatStyle === 'paleo' && 'rgba(216,45,48,1)'}}
                          className='col-sm-12 col-md-4 m-1 container flex-column-css paleo-diet'>
                            <img alt='' src={require("../../Logos/Diets/paleo.png")}/>
                            <p style={{fontFamily: 'Akaya Kanadaka, cursive'}} className='text-center'><small>emphasizes whole foods(fruits, seeds), while discouraging processed foods, sugar,grains</small></p>
                        </div>

                        <div 
                          onClick={()=>handleEatStyle('mediterranean')}
                          style={{backgroundColor: nutritionValue.eatStyle === 'mediterranean' && 'rgba(179,200,57,255)'}}
                          className='col-sm-12 col-md-4 m-1 container flex-column-css mediterranean-diet'>
                            <img alt='' src={require("../../Logos/Diets/mediterranean.png")}/>
                            <p style={{fontFamily: 'Akaya Kanadaka, cursive'}} className='text-center'><small>lots of healthy foods like whole grains, fruits, vegetables, seafood, beans, and nuts</small></p>
                        </div>

                        <div 
                          onClick={()=>handleEatStyle('no-sugar')}
                          style={{backgroundColor: nutritionValue.eatStyle === 'no-sugar' && 'rgba(69,186,240,255)'}}
                          className='col-sm-12 col-md-4 m-1 container flex-column-css no-sugar-diet'>
                            <img alt='' src={require("../../Logos/Diets/no-sugar.png")}/>
                            <p style={{fontFamily: 'Akaya Kanadaka, cursive'}} className='text-center'><small>eliminates foods containing added sugars</small></p>
                        </div>

                        <div 
                          onClick={()=>handleEatStyle('raw')}
                          style={{backgroundColor: nutritionValue.eatStyle === 'raw' && 'rgba(119,171,44,255)'}}
                          className='col-sm-12 col-md-4 m-1 container flex-column-css raw-diet'>
                            <img alt='' src={require("../../Logos/Diets/raw.png")}/>
                            <p style={{fontFamily: 'Akaya Kanadaka, cursive'}} className='text-center'><small>composed of mostly or completely raw and unprocessed foods</small></p>
                        </div>
                        
                        <div 
                          onClick={()=>handleEatStyle('vegan')}
                          style={{backgroundColor: nutritionValue.eatStyle === 'vegan' && 'rgba(150,194,49,255)'}}
                          className='col-sm-12 col-md-4 m-1 container flex-column-css vegan-diet'>
                            <img alt='' src={require("../../Logos/Diets/vegan.png")}/>
                            <p style={{fontFamily: 'Akaya Kanadaka, cursive'}} className='text-center'><small>based on plants (such as vegetables, grains, nuts and fruits)</small></p>
                        </div>

                        <div 
                          onClick={()=>handleEatStyle('vegetarian')}
                          style={{backgroundColor: nutritionValue.eatStyle === 'vegetarian' && 'rgba(119,170,37,255)'}}
                          className='col-sm-12 col-md-4 m-1 container flex-column-css vegetarian-diet'>
                            <img alt='' src={require("../../Logos/Diets/vegetarian.png")}/>
                            <p style={{fontFamily: 'Akaya Kanadaka, cursive'}} className='text-center'><small>includes a diverse mix of fruits, vegetables, grains, healthy fats and proteins</small></p>
                        </div>
                    </div>
                </div>
            }
            
            {activeStep === 7 && 
                <div className="container flex-column-css">
                    <h1 className='m-3' style={{fontFamily: 'Comfortaa, cursive'}}>Check your Informations !</h1>
                    <div className='col-sm-12 col-md-8 app-desciptions d-flex flex-column justify-content-center align-items-start'>
                        <p className='desc-diet'>- I'm 
                            <Tooltip title="Doucle Click to Change"><span className='span-navigation' onDoubleClick={()=>handleNavigation('age')}> {nutritionValue.age}</span></Tooltip> years old 
                            <Tooltip title="Doucle Click to Change"><span className='span-navigation' onDoubleClick={()=>handleNavigation('gender')}> {nutritionValue.gender}</span></Tooltip>, I am 
                            <Tooltip title="Doucle Click to Change"><span className='span-navigation' onDoubleClick={()=>handleNavigation('height')}> {nutritionValue.height} cm</span></Tooltip> and I weigh 
                            <Tooltip title="Doucle Click to Change"><span className='span-navigation' onDoubleClick={()=>handleNavigation('weight')}> {nutritionValue.weight} kg</span></Tooltip>.
                        </p>
                        {nutritionValue.goalWeight !== nutritionValue.weight 
                        ?   <p className='desc-diet'>
                                - I want to 
                                <Tooltip title="Doucle Click to Change"><span className='span-navigation' onDoubleClick={()=>handleNavigation('goalWeight')}> {nutritionValue.goalWeight-nutritionValue.weight > 0 ? 'gain ' : 'lose '}</span></Tooltip>
                                <Tooltip title="Doucle Click to Change"><span className='span-navigation-v2' onDoubleClick={()=>handleNavigation('goalWeight')}> {nutritionValue.goalWeight-nutritionValue.weight > 0 ? nutritionValue.goalWeight-nutritionValue.weight : nutritionValue.weight-nutritionValue.goalWeight} kg</span></Tooltip> by 
                                <Tooltip title="Doucle Click to Change"><span className='span-navigation' onDoubleClick={()=>handleNavigation('goalDate')}> {nutritionValue.goalDate}</span></Tooltip>
                            </p>
                        : <p className='desc-diet'>- I want to keep my weight!</p>
                        }
                        <p className='desc-diet'>- I am 
                            <Tooltip title="Doucle Click to Change"><span className='span-navigation' onDoubleClick={()=>handleNavigation('activity')}> {nutritionValue.activity+'ly'}</span></Tooltip> active during the day, and I workout 
                            <Tooltip title="Doucle Click to Change"><span className='span-navigation' onDoubleClick={()=>handleNavigation('workout')}> {nutritionValue.workout+'ly'}</span></Tooltip> !
                        </p>
                        <p className='desc-diet'>- I prefer 
                            <Tooltip title="Doucle Click to Change"><span className='span-navigation' onDoubleClick={()=>handleNavigation('eatStyle')}> {nutritionValue.eatStyle}</span></Tooltip> food
                        </p>
                    </div>
                    {!isCalories && <Button size='medium' onClick={generateCalories}>Generate</Button>}
                    {isCalories && <>
                        <h5>You need to eat : </h5>
                        <h3>{calories} Calories / Day</h3>
                        <Button size='medium' onClick={()=>applyResults(calories, nutritionValue)}>Apply</Button>
                    </>}
                </div>
            }
            
            <MobileStepper
                variant="progress"
                steps={8}
                position="static"
                activeStep={activeStep}
                sx={{ 
                    maxWidth: 400, 
                    flexGrow: 1, 
                    width: '100%',
                    color: 'rgba(93,175,47,1)'
                }}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === 7 || !nutritionState[activeStep]}>
                    Next
                    {theme.direction === 'rtl' ? (
                        <KeyboardArrowLeft />
                    ) : (
                        <KeyboardArrowRight />
                    )}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    {theme.direction === 'rtl' ? (
                        <KeyboardArrowRight />
                    ) : (
                        <KeyboardArrowLeft />
                    )}
                    Back
                    </Button>
                }
            />

        </div>
    
    
    )
}

export default NutritionCalc
