import React, { useEffect, useState } from 'react'
import axios from 'axios';

import {BsFillBookmarkPlusFill} from 'react-icons/bs'
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import {Button, Skeleton, Typography} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import "./Diets.css";
import ImageEffect from './ImageEffect';


const Diets = () => {
    const { REACT_APP_BASE_URL } = process.env;
    const existingCalories = localStorage.getItem('calories');
    var existingBreakfast = JSON.parse(localStorage.getItem('breakfast'));
    var existingLunch = JSON.parse(localStorage.getItem('lunch'));
    var existingDinner = JSON.parse(localStorage.getItem('dinner'));

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

    const [breakfast, setBreakfast] = useState(existingBreakfast && existingBreakfast);
    const [isBreakfastSaved, setIsBreakfastSaved] = useState(false);
    const [lunch, setLunch] = useState(existingLunch && existingLunch);
    const [isLunchSaved, setIsLunchSaved] = useState(false);
    const [dinner, setDinner] = useState(existingDinner && existingDinner);
    const [isDinnerSaved, setIsDinnerSaved] = useState(false);

    const [loading, setLoading] = useState(false);
    const [breakfastLoader, setBreakfastLoader] = useState(false);
    const [lunchLoader, setLunchLoader] = useState(false);
    const [dinnerLoader, setDinnerLoader] = useState(false);

    function SkeletonComponent() {
      return (<Skeleton width="100%" sx={{marginTop: '-23vh', marginBottom: '-21vh'}}>
          <div style={{ height: '110vh' }} />
        </Skeleton>)
    }


    const handleClickLoading = () => {
      localStorage.removeItem('breakfast');
      setLoading(true);
    };

    const LockMeal = (meal, e) => {
      e.stopPropagation();
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
    const SaveMeal = (e) => {
      e.stopPropagation();
      console.log(12);
      //Service coming soon ...
    }

    useEffect(()=>{
      const fetchKey = async () => {
        const res = await axios.get(REACT_APP_BASE_URL+"/api/api-key");
        setKey(res.data);
      }
      fetchKey();
      const fetchFood = async () => {
        !isBreakfastSaved && setBreakfastLoader(true);
        !isLunchSaved && setLunchLoader(true);
        !isDinnerSaved && setDinnerLoader(true);
        const res = await axios.get("https://api.spoonacular.com/mealplanner/generate?apiKey="+key+"&timeFrame=day&targetCalories="+existingCalories, {
        // headers: {
        //   'x-api-key': key
        // }
        })
        if (!isBreakfastSaved){
          setBreakfast(res.data.meals[0]);
          localStorage.setItem('breakfast', JSON.stringify(res.data.meals[0]));
        }
        if (!isLunchSaved){
          setLunch(res.data.meals[1]);
          localStorage.setItem('lunch', JSON.stringify(res.data.meals[1]));
        }
        if (!isDinnerSaved){
          setDinner(res.data.meals[2]);
          localStorage.setItem('dinner', JSON.stringify(res.data.meals[2]));
        }
        setLoading(false);
        setBreakfastLoader(false);
        setLunchLoader(false);
        setDinnerLoader(false);
      }
      !existingBreakfast && key && (!isBreakfastSaved || !isLunchSaved || !isDinnerSaved) ? fetchFood() : setLoading(false);
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
                Regenerate
              </Button>}
            </div>
            
            {(breakfast && lunch && dinner) ? <>
              <div className="col-12 col-md-5 col-lg-4 p-3 flex-column-css">
                <h4 style={{color: '#F96666'}}>Breakfast</h4>
                {!breakfastLoader ? <Tooltip title={isBreakfastSaved ? "Click to Unlock" : "Click to Lock"} followCursor onClick={(e)=>LockMeal('breakfast', e)}>
                  <div 
                    className='w-100 m-2 p-3 meals meals-breakfast flex-column-css align-items-start '
                    style={{backgroundColor: isBreakfastSaved && "rgb(249, 102, 102, 0.75)"}}
                  >
                    <div className={'w-100 my-2 flex-center '+(isBreakfastSaved && 'blurred')}>
                      <ImageEffect className={isBreakfastSaved && 'bluurred'} meal={breakfast} />
                    </div>
                    {isBreakfastSaved && <div className='save-icon flex-center'>
                        <BsFillBookmarkPlusFill onClick={(e)=>SaveMeal(e)} size={50} style={{filter: 'drop-shadow(0 0 0.75rem rgb(249, 102, 102, 1))'}}/>
                    </div>}
                    <h4 className={isBreakfastSaved && 'blurred'}>{breakfast.title}</h4>
                    <p className={isBreakfastSaved && 'blurred'}>Servings: <b>{breakfast.servings}</b></p>
                    <p className={isBreakfastSaved && 'blurred'}>Ready in: <b>{breakfast.readyInMinutes}</b> minutes</p>
                  </div>
                </Tooltip>
                : <SkeletonComponent />
            }
              </div>

              <div className="col-12 col-md-5 col-lg-4 p-3 flex-column-css">
                <h4 style={{color: '#674747'}}>Lunch</h4>
                {!lunchLoader ? <Tooltip title={isLunchSaved ? "Click to Unlock" : "Click to Lock"} followCursor onClick={(e)=>LockMeal('lunch', e)}>
                  <div 
                    className='w-100 m-2 p-3 meals meals-lunch flex-column-css align-items-start'
                    style={{backgroundColor: isLunchSaved && "rgb(103, 71, 71, 0.75)"}}
                  >
                    <div className={'w-100 my-2 flex-center '+(isLunchSaved && 'blurred')}>
                      <ImageEffect className={isLunchSaved && 'blurred'} meal={lunch} />
                    </div>
                    {isLunchSaved && <div className='save-icon flex-center'>
                        <BsFillBookmarkPlusFill onClick={(e)=>SaveMeal(e)} size={50} style={{filter: 'drop-shadow(0 0 0.75rem rgb(103, 71, 71, 1))'}}/>
                    </div>}
                    <h4 className={isLunchSaved && 'blurred'}>{lunch.title}</h4>
                    <p className={isLunchSaved && 'blurred'}>Servings: <b>{lunch.servings}</b></p>
                    <p className={isLunchSaved && 'blurred'}>Ready in: <b>{lunch.readyInMinutes}</b> minutes</p>
                  </div>
                </Tooltip>
                : <SkeletonComponent />
          }
              </div>
              
              <div className="col-12 col-md-5 col-lg-4 p-3 flex-column-css">
                <h4 style={{color: '#829460'}}>Dinner</h4>
                {!dinnerLoader ? <Tooltip title={isDinnerSaved ? "Click to Unlock" : "Click to Lock"} followCursor onClick={(e)=>LockMeal('dinner', e)}>
                  <div 
                    className='w-100 m-2 p-3 meals meals-dinner flex-column-css align-items-start'
                    style={{backgroundColor: isDinnerSaved && "rgb(130, 148, 96, 0.75)"}}
                  >
                    <div className={'w-100 my-2 flex-center '+(isDinnerSaved && 'blurred')}>
                      <ImageEffect className={isDinnerSaved && 'blurred'} meal={dinner} />
                    </div>
                    {isDinnerSaved && <div className='save-icon flex-center'>
                        <BsFillBookmarkPlusFill onClick={(e)=>SaveMeal(e)} size={50} style={{filter: 'drop-shadow(0 0 0.75rem rgb(130, 148, 96, 1))'}}/>
                    </div>}
                    <h4 className={isDinnerSaved && 'blurred'}>{dinner.title}</h4>
                    <p className={isDinnerSaved && 'blurred'}>Servings: <b>{dinner.servings}</b></p>
                    <p className={isDinnerSaved && 'blurred'}>Ready in: <b>{dinner.readyInMinutes}</b> minutes</p>
                  </div>
                </Tooltip>
                : <SkeletonComponent />
        }
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