import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { find } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MessageService {
  apiURL: string = environment.apiURL;

  private errSubject = new Subject<string>();

  errors$: Observable<string> = this.errSubject
    .asObservable()
    .pipe(find((msg) => msg && msg.length > 0));

  constructor() {}

  showErrors(error: string): void {
    this.errSubject.next(error);
  }
}
