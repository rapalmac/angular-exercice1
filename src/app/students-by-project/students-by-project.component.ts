import { Component, inject } from '@angular/core';
import { importMatComponents } from '../material/material.importer';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentService } from '../service/student.service';
import { CourseService } from '../service/course.service';
import { Course, Project, Student } from '../model/model';
import { MatTableDataSource } from "@angular/material/table";
import { ProjectService } from '../service/project.service';

@Component({
  selector: 'app-students-by-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, importMatComponents()],
  templateUrl: './students-by-project.component.html',
  styleUrl: './students-by-project.component.css'
})
export class StudentsByProjectComponent {
  studentService:StudentService = inject(StudentService);
  projectService:ProjectService = inject(ProjectService);
  availableStudents:Student[];
  availableCourses:Project[];
  selectedProject!:Project;
  formGroup:any;
  columnsToDisplay = ["code", "name"];
  dataSource:MatTableDataSource<Student>;  

  constructor(fb:FormBuilder) {
    this.availableCourses = this.projectService.list();
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
      this.selectedProject = this.availableCourses[0];
      this.formGroup.get("course").setValue(this.selectedProject);
    }

    this.dataSource = new MatTableDataSource(this.availableCourses.length > 0 ? this.availableCourses[0].students : []);
  }

  onCourseChanges() {
    this.selectedProject = this.formGroup.value.course;
    this.dataSource.data = this.selectedProject.students ?? [];
  }

  onFormSubmit() {
    let course = this.formGroup.value.course;
    let student = this.formGroup.value.student;

    let updatedCourse = this.projectService.addStudent(course, student);
    this.dataSource.data = updatedCourse.students ?? [];
  }
}
