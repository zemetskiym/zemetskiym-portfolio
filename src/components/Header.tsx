import styles from "../styles/components/Header.module.css";
import Globe from "./Globe";

export default function Header (): JSX.Element {
    return (
        <header id={styles.header}>
            <Globe />
        </header>
    );
};
