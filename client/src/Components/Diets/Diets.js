import React, { useEffect, useState } from 'react'
import axios from 'axios';

import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import {Button} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import "./Diets.css";
import ImageEffect from './ImageEffect';


const Diets = () => {
    const existingCalories = localStorage.getItem('calories');

  //   const food = [
  //     {
  //         "id": 636026,
  //         "imageType": "jpg",
  //         "title": "Breakfast Biscuits and Gravy",
  //         "readyInMinutes": 45,
  //         "servings": 4,
  //         "sourceUrl": "https://spoonacular.com/breakfast-biscuits-and-gravy-636026"
  //     },
  //     {
  //         "id": 643634,
  //         "imageType": "jpg",
  //         "title": "Macaroni with Fresh Tomatoes and Beans",
  //         "readyInMinutes": 25,
  //         "servings": 4,
  //         "sourceUrl": "https://spoonacular.com/macaroni-with-fresh-tomatoes-and-beans-643634"
  //     },
  //     {
  //         "id": 643781,
  //         "imageType": "jpg",
  //         "title": "Fried Ravioli & Mint Parsley Pesto",
  //         "readyInMinutes": 45,
  //         "servings": 4,
  //         "sourceUrl": "https://spoonacular.com/fried-ravioli-mint-parsley-pesto-643781"
  //     }
  // ]
  //   const breakfast = food[0]
  //   const lunch = food[1]
  //   const dinner = food[2]
    

    const [key, setKey] = useState();
    const [food, setFood] = useState();
    const [breakfast, setBreakfast] = useState();
    const [isBreakfastSaved, setIsBreakfastSaved] = useState(false);
    const [lunch, setLunch] = useState();
    const [isLunchSaved, setIsLunchSaved] = useState(false);
    const [dinner, setDinner] = useState();
    const [isDinnerSaved, setIsDinnerSaved] = useState(false);
    
    const [loading, setLoading] = useState(false);
    const handleClickLoading = () => {
      setLoading(true);
    };

    const SaveMeal = (meal) => {
      switch(meal) {
        case 'breakfast':
          setIsBreakfastSaved(prev => !prev)
          break
        case 'lunch':
          setIsLunchSaved(prev => !prev)
          break
        case 'dinner':
          setIsDinnerSaved(prev => !prev)
          break
      }
    }

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
        !isBreakfastSaved && setBreakfast(res.data.meals[0]);
        !isLunchSaved && setLunch(res.data.meals[1]);
        !isDinnerSaved && setDinner(res.data.meals[2]);
        setLoading(false);
      }
      key && (!isBreakfastSaved || !isLunchSaved || !isDinnerSaved) ? fetchFood() : setLoading(false);
    }, [key, loading])
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
        <div className='container m-3 flex-column-css'>
          <div className='flex-center align-items-start meals-background row'>
            <div className='regenerate d-flex flex-column align-items-center justify-content-center'>
              <h1 className='title'>Your Daily Meal</h1>
              {loading && <Box sx={{ maxHeight: 40 }}>
                <Fade
                  in={loading}
                  style={{
                    transitionDelay: loading ? '800ms' : '0ms',
                  }}
                  unmountOnExit
                >
                  <CircularProgress style={{color: 'rgba(93,175,47,1)'}}/>
                </Fade>
              </Box>}
              {!loading && <Button style={{height: 40, color: 'rgba(93,175,47,1)'}} onClick={handleClickLoading}>
                Refresh
              </Button>}
            </div>
            
            {food ? <>
              <div className="col-12 col-md-5 col-lg-4 p-3 flex-column-css">
                <h4 style={{color: '#FFDB89'}}>Breakfast</h4>
                <Tooltip title={isBreakfastSaved ? "Click to Unsave" : "Click to Save"} followCursor onClick={()=>SaveMeal('breakfast')}>
                  <div 
                    className='w-100 m-2 p-3 meals meals-breakfast flex-column-css align-items-start'
                    style={{backgroundColor: isBreakfastSaved && "rgb(255, 219, 137, 0.75)"}}
                  >
                    <div className='w-100 my-2 flex-center'>
                      <ImageEffect meal={breakfast} />
                    </div>
                    <h4>{breakfast.title}</h4>
                    <p>Servings: <b>{breakfast.servings}</b></p>
                    <p>Ready in: <b>{breakfast.readyInMinutes}</b> minutes</p>
                  </div>
                </Tooltip>
              </div>

              <div className="col-12 col-md-5 col-lg-4 p-3 flex-column-css">
                <h4 style={{color: '#FFDB89'}}>Lunch</h4>
                <Tooltip title={isLunchSaved ? "Click to Unsave" : "Click to Save"} followCursor onClick={()=>SaveMeal('lunch')}>
                  <div 
                    className='w-100 m-2 p-3 meals meals-lunch flex-column-css align-items-start'
                    style={{backgroundColor: isLunchSaved && "rgb(133, 0, 0, 0.75)"}}
                  >
                    <div className='w-100 my-2 flex-center'>
                      <ImageEffect meal={lunch} />
                    </div>
                    <h4>{lunch.title}</h4>
                    <p>Servings: <b>{lunch.servings}</b></p>
                    <p>Ready in: <b>{lunch.readyInMinutes}</b> minutes</p>
                  </div>
                </Tooltip>
              </div>
              
              <div className="col-12 col-md-5 col-lg-4 p-3 flex-column-css">
                <h4 style={{color: '#FFDB89'}}>Dinner</h4>
                <Tooltip title={isDinnerSaved ? "Click to Unsave" : "Click to Save"} followCursor onClick={()=>SaveMeal('dinner')}>
                  <div 
                    className='w-100 m-2 p-3 meals meals-dinner flex-column-css align-items-start'
                    style={{backgroundColor: isDinnerSaved && "rgb(220, 0, 0, 0.75)"}}
                  >
                    <div className='w-100 my-2 flex-center'>
                      <ImageEffect meal={dinner} />
                    </div>
                    <h4>{dinner.title}</h4>
                    <p>Servings: <b>{dinner.servings}</b></p>
                    <p>Ready in: <b>{dinner.readyInMinutes}</b> minutes</p>
                  </div>
                </Tooltip>
              </div>

            </>
            :<div className='container flex-center'>
                <Box className='m-5' sx={{ width: '100%' }}>
                <LinearProgress style={{color: 'rgba(93,175,47,1)'}} />
              </Box>
            </div>}
        </div>
      </div>
    </div>
  )
}

export default Diets