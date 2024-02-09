import { Component, ViewChild, inject } from '@angular/core';
import { Course, CourseLevel } from '../model/model';
import { FormBuilder, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { importMatComponents } from '../material/material.importer';
import { CommonModule } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { SelectionObject, getItemIndexByCode } from '../util/util';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { createDuplicateRecordValidator } from '../validator/validators';

const INDEX_ATTR = "index";

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
  courseList:Array<Course>;
  formGroup:any;
  tableSelection:SelectionModel<Course>;
  selection:SelectionObject<Course>;
  dataSource:MatTableDataSource<Course>;
  columnsToDisplay = ["select", "code", "name", "level"];

  @ViewChild("courseForm")
  form!:NgForm;

  constructor() {
    this.courseModel = new Course();
    this.courseList = new Array<Course>();
    this.tableSelection = new SelectionModel<Course>();
    this.selection = new SelectionObject<Course>();
    this.dataSource = new MatTableDataSource(this.courseList);

    this.initFormGroup();
  }

  initFormGroup() {
    this.formGroup = this.fb.group({
      code: ["", {
        validators: [Validators.required, createDuplicateRecordValidator(this.courseList, "code"), Validators.minLength(4)],
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
    this.courseList.push(this.formGroup.value);
    this.dataSource.data = this.courseList;
    this.onResetForm();
  }

  onUpdateForm() {
    if (this.selection.isSelected()) {
      let index = parseInt(this.selection.getAttribute(INDEX_ATTR));
      let data = this.selection.data;
      let newValue = this.formGroup.value;

      //Update table record.
      data.name = newValue.name;
      data.description = newValue.description;
      data.level = newValue.level;
      this.courseList[index] = data;

      //Refresh mat table
      this.dataSource.data = this.courseList;
    }

    this.onResetForm();
  }

  onSelectRow(course:Course) {
    this.tableSelection.toggle(course);
    
    let index:number = getItemIndexByCode(this.courseList, course.code);
    this.selection.setData(course);
    this.selection.setAttribute(INDEX_ATTR, index);
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
