import React from "react";
import { ThreeDots } from "react-loader-spinner";
import styles from './Loader.module.css';

export default function Loader() {
  return (
    
    <div className={styles.loaderBox}>
      <ThreeDots
        visible={true}
        height='30px'
        width='100px'
        ariaLabel="three-dots-loading"
        wrapperClassName='wrapperClass'
        wrapperStyle={{}}
        color="#A99999"
        radius="9"
      />
      </div>
    
  );
}