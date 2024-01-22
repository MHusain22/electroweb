import React from 'react'
import classes from './Button.module.css'

const Buttonb = (props) => {
    return (
        <button className={classes.butb}>{props.children}</button>
      )
}

export default Buttonb