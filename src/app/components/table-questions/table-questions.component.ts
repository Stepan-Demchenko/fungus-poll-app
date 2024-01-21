import { Component, inject } from '@angular/core';
import { PRICES_ANSWER } from '../../shared/prices-answer';
import { PriceAnswer } from '../../shared/models/price-answer';
import { ControlContainer, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TABLE_QUESTIONS } from '../../shared/constants/table-questions';
import { NgStyle } from '@angular/common';
import { RadioBtnComponent } from '../radio-btn/radio-btn.component';

@Component({
  selector: 'app-table-questions',
  standalone: true,
  imports: [
    NgStyle,
    RadioBtnComponent,
    ReactiveFormsModule
  ],
  templateUrl: './table-questions.component.html',
  styleUrl: './table-questions.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class TableQuestionsComponent {
  protected parentContainer: ControlContainer = inject(ControlContainer);
  protected readonly questions: string[] = TABLE_QUESTIONS;
  answerOptions: PriceAnswer[] = PRICES_ANSWER;
  disabledOptions: number[] = []

  get parentFormGroup(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }


  selectOption(controlName: string, event: any): void {
    const prevValue = this.parentFormGroup.controls[controlName]!.value;
    const currentValue: number = +event.target.value;
    this.answerOptions = this.answerOptions.map((answer: PriceAnswer): PriceAnswer =>  {
      if (answer.value === prevValue) {
        return {...answer, selected: false}
      }
      if (answer.value === currentValue) {
        return {...answer, selected: true};
      }
      return answer;
      });
    this.parentFormGroup.controls[controlName]?.patchValue(+event.target.value);

    // if (prevValue) {
    //   const index: number = this.disabledOptions.indexOf(prevValue);
    //   if (index > -1) {
    //     this.disabledOptions = [...this.disabledOptions.slice(0,index), ...this.disabledOptions.slice(index + 1)];
    //   }
    // }
    // this.parentFormGroup.controls[controlName]?.patchValue(+event.target.value);
    // this.disabledOptions = [...this.disabledOptions, +event.target.value];
  }
}
