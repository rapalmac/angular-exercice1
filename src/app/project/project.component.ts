import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Project } from '../model/model';
import { SelectionObject } from '../util/util';
import { ProjectService } from '../service/project.service';
import { MatTableDataSource } from "@angular/material/table";
import { createDuplicateValidatorByCode } from '../validator/validators';
import { SelectionModel } from '@angular/cdk/collections';
import { importMatComponents } from '../material/material.importer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, importMatComponents()],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  formGroup:any;
  formEl!:NgForm;
  columnsToDisplay = ["select", "code", "name"];
  tableSelection = new SelectionModel<Project>(false, []);
  selection:SelectionObject<Project>;
  projectService:ProjectService = inject(ProjectService);
  dataSource:MatTableDataSource<Project>;  

  @ViewChild("formEl")
  set FormEl(el:NgForm) {
    this.formEl = el;
  }
  
  constructor(fb:FormBuilder) {
    this.selection = new SelectionObject<Project>();
    this.dataSource = new MatTableDataSource(this.projectService.list());

    this.formGroup = fb.group({
      code: ["", {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(4), createDuplicateValidatorByCode(this.projectService)],
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
    this.projectService.add(this.formGroup.value);

    this.dataSource.data = this.projectService.list();
    this.onResetForm();
  }

  onUpdateForm() {
    if (this.selection.isSelected()) {
      
      //Update the record
      this.projectService.update({
        code: this.selection.data.code,
        name: this.formGroup.value.name
      });

      //Refresh the data table
      this.dataSource.data = this.projectService.list();
      
      this.onResetForm();
    }
  }

  onSelectRow(project:Project) {
    let index = this.projectService.getIndexByCode(project.code);

    if (index >= 0) {
      this.selection.setData(project);
      this.tableSelection.toggle(project);
      this.formGroup.setValue(project)
      this.formGroup.get("code").disable();
      document.getElementById("name")?.focus();
    }
  }
}
