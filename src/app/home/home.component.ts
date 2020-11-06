import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/services/post.service';
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

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.home = 'home';
    this.page = 'page';

    const loadPosts$ = this.postService.loadPosts();
    this.posts$ = loadPosts$.pipe(map((post) => post));
  }
}
