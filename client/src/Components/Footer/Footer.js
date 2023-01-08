import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput
} from 'mdb-react-ui-kit';
import "./Footer.css"
import Button from "@mui/material/Button"
import {FiFacebook, FiTwitter, FiLinkedin, FiGithub, FiInstagram} from 'react-icons/fi'
import fullLogo from "../../Logos/full logo/green.png";

export function Footer() {
  return (
    <MDBFooter bgColor='light' className='footer text-center text-lg-left d-flex flex-column'>
      <MDBContainer className='footer-media'>
        <form action=''>
          <MDBRow className='d-flex justify-content-center p-3'>
            <MDBCol size='auto' className='mb-2'>
              <img alt='full-logo' src={fullLogo} className='img-responsive' />
            </MDBCol>
            <MDBCol size='auto' className='mb-2'>
              <p className='pt-2'>
                <strong>Sign up for our newsletter</strong>
              </p>
            </MDBCol>

            <MDBCol md='5' size='12' className='mb-2'>
              <MDBInput type='text' id='form5Example2' placeholder='Email address' />
            </MDBCol>

            <MDBCol size='auto' className='mb-2'>
              <Button sx={{color: "rgba(93,175,47,1)"}}>Subscribe</Button>
            </MDBCol>
          </MDBRow>
        </form>
        <section className="d-flex align-items-center justify-content-between">
          <img alt='full-logo' src={fullLogo} className='img-responsive' />
          <div className='d-flex align-items-center justify-content-center'>

            <div className="border-hover"><a href="#" className="cool-link text-dark mx-2">Contact Us</a></div>
            <div className="border-hover"><a href="#" className="cool-link text-dark mx-2">About Us</a></div>
            <div className="border-hover"><a href="#" className="cool-link text-dark mx-2">Our Team</a></div>
              
          </div>
          <div className='d-flex align-items-center justify-content-center'>
          <a
            class="spin circle btn btn-link btn-floating btn-lg text-dark "
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
            ><FiFacebook /></a>

          <a
            class="spin circle btn btn-link btn-floating btn-lg text-dark "
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
            ><FiTwitter /></a>


          <a
            class="spin circle btn btn-link btn-floating btn-lg text-dark "
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
            ><FiInstagram /></a>

          <a
            class="spin circle btn btn-link btn-floating btn-lg text-dark "
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          ><FiLinkedin /></a>
          <a
            class="spin circle btn btn-link btn-floating btn-lg text-dark "
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
            ><FiGithub /></a>
            </div>
        </section>
      </MDBContainer>
    </MDBFooter>
  )
}