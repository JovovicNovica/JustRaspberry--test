import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { MessageService } from '../services/message.service';
import { LoadingService } from '../services/loading.service';
import { Post } from '../model/post.model';

@Injectable({ providedIn: 'root' })
export class PostsStorage {
  apiURL: string = environment.apiURL;

  private subject = new BehaviorSubject<Post[]>([]);
  storedPosts$: Observable<Post[]> = this.subject.asObservable();

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private loadingService: LoadingService
  ) {
    this.loadAllPosts();
  }

  loadAllPosts(): void {
    const spinner$ = this.http.get<Post[]>(`${this.apiURL}/api/posts/get`).pipe(
      map((posts) => posts),
      catchError((err) => {
        const message = err.error.message;
        this.messageService.showErrors(message);
        return throwError(err);
      }),
      tap((posts) => this.subject.next(posts))
    );
    this.loadingService.showLoader(spinner$).subscribe();
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
   * Edit Post to storage
   */
  editPost(changes: Post): Observable<any> {
    const newPosts = this.subject.getValue();

    const index = newPosts.findIndex((post) => post.id === changes.id);

    newPosts[index] = changes;

    this.subject.next(newPosts);

    return this.http.post<Post>(`${this.apiURL}/api/post/update`, changes).pipe(
      catchError((err) => {
        const message = err.error.message;
        this.messageService.showErrors(message);
        return throwError(err);
      }),
      shareReplay()
    );
  }
}
