import { Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { StudentComponent } from './student/student.component';
import { ProjectComponent } from './project/project.component';
import { StudentsByCourseComponent } from './students-by-course/students-by-course.component';
import { StudentsByProjectComponent } from './students-by-project/students-by-project.component';

export const routes: Routes = [
    {
        path: "", component: StudentComponent
    }, 
    {
        path: "students",   component: StudentComponent
    },
    {
        path: "courses", component: CourseComponent
    },
    {
        path: "projects", component: ProjectComponent
    },
    {
        path: "student-by-course", component: StudentsByCourseComponent
    },
    {
        path: "student-by-project", component: StudentsByProjectComponent
    }
];
