import styles from '../styles/components/ProjectDescription.module.css';
import Image from 'next/image';
import { marked } from 'marked';
import { useState } from 'react';

export default function ProjectDescription ({title, images, markdownFile}: {title: string, images: Array<string>, markdownFile: string}): JSX.Element { 
    const [markdownContent, setMarkdownContent] = useState('');
    
    fetch(`${markdownFile}`)
        .then((response) => response.text())
        .then((data) => {
            setMarkdownContent(marked.parse(data))
        })
        .catch((error) => {console.log(error)})
    
    return (
        <section id={styles.projectDescription}>
            <span id={styles.imageGallery}>
                {images.map(image => 
                    <Image
                        onClick={() => window.open(image, '_blank')}
                        className={styles.image} 
                        src={image}     
                        style={{width: "auto", height: "200px"}} 
                        sizes="400 (max:width: 1410) 95vw" 
                        height={300} 
                        width={400} 
                        alt="" 
                    />
                )}
            </span>
            <span id={styles.description}>
                <h1 id={styles.title}>{title}</h1>
                <div dangerouslySetInnerHTML={{ __html: markdownContent }} />
            </span>
        </section>
    );
};
