import React, { useEffect, useState } from "react";
import axios from "axios";

import { BsFillBookmarkPlusFill } from "react-icons/bs";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { Button, Skeleton, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import "./Diets.css";
import ImageEffect from "./ImageEffect";

const Diets = () => {
  const existingCalories = localStorage.getItem("calories");
  var existingBreakfast = JSON.parse(localStorage.getItem("breakfast"));
  var existingLunch = JSON.parse(localStorage.getItem("lunch"));
  var existingDinner = JSON.parse(localStorage.getItem("dinner"));
  var existingSnack = JSON.parse(localStorage.getItem("snack"));

  const [breakfast, setBreakfast] = useState(
    existingBreakfast && existingBreakfast
  );
  const [isBreakfastSaved, setIsBreakfastSaved] = useState(false);
  const [lunch, setLunch] = useState(existingLunch && existingLunch);
  const [isLunchSaved, setIsLunchSaved] = useState(false);
  const [dinner, setDinner] = useState(existingDinner && existingDinner);
  const [isDinnerSaved, setIsDinnerSaved] = useState(false);
  const [snack, setSnack] = useState(existingSnack && existingSnack);
  const [isSnackSaved, setIsSnackSaved] = useState(false);

  const [loading, setLoading] = useState(false);
  const [breakfastLoader, setBreakfastLoader] = useState(false);
  const [lunchLoader, setLunchLoader] = useState(false);
  const [dinnerLoader, setDinnerLoader] = useState(false);
  const [snackLoader, setSnackLoader] = useState(false);

  function SkeletonComponent() {
    return (
      <Skeleton width="100%" sx={{ marginTop: "-23vh", marginBottom: "-21vh" }}>
        <div style={{ height: "110vh" }} />
      </Skeleton>
    );
  }

  const handleClickLoading = () => {
    localStorage.removeItem("breakfast");
    setLoading(true);
  };

  const LockMeal = (meal, e) => {
    e.stopPropagation();
    switch (meal) {
      case "breakfast":
        setIsBreakfastSaved((prev) => !prev);
        break;
      case "lunch":
        setIsLunchSaved((prev) => !prev);
        break;
      case "dinner":
        setIsDinnerSaved((prev) => !prev);
        break;
      case "snack":
        setIsSnackSaved((prev) => !prev);
        break;
    }
  };
  const SaveMeal = (e) => {
    e.stopPropagation();
    console.log('test');
    //Service coming soon ...
  };

  useEffect(() => {

    const fetchFood = async () => {
      !isBreakfastSaved && setBreakfastLoader(true);
      !isLunchSaved && setLunchLoader(true);
      !isDinnerSaved && setDinnerLoader(true);
      !isSnackSaved && setSnackLoader(true);

      const mealsPlanning = {
        breakfast: [200, 300],
        lunch: [300, 600],
        dinner: [400, 700],
        snack: [100, 200],
      };
      const res = await axios
        .post("bepper-api.up.railway.app/polls/meal-planner/", mealsPlanning, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(res.data)
      if (!isBreakfastSaved) {
        setBreakfast(res.data[0]);
        localStorage.setItem("breakfast", JSON.stringify(res.data[0]));
      }
      if (!isLunchSaved) {
        setLunch(res.data[1]);
        localStorage.setItem("lunch", JSON.stringify(res.data[1]));
      }
      if (!isDinnerSaved) {
        setDinner(res.data[2]);
        localStorage.setItem("dinner", JSON.stringify(res.data[2]));
      }
      if (!isSnackSaved) {
        setSnack(res.data[3]);
        localStorage.setItem("snack", JSON.stringify(res.data[3]));
      }
      setLoading(false);
      setBreakfastLoader(false);
      setLunchLoader(false);
      setDinnerLoader(false);
      setSnackLoader(false);
    };
    !existingBreakfast && (!isBreakfastSaved || !isLunchSaved || !isDinnerSaved || !isSnackSaved)
      ? fetchFood()
      : setLoading(false);
  }, [loading]);
  return (
    existingCalories && (
      <div className="container main-position">
        <div className="container flex-center bg-container title-text ">
          <div className="container flex-center row">
            <div className="container row flex-center text-center">
              <div className="col-12">
                <h1 className="title">Your Way to Control Your Diet</h1>
              </div>
              <div className="col-12 description">
                <h1 className="title">Your daily Diet</h1>
                <h4 className="title">
                  <span className="calories">{existingCalories}</span> calories
                  per day.
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className=" m-3 flex-column-css">
          <div className="flex-center align-items-start meals-background row">
            <div className="regenerate d-flex flex-column align-items-center justify-content-center">
              <h1 className="title">Your Daily Meal</h1>
              {loading && (
                <Box sx={{ maxHeight: 40 }}>
                  <Fade
                    in={loading}
                    style={{
                      transitionDelay: loading ? "800ms" : "0ms",
                    }}
                    unmountOnExit
                  >
                    <CircularProgress style={{ color: "rgba(93,175,47,1)" }} />
                  </Fade>
                </Box>
              )}
              {!loading && (
                <Button
                  style={{ height: 40, color: "rgba(93,175,47,1)" }}
                  onClick={handleClickLoading}
                >
                  Regenerate
                </Button>
              )}
            </div>

            {breakfast && lunch && dinner ? (
              <>
                <div className="col-12 col-md-5 col-lg-4 p-3 flex-column-css">
                  <h4 style={{ color: "#F96666" }}>Breakfast</h4>
                  {!breakfastLoader ? (
                    <Tooltip
                      title={
                        isBreakfastSaved ? "Click to Unlock" : "Click to Lock"
                      }
                      followCursor
                      onClick={(e) => LockMeal("breakfast", e)}
                    >
                      <div
                        className="w-100 m-2 p-3 meals meals-breakfast flex-column-css align-items-start justify-content-between "
                        style={{
                          backgroundColor:
                            isBreakfastSaved && "rgb(249, 102, 102, 0.75)",
                        }}
                      >
                        <div
                          className={
                            "w-100 my-2 flex-center " +
                            (isBreakfastSaved ? "blurred" : "")
                          }
                        >
                          <ImageEffect
                            className={isBreakfastSaved && "bluurred"}
                            meal={breakfast}
                          />
                        </div>
                        {isBreakfastSaved && (
                          <div className="save-icon flex-center">
                            <BsFillBookmarkPlusFill
                              onClick={(e) => SaveMeal(e)}
                              size={50}
                              style={{
                                filter:
                                  "drop-shadow(0 0 0.75rem rgb(249, 102, 102, 1))",
                              }}
                            />
                          </div>
                        )}
                        <h4 className={isBreakfastSaved ? "blurred" : ""}>
                          {breakfast.name}
                        </h4>
                        <p className={isBreakfastSaved ? "blurred" : ""}>
                          Calories: <b>{breakfast.calories} calories</b>
                        </p>
                      </div>
                    </Tooltip>
                  ) : (
                    <SkeletonComponent />
                  )}
                </div>

                <div className="col-12 col-md-5 col-lg-4 p-3 flex-column-css">
                  <h4 style={{ color: "#674747" }}>Lunch</h4>
                  {!lunchLoader ? (
                    <Tooltip
                      title={isLunchSaved ? "Click to Unlock" : "Click to Lock"}
                      followCursor
                      onClick={(e) => LockMeal("lunch", e)}
                    >
                      <div
                        className="w-100 m-2 p-3 meals meals-lunch flex-column-css align-items-start"
                        style={{
                          backgroundColor:
                            isLunchSaved && "rgb(103, 71, 71, 0.75)",
                        }}
                      >
                        <div
                          className={
                            "w-100 my-2 flex-center " +
                            (isLunchSaved ? "blurred" : "")
                          }
                        >
                          <ImageEffect
                            className={isLunchSaved ? "blurred" : ""}
                            meal={lunch}
                          />
                        </div>
                        {isLunchSaved && (
                          <div className="save-icon flex-center">
                            <BsFillBookmarkPlusFill
                              onClick={(e) => SaveMeal(e)}
                              size={50}
                              style={{
                                filter:
                                  "drop-shadow(0 0 0.75rem rgb(103, 71, 71, 1))",
                              }}
                            />
                          </div>
                        )}
                        <h4 className={isLunchSaved ? "blurred" : ""}>
                          {lunch.name}
                        </h4>
                        <p className={isLunchSaved ? "blurred" : ""}>
                          Calories: <b>{lunch.calories} calories</b>
                        </p>
                      </div>
                    </Tooltip>
                  ) : (
                    <SkeletonComponent />
                  )}
                </div>

                <div className="col-12 col-md-5 col-lg-4 p-3 flex-column-css">
                  <h4 style={{ color: "#829460" }}>Dinner</h4>
                  {!dinnerLoader ? (
                    <Tooltip
                      title={
                        isDinnerSaved ? "Click to Unlock" : "Click to Lock"
                      }
                      followCursor
                      onClick={(e) => LockMeal("dinner", e)}
                    >
                      <div
                        className="w-100 m-2 p-3 meals meals-dinner flex-column-css align-items-start"
                        style={{
                          backgroundColor:
                            isDinnerSaved && "rgb(130, 148, 96, 0.75)",
                        }}
                      >
                        <div
                          className={
                            "w-100 my-2 flex-center " +
                            (isDinnerSaved ? "blurred" : "")
                          }
                        >
                          <ImageEffect
                            className={isDinnerSaved ? "blurred" : ""}
                            meal={dinner}
                          />
                        </div>
                        {isDinnerSaved && (
                          <div className="save-icon flex-center">
                            <BsFillBookmarkPlusFill
                              onClick={(e) => SaveMeal(e)}
                              size={50}
                              style={{
                                filter:
                                  "drop-shadow(0 0 0.75rem rgb(130, 148, 96, 1))",
                              }}
                            />
                          </div>
                        )}
                        <h4 className={isDinnerSaved ? "blurred" : ""}>
                          {dinner.name}
                        </h4>
                        <p className={isDinnerSaved ? "blurred" : ""}>
                          Calories: <b>{dinner.calories} calories</b>
                        </p>
                      </div>
                    </Tooltip>
                  ) : (
                    <SkeletonComponent />
                  )}
                </div>

                <div className="col-12 col-md-5 col-lg-4 p-3 flex-column-css">
                  <h4 style={{ color: "#FF8400" }}>Snack</h4>
                  {!snackLoader ? (
                    <Tooltip
                      title={
                        isSnackSaved ? "Click to Unlock" : "Click to Lock"
                      }
                      followCursor
                      onClick={(e) => LockMeal("snack", e)}
                    >
                      <div
                        className="w-100 m-2 p-3 meals meals-snack flex-column-css align-items-start"
                        style={{
                          backgroundColor:
                            isSnackSaved && "rgb(255, 132, 0, 0.75)",
                        }}
                      >
                        <div
                          className={
                            "w-100 my-2 flex-center " +
                            (isSnackSaved ? "blurred" : "")
                          }
                        >
                          <ImageEffect
                            className={isSnackSaved ? "blurred" : ""}
                            meal={snack}
                          />
                        </div>
                        {isSnackSaved && (
                          <div className="save-icon flex-center">
                            <BsFillBookmarkPlusFill
                              onClick={(e) => SaveMeal(e)}
                              size={50}
                              style={{
                                filter:
                                  "drop-shadow(0 0 0.75rem rgb(255, 132, 0, 1))",
                              }}
                            />
                          </div>
                        )}
                        <h4 className={isSnackSaved ? "blurred" : ""}>
                          {dinner.name}
                        </h4>
                        <p className={isSnackSaved ? "blurred" : ""}>
                          Calories: <b>{snack.calories} calories</b>
                        </p>
                      </div>
                    </Tooltip>
                  ) : (
                    <SkeletonComponent />
                  )}
                </div>
              </>
            ) : (
              <div className="container flex-center">
                <Box className="m-5" sx={{ width: "100%" }}>
                  <LinearProgress style={{ color: "rgba(93,175,47,1)" }} />
                </Box>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Diets;
