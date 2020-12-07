import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form: FormGroup;
  statuses = ['stable', 'critical', 'finished'];
  defaultStatus = 'stable';
  forbiddenProjectNames = ['Test'];
  async_forbiddenProjectNames = ['async_Test'];

  constructor() {
    this.form = new FormGroup({
      'projectName': new FormControl(
        null,
        [Validators.required, this.forbiddenProjectNamesValidator.bind(this)],
        this.async_forbiddenProjectNamesValidator.bind(this)
      ),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl(this.defaultStatus)
    });
  }
  ngOnInit() {
    this.form.statusChanges.subscribe((status) => {
      console.log(status);
    });
  }
  forbiddenProjectNamesValidator(control: FormControl): {[key: string]: boolean} {
    if (this.forbiddenProjectNames.indexOf(control.value) !== -1) {
      return {'forbiddenProjectName': true};
    }
    return null;
  }
  async_forbiddenProjectNamesValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (this.async_forbiddenProjectNames.indexOf(control.value) !== -1) {
          resolve({'forbiddenProjectName': true});
        } else {
          resolve(null);
        }
      }, 500);
    });
    return promise;
  }
  onSubmit() {
    console.log(this.form.value);
  }
}
