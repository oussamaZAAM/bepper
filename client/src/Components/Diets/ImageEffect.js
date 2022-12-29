import React from 'react'
import "./ImageEffect.css"

const ImageEffect = (props) => {
    console.log(props)
   
  return (
    <div className="flex-center cont_photo">
        <div className="flex-center cont_img_back">
            <img src={'https://webknox.com/recipeImages/'+props.meal.id+'-556x370.jpg'} alt="" />
        </div>
    </div>
  )
}

export default ImageEffect