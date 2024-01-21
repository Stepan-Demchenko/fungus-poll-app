import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [],
  template: `
    <div class="progressBar-container">
      <span class="progressBar-container__progress-info">
        {{ percent }}%
      </span>
      <div class="progressBar-container__bar"
      [style.width]="percent + '%'"
      ></div>
    </div>
  `,
  styleUrl: './progress-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent {
  percent: number = 0;

  @Input({required: true}) countOfSteps: number = 9;
  @Input({required: true, transform: (value: number)=> (value - 1) }) set numberOfStep(value: number) {
    this.percent = Math.round((100/this.countOfSteps) * value);
  };
}
