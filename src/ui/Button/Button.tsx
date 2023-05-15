import style from "./style.module.css";


function Button({ children }: any) {
  function hola() {
    console.log("Hola");
  }
  return (
    <button onClick={hola} className={style.button}>
      {children}
    </button>
  );
}

export { Button};
