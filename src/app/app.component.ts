import { Component } from '@angular/core';
import { JsonService } from './service/json.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'JsonProject';
  dataUsers: any;
  apiUsers: any;
  localStorageUsers: any;
  updatedLocalStorageUsers: any;
  url: string = '/assets/Events.json';
  api = 'https://jsonplaceholder.typicode.com/users';

  constructor(private Json: JsonService) { }

  ngOnInit() {
    this.Json.getData(this.url).subscribe(data => {
      console.log(data);
      this.dataUsers = data;
    });

    this.Json.getData(this.api).subscribe(data => {
      console.log(data);
      this.apiUsers = data;
    });

    this.localStorageUsers = this.Json.readFromLocaStorage();
  }
  removeFromLocaStorage() {
    this.Json.removeFromLocaStorage()
  }
  firstLetters(): string {
    return "border";
  }
}
