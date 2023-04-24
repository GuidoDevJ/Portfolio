interface link {
  text: string;
}
function Link({ text }: link) {
  return <a href={`#${text}`}>{text.toLocaleUpperCase()}</a>;
}
export { Link };
