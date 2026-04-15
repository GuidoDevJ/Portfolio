import style from "./style.module.css";

const Down = () => {
  return (
    <div className={style.container}>
      <img src="/assets/Down.svg" alt="Scroll down" width="50px" className={style.down} />
      <img src="/assets/Down.svg" alt="" width="50px" className={style.down} />
    </div>
  );
};

export { Down };
