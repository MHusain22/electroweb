import React from 'react'
import classes from './Button.module.css'

const Button = (props) => {
  return (
    <button className={classes.but}>{props.children}</button>
  )
}

export default Button