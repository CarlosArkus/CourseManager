export class TimeFormat {
  minutesToFormat(minutes: number): string {

    const days = Math.trunc(minutes / 60 / 24);
    const daysRes = minutes / 60 / 24 % 1;

    const hours = daysRes * 24;
    const realHours = Math.trunc(daysRes * 24);

    const hoursRes = hours % 1;
    const min = Math.ceil(hoursRes * 60);

    const daysString = days > 1 ? 'days' : 'day';
    const hoursString = realHours > 1 ? 'hours' : 'hour';
    const minString = min > 1 ? 'minutes' : 'minute';

    return `${days} ${daysString} ${realHours} ${hoursString} ${min} ${minString}`;

  }

  toTimeSplit(minutes: number): any {

    const days = Math.trunc(minutes / 60 / 24);
    const daysRes = minutes / 60 / 24 % 1;

    const hours = daysRes * 24;
    const realHours = Math.trunc(daysRes * 24);

    const hoursRes = hours % 1;
    const min = Math.ceil(hoursRes * 60);

    return { days, hours: realHours, min };
  }
}