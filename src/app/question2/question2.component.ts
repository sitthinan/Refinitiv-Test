import { HttpClient, HttpHeaders } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, filter } from 'rxjs/operators';

@Component({
  selector: 'app-question2',
  templateUrl: './question2.component.html',
  styleUrls: ['./question2.component.scss']
})
export class Question2Component implements OnInit {

  constructor(private http: HttpClient,) { }
  form: FormGroup;
  list: any;
  allData: any;
  ngOnInit(): void {
    this.createForm()
    this.getData()
  }

  getData() {
    const httpOptions = {
      headers: new HttpHeaders({
      })
    };
    this.http.get<any>(`https://api.publicapis.org/categories`, httpOptions).toPromise().then((res: []) => {
      let response = res;
      this.list = response;
      this.allData = response;
      console.log(response)

    })
  }

  createForm() {
    this.form = new FormGroup({
      num: new FormControl(),
      operate: new FormControl()
    });
    this.form.get('num').valueChanges
      .pipe(debounceTime(300))
      .subscribe(res => this.filterTable(res))
  }
  filterTable(input) {
    let filterValueLower = input.toLowerCase();
    if (input === '') {
      this.list = this.allData;
    } else {
      this.list = this.allData.filter((x) => x.toLowerCase().includes(filterValueLower));
    }
  }
}
 