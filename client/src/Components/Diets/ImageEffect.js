import React from 'react'

import "./ImageEffect.css"

const ImageEffect = (props) => {   
  return (
    <div className="flex-center cont_photo">
        <div className="flex-center cont_img_back">
            {props.meal.url 
              ? <img src={props.meal.url} alt="" />
              : <img src={'https://webknox.com/recipeImages/'+props.meal.url+'-556x370.jpg'} alt="" />
            }
        </div>
    </div>
  )
}

export default ImageEffect