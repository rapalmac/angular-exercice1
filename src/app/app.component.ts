import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { CourseComponent } from './course/course.component';
import { ProjectComponent } from './project/project.component';
import { importAppHeaderComponents } from './material/material.importer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, StudentComponent, CourseComponent, ProjectComponent, importAppHeaderComponents()],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-exercice1';
}
