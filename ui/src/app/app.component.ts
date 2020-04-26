import { Component } from '@angular/core';
import {from, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {share} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  helloWorld: Observable<string>
  title = 'tarsier UI --> Code Collaboration'

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.helloWorld = this.getHelloWorld().pipe(share())
  }

  private getHelloWorld(): Observable<any> {
    return this.http.get('/api', {responseType: 'text'})
  }
}
