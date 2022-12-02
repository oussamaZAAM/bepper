import React from 'react'

const Footer2 = () => {
  return (
      <div className='text-center footer-fixed' style={{ color: 'white',backgroundColor: 'rgba(93,175,47,0.75)' }}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-dark' href='https://bepper.com/'>
          Bepper.com
        </a>
      </div>
  )
}

export default Footer2