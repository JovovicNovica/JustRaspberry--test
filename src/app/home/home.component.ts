import { Component, OnInit } from '@angular/core';
import { PostsStorage } from '../shared/services/posts-store.service';
import { Post } from '../shared/model/post.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts$: Observable<Post[]>;
  home: string;
  page: string;

  constructor(private postsStorage: PostsStorage) {}

  ngOnInit(): void {
    this.home = 'home';
    this.page = 'page';
    this.reloadPosts();
  }

  reloadPosts(): void {
    this.posts$ = this.postsStorage.storedPosts$;
  }
}
