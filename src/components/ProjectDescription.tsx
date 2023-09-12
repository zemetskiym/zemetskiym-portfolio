import styles from '../styles/components/ProjectDescription.module.css';
import Image from 'next/image';
import { Marked } from 'marked';
import { useState } from 'react';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

export default function ProjectDescription ({title, images, markdownFile}: {title: string, images: Array<string>, markdownFile: string}): JSX.Element { 
    const [markdownContent, setMarkdownContent] = useState<string | Promise<string>>('');
    
    const marked = new Marked(
        markedHighlight({
            langPrefix: 'hljs language-',
            highlight(code, lang) {
                const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                return hljs.highlight(code, { language }).value;
            }
        })
    );
 
    fetch(`${markdownFile}`)
        .then((response) => response.text())
        .then((data) => {
            setMarkdownContent(marked.parse(data));
        })
        .catch((error) => {console.log(error);})
    
    return (
        <section id={styles.projectDescription}>
            <span id={styles.imageGallery}>
                {images.map(image => 
                    <Image
                        key={image}
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
                {typeof markdownContent == "string" && 
                    <div dangerouslySetInnerHTML={{ __html: markdownContent }} />
                }
            </span>
        </section>
    );
};
