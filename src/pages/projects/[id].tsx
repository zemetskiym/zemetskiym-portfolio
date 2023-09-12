import projects from '../../../public/json/projects.json';
import { GetStaticPropsContext } from 'next';
import Breadcrumb from '../../components/Breadcrumb';
import ProjectDescription from '../../components/ProjectDescription';

// Define a function to generate static paths for dynamic routes
export const getStaticPaths = async () => {
    // Map the data to create paths for each project
    const paths = projects.map(project => 
        {
            return {params: { id: project.id.toString() }};
        }
    );
    
    return {
        paths, // Specify the paths to pre-render
        fallback: false // 404 if the requested path doesn't match any of the pre-rendered paths
    };
};

// Define a function to fetch static props for a specific project
export const getStaticProps = async (context: GetStaticPropsContext) => {
    const id = context!.params!.id; // Collect the index of the project based on the parameter

    return {
        props: {project: projects[Number(id) - 1] } // Pass the project data as props to the component
    };
};

type Project = {id: number; title: string; link: string; images: Array<string>; markdownFile: string}

// Define the ProjectId functional component
const ProjectId = ({project}: {project: Project}) => {
    const breadcrumbsData = [
        {label: 'Matthew Zemetskiy', url: '/'},
        {label: 'Projects', url: null},
        {label: project.id.toString(), url: `/projects/${project.id}`}
    ];

    return (
        <>
        <Breadcrumb breadcrumbs={breadcrumbsData} />
        <ProjectDescription title={project.title} link={project.link} images={project.images} markdownFile={project.markdownFile} />
        </>
    );
};

export default ProjectId;
