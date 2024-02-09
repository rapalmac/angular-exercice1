import { Component, ViewChild,  } from '@angular/core';
import { Student } from '../model/model';
import { FormBuilder, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { importMatComponents } from '../material/material.importer';
import { CommonModule } from '@angular/common';
import { MatTable } from "@angular/material/table";
import { SelectionModel } from '@angular/cdk/collections';
import { SelectionObject, getItemIndexByCode } from '../util/util';
import { MatInput } from '@angular/material/input';
import { createDuplicateRecordValidator } from '../validator/validators';

const INDEX_ATTR = "index";

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, importMatComponents()],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {
  studentList:Array<Student>;
  formGroup:any;
  formEl!:NgForm;
  columnsToDisplay = ["select", "code", "name"];
  tableSelection = new SelectionModel<Student>(false, []);
  selection:SelectionObject<Student>;
  
  @ViewChild(MatTable)
  dataTable!: MatTable<Student>;

  @ViewChild("formEl")
  set FormEl(el:NgForm) {
    this.formEl = el;
  }

  @ViewChild("codeInput") 
  codeInput!:MatInput;
  
  constructor(fb:FormBuilder) {
    this.studentList = new Array<Student>();
    this.selection = new SelectionObject<Student>();

    this.formGroup = fb.group({
      code: ["", {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(4), createDuplicateRecordValidator(this.studentList, "code")],
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
    this.studentList.push(this.formGroup.value);

    this.dataTable.renderRows();
    this.onResetForm();
  }

  onUpdateForm() {
    if (this.selection.isSelected()) {
      let index = parseInt(this.selection.getAttribute(INDEX_ATTR));
      
      //Update the record
      let value:Student = this.selection.data;
      value.name = this.formGroup.value.name;
      this.studentList[index] = value;

      //Refresh the data table
      this.dataTable.renderRows();
      
      this.onResetForm();
    }
  }

  onSelectRow(student:Student) {
    let index = getItemIndexByCode(this.studentList, student.code);

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
