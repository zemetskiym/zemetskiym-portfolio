import styles from "../styles/components/Header.module.css";
import Globe from "./Globe";
import Link from "next/link";

export default function Header (): JSX.Element {
    return (
        <header id={styles.header}>
            <h1 id={styles.title}>Matthew Zemetskiy</h1>
            <div id={styles.globeContainer}>
                <Globe />
            </div>
            <hr id={styles.hr} />
            <ul id={styles.contacts}>
                <li><Link href="mailto:zemetskiym@proton.me" target="_blank">zemetskiym@proton.me</Link></li>
                <li><Link href="https://github.com/zemetskiym" target="_blank">github.com/zemetskiym</Link></li>
                <li><Link href="https://www.linkedin.com/in/matthew-zemetskiy/" target="_blank">linkedin.com/in/matthew-zemetskiy</Link></li>
            </ul>
        </header>
    );
};
