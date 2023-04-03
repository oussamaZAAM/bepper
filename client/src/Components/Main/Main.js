import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";

import NutritionCalc from "../NutritionCalc/NutritionCalc";
import "./Main.css";

const Main = () => {
  const existingCalories = localStorage.getItem("calories");
  const [isDietExist, setIsDietExist] = useState(existingCalories);
  const navigate = useNavigate();
  const changeDiet = () => {
    localStorage.removeItem("calories");
    localStorage.removeItem("breakfast");
    localStorage.removeItem("lunch");
    localStorage.removeItem("dinner");
    setIsDietExist(false);
  };
  return (
    <div className="container main-position">
      <div className="container flex-center bg-container title-text ">
        <div className="container flex-center row">
          <div className="container row flex-center text-center">
            <div className="col-12">
              <h1 className="title">Your Way to Control Your Diet</h1>
            </div>
            <div className="col-12 description">
              <p>
                Welcome to our Bepper website! We're here to help you achieve
                your health and fitness goals by providing you with the tools
                and resources you need to plan your meals and track your food
                intake. We believe that healthy eating should be enjoyable and
                sustainable, which is why we offer a variety of recipes that are
                both delicious and nutritious.
                <br />
                Whether you're looking for quick and easy meals or more
                elaborate dishes for special occasions, we have something for
                everyone.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="calories-calc">
        {!isDietExist ? (
          <div className="container flex-center">
            <NutritionCalc />
          </div>
        ) : (
          <div className="container flex-center row">
            <div className="container row flex-center text-center">
              <div className="col-12">
                <h1 className="title">Your daily Diet</h1>
              </div>
              <h4 className="title">
                <span className="calories">{existingCalories}</span> calories
                per day.
              </h4>
              <div className="container row flex-column-css">
                <Button
                  onClick={() => navigate("/diets")}
                  variant="outlined"
                  className="m-2 col-sm-12 col-md-6 col-lg-4"
                  color="success"
                >
                  Check your Diet
                </Button>
                <Button
                  onClick={changeDiet}
                  variant="contained"
                  className="m-2 col-sm-12 col-md-6 col-lg-4"
                  color="success"
                >
                  Change your daily Diet
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="container app-desc flex-column-css">
        <div className="row">
          <h1 className="col-12 title col-12">Bell Pepper</h1>
        </div>
        <div className="row mt-5">
          <div className="col-sm-12 col-md-6 app-desciptions flex-column-css">
            <img
              alt="normal-logo"
              className="logo-size"
              src={require("../../Logos/logo/logo-green.png")}
            />
            <h5 className="title">Calculate your daily intake</h5>
            <p className="desc-textarea">
              Calculate the daily calories intake to ensure you're staying on
              track with your nutrition goals.
            </p>
          </div>
          <div className="col-sm-12 col-md-6 app-desciptions flex-column-css">
            <img
              alt="normal-logo"
              className="logo-size"
              src={require("../../Logos/logo/logo-green.png")}
            />
            <h5 className="title">Plan your daily meals</h5>
            <p className="desc-textarea">
              Our meal planner tool is designed to make meal planning simple and
              easy.
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-sm-12 col-md-6 app-desciptions flex-column-css">
            <img
              alt="normal-logo"
              className="logo-size"
              src={require("../../Logos/logo/logo-green.png")}
            />
            <h5 className="title">Customize your meal</h5>
            <p className="desc-textarea">
              While we offer you a variety of meals based on the daily need of
              calories, you still have the option to customize your daily meal
              by changing the meals you don't like
            </p>
          </div>
          <div className="col-sm-12 col-md-6 app-desciptions flex-column-css">
            <img
              alt="normal-logo"
              className="logo-size"
              src={require("../../Logos/logo/logo-green.png")}
            />
            <h5 className="title">Track and save your meals</h5>
            <p className="desc-textarea">
                We also offer a food tracking feature that allows you to log your daily food intake and adjust your saved meals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
