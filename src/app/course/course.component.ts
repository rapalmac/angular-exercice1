import { Component } from '@angular/core';
import { Course, CourseLevel } from '../model/model';
import { FormsModule } from '@angular/forms';
import { TableComponent } from "../table/table.component";

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [FormsModule, TableComponent],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
  courseModel:Course;
  courseList:Array<Course>;

  constructor() {
    this.courseModel = new Course();
    this.courseList = new Array<Course>();
  }

  onSaveForm(_course:Course) {
    this.courseList.push(_course);
    this.courseModel = new Course();
  }

}
