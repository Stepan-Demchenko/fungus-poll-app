import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RadioBtnComponent } from './components/radio-btn/radio-btn.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableQuestionsComponent } from './components/table-questions/table-questions.component';
import { SheetApiService } from './shared/service/sheet-api.service';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { tap } from 'rxjs';
import { SpinnerComponent } from './components/spinner/spinner.component';

const ANSWER_OF_QUESTIONS_KEY = 'Answers';
const STEP_OF_QUESTIONS_KEY = 'Step';
const IS_COMPLETED_KEY = 'isCompleted';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RadioBtnComponent, ReactiveFormsModule, TableQuestionsComponent, ProgressBarComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Опитування!';
  private readonly fb: FormBuilder = inject(FormBuilder);
  form!: FormGroup;
  isCompleted: boolean = !!Number(localStorage.getItem(IS_COMPLETED_KEY));
  step: number = localStorage.getItem(STEP_OF_QUESTIONS_KEY) ? Number(localStorage.getItem(STEP_OF_QUESTIONS_KEY)) : 1;
  requestLoading: boolean = false;

  constructor(private readonly sheetApi: SheetApiService) {}

  ngOnInit() {
    this.form = this.fb.group({
      intro: this.fb.group({
        age: [null, Validators.required],
        gender: [null, Validators.required],
        socialStatus: [null, Validators.required],
        monthSalary: [null, Validators.required]
      }),
      step1: this.fb.group({
        question1: [null, Validators.required],
        question2: [null, Validators.required],
        question3: [null, Validators.required],
        question4: [null, Validators.required]
      }),
      step2: this.fb.group({
        question1: [null, Validators.required],
        question2: [null, Validators.required],
        question3: [null, Validators.required],
        question4: [null, Validators.required]
      }),
      step3: this.fb.group({
        question1: [null, Validators.required],
        question2: [null, Validators.required],
        question3: [null, Validators.required],
        question4: [null, Validators.required]
      }),
      step4: this.fb.group({
        question1: [null, Validators.required],
        question2: [null, Validators.required],
        question3: [null, Validators.required],
        question4: [null, Validators.required]
      }),
      step5: this.fb.group({
        question1: [null, Validators.required],
        question2: [null, Validators.required],
        question3: [null, Validators.required],
        question4: [null, Validators.required]
      }),
      step6: this.fb.group({
        question1: [null, Validators.required],
        question2: [null, Validators.required],
        question3: [null, Validators.required],
        question4: [null, Validators.required]
      }),
      step7: this.fb.group({
        question1: [null, Validators.required],
        question2: [null, Validators.required],
        question3: [null, Validators.required],
        question4: [null, Validators.required]
      }),
      step8: this.fb.group({
        question1: [null, Validators.required],
        question2: [null, Validators.required],
        question3: [null, Validators.required],
        question4: [null, Validators.required]
      }),
    });
    this.populateForm();
  }

  isDisabledNextBtn() {
    if (this.step === 1) {
      return this.form.get('intro')?.invalid;
    }
    return this.form.get(`step${this.step - 1}`)?.invalid;
  }

  populateForm() {
    const data = localStorage.getItem(ANSWER_OF_QUESTIONS_KEY);
    if (data) {
      this.form.patchValue(JSON.parse(data));
    }
  }

  save(): void {
    this.requestLoading = true;
    const {intro, ...rest} = this.form.value;
    let requestResult: any = {};

    for (const property in rest) {
      const res = [];
      for (const prop in rest[property]) {
        res.push(rest[property][prop])
      }
      rest[property] = res;
      let resultObject: any = {};
      rest[property].forEach((price: number, index: number) => {
        resultObject[`${property}_Question${index + 1}`] = price;
      });
      requestResult = {...requestResult, ...resultObject};
    }
    this.sheetApi.save({
      ...intro,
      ...requestResult
    })
      .pipe(tap(()=> {
        localStorage.setItem(IS_COMPLETED_KEY, '1');
        this.isCompleted = true;
        this.requestLoading = false;
      }))
      .subscribe();
  }


  nextQuestions(): void {
    this.step = this.step + 1;
    this.saveToStorage(STEP_OF_QUESTIONS_KEY, this.step);
    this.saveToStorage(ANSWER_OF_QUESTIONS_KEY, this.form.value);
  }

  private saveToStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
