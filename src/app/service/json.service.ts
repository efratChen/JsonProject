import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../form/add/user';

@Injectable({
  providedIn: 'root'
})
export class JsonService {
  url = './assets/Events.json';
  api = 'https://jsonplaceholder.typicode.com/users';
  dataStorage: any;
  constructor(private http: HttpClient) {
    // this.getData(this.url);
    this.getData(this.api);
  }
  getData(url: any): Observable<any> {
    return this.http.get(url);
  }
  getDatafromApi(id: number): Observable<any> {
    return this.http.get<any>(this.api + '/' + id);
  }
  async addToLocalStorage(user: User) {
    // option1- Add one User:
    // user = Object.assign(user, this.addForm.value);
    // localStorage.setItem('Users', JSON.stringify(users));
    // option2- add a new user to array ,if array exists it add to the array else, it create new array with one the added element
    try {
      let users = [];
      let dataStorage = localStorage.getItem('Users');
      if (dataStorage !== null) {
        users = JSON.parse(dataStorage);
        users = [...users, user];
      }
      else {
        users = [user];
      }
      localStorage.setItem('Users', JSON.stringify(users));
    }
    catch (error) {
      console.error(error);
    }
  }
  removeFromLocaStorage() {
    // remove all:
    // localStorage.removeItem('Users');
    // remove apecific:
    this.dataStorage = this.readFromLocaStorage();
    this.dataStorage.splice(0, 1);
    localStorage.setItem('Users', JSON.stringify(this.dataStorage));
  }
  readFromLocaStorage() {
    this.dataStorage = localStorage.getItem('Users');
    if (this.dataStorage !== null) {
      this.dataStorage = JSON.parse(this.dataStorage);
    }
    return this.dataStorage;
  }
}
