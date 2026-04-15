import styles from "./styles.module.css";

interface SocialButtonProps {
  font: string;
  url: string;
}

export const SocialBotton = ({ font, url }: SocialButtonProps) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <i className={font} style={{ color: "#fff" }} />
    </a>
  );
};
