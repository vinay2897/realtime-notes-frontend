import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) { 
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(5), Validators.required])
    })
  }

  submit(){
    this.authService.signup(this.signupForm.value).subscribe(res => {
      if(res['code'] === 200 || res['code'] === 0){
        this.router.navigate(["/profile"]);
      }
    }, err => {
      if(err.error.code === 2){
        this.router.navigate(["/login"]);
      }
      else{
        console.log(err)
      }
    })
  }

  ngOnInit() {
  }

}
