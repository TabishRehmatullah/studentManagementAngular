import { Component, OnInit, inject } from '@angular/core';
import { StudentsService } from '../service/students.service';
import { Observable } from 'rxjs';
import { student } from '../types/student';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {
  student$!: Observable<student[]>
  ToastrService!: ToastrService;
  

  studentServices = inject(StudentsService);

  ngOnInit(): void {
    this.getStudents();

    
        }
        delete(id: number){
          this.studentServices.deleteStudent(id).subscribe(
            {
              next:(response)=>{
               this.ToastrService.success("Deleted Successfully");
               this.getStudents();

              }
            })
        }
        private getStudents():void{
          this.student$=this.studentServices.getStudents()

        }
      }
    