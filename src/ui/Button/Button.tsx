import type { ReactNode } from "react";
import style from "./style.module.css";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
}

const Button = ({ children, href, onClick }: ButtonProps) => {
  if (href) {
    return (
      <a className={style.button} href={href}>
        {children}
      </a>
    );
  }

  return (
    <button className={style.button} onClick={onClick}>
      {children}
    </button>
  );
};

export { Button };
