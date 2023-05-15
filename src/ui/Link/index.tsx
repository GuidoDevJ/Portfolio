import style from "./style.module.css"
interface link {
  text: string;
}
function Linker({ text }: link) {
  return <a href={`#${text}`} className={`${style.link} hvr-underline-from-left`}>{text.toUpperCase()}</a>;
}
export { Linker };
