import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { JsonService } from 'src/app/service/json.service';
import { User } from './user';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  cnt = 0;
  addForm = this.formBuilder.group({
    name: ['', Validators.required, Validators.pattern("^[a-zA-Z]{2,15}$")],
    age: ['', Validators.required]
  });
  constructor(private formBuilder: FormBuilder,
    private Json: JsonService) { }
  ngOnInit(): void {
  }
  async submit(): Promise<void> {
    this.cnt++;
    let { name, age } = this.addForm.value;
    let user: any = new User(this.cnt, name, age);
    user = Object.assign(user, this.addForm.value);
    this.Json.addToLocalStorage(user);
    this.addForm.reset()
  }
}
