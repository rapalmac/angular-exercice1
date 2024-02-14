import { Injectable } from "@angular/core";
import { Student } from "../model/model";
import { BaseService } from "./base.service";
import { getItemIndexByCode } from "../util/util";

@Injectable({
    providedIn: "root"
})
export class StudentService implements BaseService<Student> {
    private studentList:Student[]

    constructor() {
        this.studentList = [];
    }
    
    add(student:Student) {
        this.studentList.push(student);
    }

    update(student: Student): Student {
        let index = getItemIndexByCode(this.studentList, student.code);
        console.log(this.studentList, student.code, index);
        if (index >= 0) {
            let newRecord = this.studentList[index];
            newRecord.name = student.name;
            this.studentList[index] = newRecord;

            return newRecord;
        }

        throw new Error("Code does not exists.");
    }

    list(): Student[] {
        return this.studentList.slice();
    }

    getIndexByCode(code: string): number {
       return  getItemIndexByCode(this.studentList, code);
    }

    findByCode(code: string): Student {
        let student = this.studentList.find(s => s.code == code);

        if (student) {
            return student;
        }

        throw new Error("Code does not exists.");
    }
}