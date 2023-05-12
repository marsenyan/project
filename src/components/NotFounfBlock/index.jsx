import React from 'react';

import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock = () => {
    return(
        <div>
          <h1 className={styles.root}>
            <span>😕</span>
            <br />
            Nada encontrado 
          </h1>
          <p className={styles.description}>
            Desafortunadamente, esta página web no está disponible en nuestra tienda en linea

          </p>
        </div>
    )
}
export default NotFoundBlock;