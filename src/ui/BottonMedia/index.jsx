import styles from "./styles.module.css"
export const SocialBotton = ({ font, url }) => {
    return (
        <a href={`${url}`}>
            <i className={`${font}`} style={{ color: "#fff" }}></i>
        </a>
    )

}