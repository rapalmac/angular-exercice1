import { Component } from '@angular/core';
import { Student } from '../model/model';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [FormsModule, TableComponent],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {
  studentModel:Student;
  studentList:Array<Student>;
  
  constructor() {
    this.studentModel = new Student();
    this.studentList = new Array<Student>();
  }

  onSaveForm (_studentModel:Student) {
    this.studentList.push(_studentModel);
    this.studentModel = new Student();
  }
}
