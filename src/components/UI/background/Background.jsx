import React from 'react'
import classes from "./Background.module.scss";


const Background = () => {
  return (
      <div className={classes.background}>
          <div className={classes.green}></div>
          <div className={classes.greenDark}></div>
          <div className={classes.greenDark}></div>
          <div className={classes.green}></div>
      </div>
  )
}

export default Background;