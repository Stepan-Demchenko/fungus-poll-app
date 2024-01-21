import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-radio-btn',
  standalone: true,
  imports: [
    NgClass,
    FormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioBtnComponent),
      multi: true
    }
  ],
  template: `
      <p class="radio-control">
          <input class="radio-control__input"
                 [disabled]="disabled"
                 id="id_{{value}}_{{group}}"
                 [name]="group" type="radio"
                 [value]="value"
                 [checked]="value === model"
                 [ngModel]="model"
                 (change)="updateValue(value)" (blur)="markAsTouched()">
          <label class="radio-control__label" [ngClass]="{disabled: disabled}" for="id_{{value}}_{{group}}">
              <ng-content></ng-content>
          </label>
      </p>
  `,
  styleUrl: './radio-btn.component.scss'
})
export class RadioBtnComponent implements ControlValueAccessor {
  @Input({required: true}) value: any = '';
  @Input({required: true}) group: string = '';
  @Input() disabled: boolean = false;
  protected model: string | null = null;
  touched = false;

  // ControlValueAccessor methods
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: string): void {
    this.model = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  updateValue(insideValue: string) {
    this.model = insideValue;
    this.onChange(insideValue);
    this.onTouched();
  }
}

