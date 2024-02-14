import { Component, ViewChild, inject,  } from '@angular/core';
import { Student } from '../model/model';
import { FormBuilder, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { importMatComponents } from '../material/material.importer';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from '@angular/cdk/collections';
import { SelectionObject } from '../util/util';
import { createDuplicateValidatorByCode } from '../validator/validators';
import { StudentService } from '../service/student.service';

const INDEX_ATTR = "index";

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, importMatComponents()],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {
  formGroup:any;
  formEl!:NgForm;
  columnsToDisplay = ["select", "code", "name"];
  tableSelection = new SelectionModel<Student>(false, []);
  selection:SelectionObject<Student>;
  studentService:StudentService = inject(StudentService);
  dataSource:MatTableDataSource<Student>;  

  @ViewChild("formEl")
  set FormEl(el:NgForm) {
    this.formEl = el;
  }
  
  constructor(fb:FormBuilder) {
    this.selection = new SelectionObject<Student>();
    this.dataSource = new MatTableDataSource(this.studentService.list());

    this.formGroup = fb.group({
      code: ["", {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(4), createDuplicateValidatorByCode(this.studentService)],
        updateOn: "blur"
      }],
      name: ["", {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(4)],
        updateOn: "blur"
      }]
    });
  }

  onResetForm() {
    this.formEl.resetForm();
    this.selection.reset();

    if (this.tableSelection.selected && this.tableSelection.selected.length > 0) {
      this.tableSelection.clear();
    }

    this.formGroup.get("code").enable();
    document.getElementById("code")?.focus();
  }

  onSaveForm () {
    this.studentService.add(this.formGroup.value);

    this.dataSource.data = this.studentService.list();
    this.onResetForm();
  }

  onUpdateForm() {
    if (this.selection.isSelected()) {
      let index = parseInt(this.selection.getAttribute(INDEX_ATTR));
      
      //Update the record
      this.studentService.update({
        code: this.selection.data.code,
        name: this.formGroup.value.name
      });

      //Refresh the data table
      this.dataSource.data = this.studentService.list();
      
      this.onResetForm();
    }
  }

  onSelectRow(student:Student) {
    let index = this.studentService.getIndexByCode(student.code);

    if (index >= 0) {
      this.selection.setData(student);
      this.selection.setAttribute(INDEX_ATTR, index);

      this.tableSelection.toggle(student);
      this.formGroup.setValue(student)
      this.formGroup.get("code").disable();
      document.getElementById("name")?.focus();
    }
  }
}
