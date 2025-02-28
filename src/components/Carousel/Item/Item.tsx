import styles from "../style.module.css";
export const CarouselItem=({ imgUrl, imgTitle }:{imgUrl:any, imgTitle:string}) =>{
    return (
      <div className= {`${styles.card}`}>
        <img src={imgUrl.src} alt={imgTitle}></img>
      </div>
    );
  }
