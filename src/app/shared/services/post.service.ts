import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
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
   *  Load all Posts
   */
  loadPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiURL}/api/posts/get`).pipe(
      catchError((err) => {
        const message = err.error.message;
        this.messageService.showErrors(message);
        return throwError(err);
      }),
      map((post) => post),
      shareReplay()
    );
  }

  /**
   *
   *  Create Post
   */
  createPost(create: Post): Observable<Post> {
    return this.http.post<Post>(`${this.apiURL}/api/post/create`, create).pipe(
      catchError((err) => {
        const message = err.error.message;
        this.messageService.showErrors(message);
        return throwError(err);
      }),
      shareReplay()
    );
  }

  /**
   *
   * Edit Post
   */

  edtiPost(changes: Post): Observable<Post> {
    return this.http.post<Post>(`${this.apiURL}/api/post/update`, changes).pipe(
      catchError((err) => {
        const message = err.error.message;
        this.messageService.showErrors(message);
        return throwError(err);
      }),
      shareReplay()
    );
  }

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
