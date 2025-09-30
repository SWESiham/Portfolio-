export interface IProject {
    title: string;
    description: string;
    language: string[];     
    imgURL: string;
    githubUrl: string;
    demo: string;
    status: "completed" | "in_progress" | "soon" | "private";  
    category: string;
    _id:string
}
