import React from 'react'
import NutritionCalc from '../NutritionCalc/NutritionCalc'
import './Main.css'

const Main = () => {
  return (
    <div className='container main-position'>
        <div className='container flex-center bg-container title-text '>
            <div className='container flex-center row'>
                <div className='container row flex-center text-center'>
                    <div className='col-12'>
                        <h1 className='title'>Your Way to Control Your Diet</h1>
                    </div>
                    <div className='col-12 description'>
                        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus scelerisque lobortis rhoncus. Proin luctus, 
                            erat ut pharetra porttitor, est sem vehicula nibh, sed ullamcorper nisl risus vitae est. Donec blandit leo ligula.
                            Suspendisse quis tellus eu neque blandit ullamcorper et elementum quam. Fusce ac porta dolor, non dapibus arcu. 
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tempus ullamcorper nulla et dictum.</p>
                    </div>
                </div>
            </div>
        </div>
        <div className='calories-calc'>

        <div className='container flex-center'>
            <NutritionCalc />
        </div>

        </div>
        <div className='container app-desc flex-column-css'>
                <div className='row'><h1 className='col-12 title col-12'>Bell Pepper</h1></div>
                <div className='row mt-5'>
                    <div className='col-sm-12 col-md-6 app-desciptions flex-column-css'>
                        <img className='logo-size' src={require("../../Logos/logo/logo-green.png")} />
                        <h5>Schedule Your Day's Food</h5>
                        <p className='desc-textarea'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus scelerisque lobortis rhoncus. Proin luctus</p>
                    </div>
                    <div className='col-sm-12 col-md-6 app-desciptions flex-column-css'>
                        <img className='logo-size' src={require("../../Logos/logo/logo-green.png")} />
                        <h5>Schedule Your Day's Food</h5>
                        <p className='desc-textarea'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus scelerisque lobortis rhoncus. Proin luctus</p>
                    </div>
                </div>
                <div className='row mt-5'>
                    <div className='col-sm-12 col-md-6 app-desciptions flex-column-css'>
                        <img className='logo-size' src={require("../../Logos/logo/logo-green.png")} />
                        <h5>Schedule Your Day's Food</h5>
                        <p className='desc-textarea'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus scelerisque lobortis rhoncus. Proin luctus</p>
                    </div>
                    <div className='col-sm-12 col-md-6 app-desciptions flex-column-css'>
                        <img className='logo-size' src={require("../../Logos/logo/logo-green.png")} />
                        <h5>Schedule Your Day's Food</h5>
                        <p className='desc-textarea'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus scelerisque lobortis rhoncus. Proin luctus</p>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default Main