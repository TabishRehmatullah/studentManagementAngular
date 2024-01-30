import { JsonPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StudentsService } from '../../service/students.service';
import { Subscription } from 'rxjs';
import { StudentsComponent } from '../students.component';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, RouterLink],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit, OnDestroy{
form!: FormGroup;
studentFormSubsciption!: Subscription;
paramsSubscription!: Subscription;
studentService= inject(StudentsService)
isEdit=false;

  constructor(private fb:FormBuilder, 
    private activatedRouter:ActivatedRoute, 
    private router: Router, 
    private toasterSerivce: ToastrService){
  }
  ngOnDestroy(): void {
    if(this.studentFormSubsciption){
    this.studentFormSubsciption.unsubscribe();
    }
    if(this.paramsSubscription){
      this.paramsSubscription.unsubscribe();
    }
  }

  onSubmit(){
   this.studentFormSubsciption = this.studentService.addStudents(this.form.value).subscribe({
      next:(response)=>{
        console.log(response);
        this.toasterSerivce.success("Student Succesfully Added")
        this.router.navigateByUrl('/students');
      },
      error:err=> {
          console.log(err)
      },
    })
    
  }
  ngOnInit(): void {
   this.paramsSubscription= this.activatedRouter.params.subscribe({
      next:(response)=>{
        console.log( response['id'])
        let id = response['id'];
        if(!id){
          return;
        }
        this.studentService.getStudent(id).subscribe({
          next:(response)=>{
            this.form.patchValue(response)
            this.isEdit=true;
            console.log("Runnng")
          },
          error:err=>{
            console.log(err);
          }
        })
      },
      error:err=>{
        console.log(err);
      }
    })


    this.form = this.fb.group({
    
      name:['', Validators.required],
      address:[],
      phoneNumber:[],
      email:['', Validators.email],


    });
  }

}
