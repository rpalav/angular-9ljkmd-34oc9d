import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, Input, ViewChild, Self, Optional, forwardRef, Injector } from '@angular/core';
import { NgModel, ControlValueAccessor, AbstractControl, FormControl, NG_VALUE_ACCESSOR, NgForm, FormGroupDirective, NgControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';


class CustomFieldErrorMatcher implements ErrorStateMatcher {
  constructor(private customControl: FormControl,private errors:any) { }
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return this.customControl && this.customControl.touched &&(this.customControl.invalid || this.errors);
  }
}

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CustomSelectComponent),
    }
  ]
})
export class CustomSelectComponent implements AfterViewInit, ControlValueAccessor {

  control: FormControl
  onChange: any = () => { };
  onTouched: any = () => { };

  value: any;
  @Input() disabled: boolean;
  @Input() placeholder = '';
  @Input() errors:any=null;

  errorMatcher() {
    return new CustomFieldErrorMatcher(this.control,this.errors)
  }
  constructor(public injector: Injector) {
  }

  ngAfterViewInit(): void {
    const ngControl: NgControl = this.injector.get(NgControl, null);
    if (ngControl) {
      setTimeout(() => {
        this.control = ngControl.control as FormControl;
      })
    }
  }

  writeValue(value: any): void {
    this.value=value
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // #endregion
}
