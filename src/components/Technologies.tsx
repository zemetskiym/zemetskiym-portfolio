import styles from "../styles/components/Technologies.module.css";
import Image from "next/image";

export default function Technologies (): JSX.Element {
    const iconSize = 40;

    function Icon({name}: {name: string}): JSX.Element {
        return (
            <li className={styles.icons} title={name}><Image src={`/icons/technologies/${name.toLowerCase()}.svg`} height={iconSize} width={iconSize} alt={name} /></li>
        )
    }

    const iconList = [
        "HTML", "CSS", "JavaScript", "TypeScript", "Markdown", "Python", "Bash", "Tailwind", "React", "Nextjs", 
        "Jest", "D3js", "Figma", "Git", "Nodejs", "Vim", "VSCode", "Linux", "Archlinux"
    ]

    return (
        <section id={styles.technologies}>
            <h2 id={styles.subheading}>Technologies</h2>
            <ul id={styles.technologyList}>
               {iconList.map(icon => <Icon name={icon} key={icon} />)} 
            </ul>
        </section>
    )
}
