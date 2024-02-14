import { Injectable } from "@angular/core";
import { Course, Student } from "../model/model";
import { BaseService } from "./base.service";
import { getItemIndexByCode } from "../util/util";
import { core } from "@angular/compiler";

@Injectable({
    providedIn: "root"
})
export class CourseService implements BaseService<Course> {
    private courseList:Course[]

    constructor() {
        this.courseList = [];
    }
    
    add(Course:Course) {
        this.courseList.push(Course);
    }

    update(course: Course): Course {
        let index = getItemIndexByCode(this.courseList, course.code);
        if (index >= 0) {
            let newRecord = this.courseList[index];
            newRecord.name = course.name;
            newRecord.description = course.description;
            newRecord.level = course.level;
            this.courseList[index] = newRecord;

            return newRecord;
        }

        throw new Error("Code does not exists.");
    }

    list(): Course[] {
        return this.courseList.slice();
    }

    getIndexByCode(code: string): number {
       return  getItemIndexByCode(this.courseList, code);
    }

    findByCode(code: string): Course {
        let Course = this.courseList.find(s => s.code == code);

        if (Course) {
            return Course;
        }

        throw new Error("Code does not exists.");
    }

    addStudent(course:Course, student:Student):Course {
        let index = getItemIndexByCode(this.courseList, course.code);
        if (index >= 0) {
            let array = this.courseList[index].students;
            if (!array) {
                this.courseList[index].students = [student];                
            } else {
                this.courseList[index].students?.push(student);
            }
            return this.courseList[index];
        }
        throw new Error("Code does not exists.");
    }
}