export class Student {
    code:string;
    name:string;

    constructor() {
        this.code = "";
        this.name = "";
    }
}

export enum CourseLevel {
    BEGGINER, INTERMEDIATE, ADVANCED
}

export class Course {
    code!:string;
    name!:string;
    description!:string;
    level!:CourseLevel;
    students?:Student[];

    constructor() {
        this.students = [];
    }
}

export class Project {
    code!:string;
    name!:string;
    students?:Student[];

    constructor() {
        this.students = [];
    }
}
