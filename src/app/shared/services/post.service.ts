import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { Post } from '../model/post.model';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class PostService {
  apiURL: string = environment.apiURL;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /**
   *
   * Delete Post
   */
  deletePost(postId: number): Observable<Post> {
    return this.http
      .delete<Post>(`${this.apiURL}/api/post/delete/${postId}`)
      .pipe(
        catchError((err) => {
          const message = 'Something went wrong!';
          this.messageService.showErrors(message);
          return throwError(err);
        }),
        shareReplay()
      );
  }
}
