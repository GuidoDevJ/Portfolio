import style from "./style.module.css";
interface Btn {
  text: String;
}

function Buttone({ children }: any) {
  function hola() {
    console.log("Hola");
  }
  return (
    <button onClick={hola} className={style.button}>
      {children}
    </button>
  );
}

export { Buttone };
