import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateSuffix'
})
export class DateSuffixPipe implements PipeTransform {
  
  transform(value: Date): string {
    let day = value.getDate();
    let suffix = this.getSuffix(day);
    return day + suffix;
  }

  private getSuffix(day: number): string {
    if (day >= 11 && day <= 13) {
      return 'th';
    }

    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }
}
