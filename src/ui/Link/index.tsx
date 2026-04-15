import style from "./style.module.css";

interface LinkerProps {
  text: string;
  href?: string;
}

function Linker({ text, href }: LinkerProps) {
  const linkHref = href ? `#${href}` : `#${text}`;

  return (
    <a
      href={linkHref}
      className={`${style.link} hvr-underline-from-left`}
    >
      {text.toUpperCase()}
    </a>
  );
}

export { Linker };
