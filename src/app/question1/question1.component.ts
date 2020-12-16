import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-question1',
  templateUrl: './question1.component.html',
  styleUrls: ['./question1.component.scss']
})
export class Question1Component implements OnInit {
  form: FormGroup;
  result:String;
  constructor() { }

  ngOnInit(): void {
    this.createForm();
  }

  checkNum(input) {
    if (input < 0) {
      this.form.get('num').setValue(1)
    }
    this.calculate();
  }

  calculate() {
    let operation = this.form.get('operate').value;
    if (operation == "isPrime") {
      this.checkPrime();
    } else if (operation == "isFibonacci") {
      this.checkFibonacci();
    }else{
    }
  }
  checkPrime() {
    let num = this.form.get('num').value;
    let count = 0;
    for (let i = 1; i <= num; i++) {
      if (num % i == 0) {
        count++;
      }
    }
    if(count == 2){
      this.result = "True";
    }else{
      this.result = "False";
    }
  }
  checkFibonacci() {
    let num = this.form.get('num').value;
    let F0 = 0;
    let F1 = 1;
    let res = 0;
    let bool :boolean = false;
    for (let i = 0; i <= num; i++) {
      res = F0 + F1;
      if(res == num){
        bool=true;
         break;
      }else{
        F0 = F1;
        F1 = res;
  
      }
    }
    if(bool){
      this.result = "True";
     }else{
      this.result = "False";
     }

  }

  createForm() {
    this.form = new FormGroup({
      num: new FormControl(),
      operate: new FormControl()
    });
    this.form.get('num').valueChanges
      .pipe(debounceTime(300))
      .subscribe(res => this.checkNum(res))
  }
}
