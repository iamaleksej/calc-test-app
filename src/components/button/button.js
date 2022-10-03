import React from 'react';
import { Loader } from '../loader'
import './button.sass'

const Button = ({ titleBtn, disabled, loader }) => {
   return (
      <button className="btn"
         type="submit"
         disabled={disabled}
      >
         {!loader ? titleBtn : <Loader />}
         {/* <Loader /> */}
      </button>
   )
}

export default Button;
