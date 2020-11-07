import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/services/post.service';
import { LoadingService } from '../shared/services/loading.service';
import { Post } from '../shared/model/post.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts$: Observable<Post[]>;
  home: string;
  page: string;

  constructor(
    private postService: PostService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.home = 'home';
    this.page = 'page';
    this.reloadPosts();
  }

  reloadPosts(): void {
    const loadPosts$ = this.postService.loadPosts();
    const loadePosts$ = this.loadingService.showLoader(loadPosts$);
    this.posts$ = loadePosts$.pipe(map((post) => post));
  }
}
