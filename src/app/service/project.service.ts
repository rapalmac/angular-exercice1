import { Injectable } from "@angular/core";
import { Project, Student } from "../model/model";
import { BaseService } from "./base.service";
import { getItemIndexByCode } from "../util/util";

@Injectable({
    providedIn: "root"
})
export class ProjectService implements BaseService<Project> {
    private projectList:Project[]

    constructor() {
        this.projectList = [];
    }
    
    add(Project:Project) {
        this.projectList.push(Project);
    }

    update(Project: Project): Project {
        let index = getItemIndexByCode(this.projectList, Project.code);
        console.log(this.projectList, Project.code, index);
        if (index >= 0) {
            let newRecord = this.projectList[index];
            newRecord.name = Project.name;
            this.projectList[index] = newRecord;

            return newRecord;
        }

        throw new Error("Code does not exists.");
    }

    list(): Project[] {
        return this.projectList.slice();
    }

    getIndexByCode(code: string): number {
       return  getItemIndexByCode(this.projectList, code);
    }

    findByCode(code: string): Project {
        let Project = this.projectList.find(s => s.code == code);

        if (Project) {
            return Project;
        }

        throw new Error("Code does not exists.");
    }

    addStudent(project:Project, student:Student):Project {
        let index = getItemIndexByCode(this.projectList, project.code);
        if (index >= 0) {
            let array = this.projectList[index].students;
            if (!array) {
                this.projectList[index].students = [student];                
            } else {
                this.projectList[index].students?.push(student);
            }
            return this.projectList[index];
        }
        throw new Error("Code does not exists.");
    }
}