import style from "./style.module.css";
// import styled from "styled-components";
interface ButtonProps {
  children: any;
  fn: ()=>any;
}

function Button({ children, fn }: any) {
  const handleClick=()=>{
    fn()
  }
  return (
    <button className={style.button} onClick={handleClick}>
      {children}
    </button>
  );
}


export { Button };
