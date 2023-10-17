import React from 'react';
import classes from "./notFound.module.css"

const NotFound = () => {
  return (
    <div className={classes.wrapper} >
      <div className={classes.error}>
        <div className={classes.number}>4</div>
        <div className={classes.illustration}>
          <div className={classes.circle}></div>
          <div className={classes.clip}>
            <div className={classes.paper}>
              <div className={classes.face}>
                <div className={classes.eyes}>
                  <div className={classes.leye}></div>
                  <div className={classes.reye}></div>
                </div>
                <div className={classes.lrosyCheeks}></div>
                <div className={classes.rrosyCheeks}></div>
                <div className={classes.mouth}></div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.number}>4</div>
      </div>

      <div className={classes.text}>Упс... страница не найдена</div>

    </div>
  )
}

export default NotFound
