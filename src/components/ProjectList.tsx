import styles from "../styles/components/ProjectList.module.css";
import projects from "../../public/json/projects.json";
import Image from "next/image";
import Link from "next/link";

export default function Projects(): JSX.Element {
    return (
        <section>
            <h1>Projects</h1>
            <ul>
                {projects.map(project => 
                    <Link href={`/projects/${project.id}`}>
                    <Image src={project.images[0]} height={100} width={200} alt={project.title} className={styles.images} key={project.id} />
                    </Link>
                )}
            </ul>
        </section>
    )
}
