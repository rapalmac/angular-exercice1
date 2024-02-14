import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { importMatComponents } from '../material/material.importer';
import { Course } from '../model/model';
import { CourseService } from '../service/course.service';
import { SelectionObject } from '../util/util';
import { createDuplicateValidatorByCode } from '../validator/validators';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, importMatComponents()] ,
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
  fb:FormBuilder = inject(FormBuilder);

  courseModel:Course;  
  formGroup:any;
  tableSelection:SelectionModel<Course>;
  selection:SelectionObject<Course>;
  dataSource:MatTableDataSource<Course>;
  columnsToDisplay = ["select", "code", "name", "level"];
  courseService = inject(CourseService);

  @ViewChild("courseForm")
  form!:NgForm;

  constructor() {
    this.courseModel = new Course();
    this.tableSelection = new SelectionModel<Course>();
    this.selection = new SelectionObject<Course>();
    this.dataSource = new MatTableDataSource(this.courseService.list());

    this.initFormGroup();
  }

  initFormGroup() {
    this.formGroup = this.fb.group({
      code: ["", {
        validators: [Validators.required, createDuplicateValidatorByCode(this.courseService), Validators.minLength(4)],
        updateOn: "blur"
      }],
      name: ["", {
        validators: [Validators.required, , Validators.minLength(4)],
        updateOn: "blur"
      }],
      description: ["", {
        validators: [],
        updateOn: "blur"
      }],
      level: ["", {
        validators: [Validators.required],
        updateOn: "blur"
      }]
    })
  }

  onSaveForm() {
    this.courseService.add(this.formGroup.value)
    this.dataSource.data = this.courseService.list();
    this.onResetForm();
  }

  onUpdateForm() {
    if (this.selection.isSelected()) {      
      let newValue = this.formGroup.value;

      //Update table record.
      this.courseService.update({
        code: this.selection.data.code,
        name: newValue.name,
        description: newValue.description,
        level: newValue.level
      });

      //Refresh mat table
      this.dataSource.data = this.courseService.list();
    }

    this.onResetForm();
  }

  onSelectRow(course:Course) {
    this.tableSelection.toggle(course);
    this.selection.setData(course);
    this.formGroup.setValue(course);
    this.formGroup.get("code").disable();

    document.getElementById("courseName")?.focus();
  }

  onResetForm() {
    this.form.resetForm();
    this.selection.reset();
    this.tableSelection.clear();

    this.formGroup.get("code").enable();
    document.getElementById("courseCode")?.focus();

  }

}
