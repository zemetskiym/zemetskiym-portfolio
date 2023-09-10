import styles from "../styles/components/ProjectList.module.css";
import projects from "../../public/json/projects.json";
import Image from "next/image";
import Link from "next/link";

export default function ProjectList(): JSX.Element {
    return (
        <section id={styles.projectList}>
            <h2 id={styles.subheading}>Projects</h2>
            <ul id={styles.imageList}>
                {projects.map(project => 
                    <Link key={project.id} href={`/projects/${project.id}`}>
                    <Image src={project.images[0]} sizes="242.5px" style={{width: '242.5px', height: 'auto'}} height={136.4} width={242.5} alt={project.title} className={styles.images} key={project.id} />
                    </Link>
                )}
            </ul>
        </section>
    )
}
