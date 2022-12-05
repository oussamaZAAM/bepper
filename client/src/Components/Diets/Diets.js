import React from 'react'

const Diets = () => {
    const existingCalories = localStorage.getItem('calories')
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
    </div>
  )
}

export default Diets