import { Component, inject } from '@angular/core';
import { importMatComponents } from '../material/material.importer';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentService } from '../service/student.service';
import { CourseService } from '../service/course.service';
import { Course, Student } from '../model/model';
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-students-by-course',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, importMatComponents()],
  templateUrl: './students-by-course.component.html',
  styleUrl: './students-by-course.component.css'
})
export class StudentsByCourseComponent {
  studentService:StudentService = inject(StudentService);
  courseService:CourseService = inject(CourseService);
  availableStudents:Student[];
  availableCourses:Course[];
  selectedCourse!:Course;
  formGroup:any;
  columnsToDisplay = ["code", "name"];
  dataSource:MatTableDataSource<Student>;  

  constructor(fb:FormBuilder) {
    this.availableCourses = this.courseService.list();
    this.availableStudents = this.studentService.list(); 

    this.formGroup = fb.group({
      student: ["", {
        validators: [Validators.required]
      }],
      course: ["", {
        validators: [Validators.required]
      }]
    });

    if (this.availableCourses.length > 0) {
      this.selectedCourse = this.availableCourses[0];
      this.formGroup.get("course").setValue(this.selectedCourse);
    }

    this.dataSource = new MatTableDataSource(this.availableCourses.length > 0 ? this.availableCourses[0].students : []);
  }

  onCourseChanges() {
    this.selectedCourse = this.formGroup.value.course;
    this.dataSource.data = this.selectedCourse.students ?? [];
  }

  onFormSubmit() {
    let course = this.formGroup.value.course;
    let student = this.formGroup.value.student;

    let updatedCourse = this.courseService.addStudent(course, student);
    this.dataSource.data = updatedCourse.students ?? [];
  }
}
