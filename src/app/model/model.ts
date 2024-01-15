export class Student {
    studentCode:string;
    studentName:string;

    constructor() {
        this.studentCode = "";
        this.studentName = "";
    }
}

export enum CourseLevel {
    BEGGINER, INTERMEDIATE, ADVANCED
}

export class Course {
    courseCode!:string;
    courseName!:string;
    courseDescription!:string;
    courseLevel!:CourseLevel;
}

export interface Project {
    projectCode:string;
    projectName:string;
}