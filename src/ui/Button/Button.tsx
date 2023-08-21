import style from "./style.module.css";


function Button({ children }: any) {
  return (
    <button className={style.button}>
      {children}
    </button>
  );
}

export { Button };
