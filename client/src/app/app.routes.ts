import { Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { StudentFormComponent } from './students/student-form/student-form.component';

export const routes: Routes = [
   { path: "students",
   component: StudentsComponent,
},
{
   path: "students/:id",
   component: StudentFormComponent
},
{
   path: "student/form",
   component: StudentFormComponent
}
];
