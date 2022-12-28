import React, { useEffect, useState } from 'react'
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import "./Diets.css";

import Fade from '@mui/material/Fade';
import {Button} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


const Diets = () => {
    const existingCalories = localStorage.getItem('calories');
    

    const [food, setFood] = useState();
    const [key, setKey] = useState();
    const [breakfast, setBreakfast] = useState();
    const [lunch, setLunch] = useState();
    const [dinner, setDinner] = useState();
    
    const [loading, setLoading] = useState(false);
    const handleClickLoading = () => {
      setLoading(true);
    };

    useEffect(()=>{
      const fetchKey = async () => {
        const res = await axios.get("http://localhost:5000/api/api-key");
        setKey(res.data);
      }
      fetchKey();
      const fetchFood = async () => {
        const res = await axios.get("https://api.spoonacular.com/mealplanner/generate?apiKey="+key+"&timeFrame=day&targetCalories="+existingCalories, {
        // headers: {
        //   'x-api-key': key
        // }
        })
        setFood(res.data);
        setBreakfast(res.data.meals[0]);
        setLunch(res.data.meals[1]);
        setDinner(res.data.meals[2]);
        setLoading(false);
      }
      key && fetchFood();
    }, [key, loading])
    food && console.log(food)
  return existingCalories && (
    <div className='container main-position'>
        <div className='container flex-center bg-container title-text '>
            <div className='container flex-center row'>
                <div className='container row flex-center text-center'>
                    <div className='col-12'>
                        <h1 className='title'>Your Way to Control Your Diet</h1>
                    </div>
                    <div className='col-12 description'>
                      <h1 className='title'>Your daily Diet</h1>
                      <h4 className='title'><span className='calories'>{existingCalories}</span> calories per day.</h4>
                    </div>
                </div>
            </div>
        </div>
        <div className='container flex-column-css'>
          <h1 className='title m-3'>Your Daily Meal</h1>
          {food ? <div className='flex-center align-items-start meals-background row'>
            <div className='regenerate d-flex align-items-center justify-content-end'>
              <Box sx={{ height: 40 }}>
                <Fade
                  in={loading}
                  style={{
                    transitionDelay: loading ? '800ms' : '0ms',
                  }}
                  unmountOnExit
                >
                  <CircularProgress style={{color: 'rgba(93,175,47,1)'}}/>
                </Fade>
              </Box>
              {!loading && <Button style={{color: 'rgba(93,175,47,1)'}} onClick={handleClickLoading} sx={{ m: 2 }}>
                Refresh
              </Button>}
            </div>
            <div className="col-11 col-md-5 col-lg-3 m-2 px-3 flex-column-css">
              <h4 style={{color: '#FFDB89'}}>Breakfast</h4>
              <div className='w-100 m-2 p-3 meals meals-breakfast flex-column-css align-items-start'>
                <h4>{breakfast.title}</h4>
                <p>Servings: <b>{breakfast.servings}</b></p>
                <p>Ready in: <b>{breakfast.readyInMinutes}</b> minutes</p>
              </div>
            </div>
            <div className="col-11 col-md-5 col-lg-3 m-2 px-3 flex-column-css">
              <h4 style={{color: '#850000'}}>Lunch</h4>
              <div className='w-100 m-2 p-3 meals meals-lunch flex-column-css align-items-start'>
                <h4>{lunch.title}</h4>
                <p>Servings: <b>{lunch.servings}</b></p>
                <p>Ready in: <b>{lunch.readyInMinutes}</b> minutes</p>
              </div>
            </div>
            <div className="col-11 col-md-5 col-lg-3 m-2 px-3 flex-column-css">
              <h4 style={{color: '#DC0000'}}>Dinner</h4>
              <div className='w-100 m-2 p-3 meals meals-dinner flex-column-css align-items-start'>
                <h4>{dinner.title}</h4>
                <p>Servings: <b>{dinner.servings}</b></p>
                <p>Ready in: <b>{dinner.readyInMinutes}</b> minutes</p>
              </div>
            </div>
          </div>
        :<div className='container flex-center'>
            <Box className='m-5' sx={{ width: '100%' }}>
            <LinearProgress style={{color: 'rgba(93,175,47,1)'}} />
          </Box>
        </div>}
      </div>
    </div>
  )
}

export default Diets