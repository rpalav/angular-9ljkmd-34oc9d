import { Component } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from "@angular/forms";

export interface Food {
  value: string;
  viewValue: string;
}

/**
 * @title Basic select
 */
@Component({
  selector: "app-component",
  templateUrl: "app-component.html",
  styleUrls: ["app-component.css"]
})
export class AppComponent {
  public myForm: FormGroup = null;

  constructor() {}

  ngOnInit() {
    this.myForm = new FormGroup(
      {
        password: new FormControl("", Validators.required),
        repeatpassword: new FormControl("", Validators.required)
      },
      this.matchControls("password", "repeatpassword")
    );
  }

  matchControls(field1, field2) {
    return (group: FormGroup) => {
      const control1 = group.get(field1);
      const control2 = group.get(field2);
      return control1 &&
        control2 &&
        control1.value &&
        control2.value &&
        control1.value != control2.value
        ? { errorMatch: "must match" }
        : null;
    };
  }
}
