import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../shared/model/post.model';
import { PostService } from '../shared/services/post.service';
import { MessageService } from '../shared/services/message.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  @Input() posts: Post[] = [];
  edit: string;

  constructor(
    private router: Router,
    private postService: PostService,
    private messageService: MessageService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.edit = 'edit post';
  }

  deletePost(post: Post, index: number): void {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        title: 'Delete Post',
        message: 'Do you really want to delete this post?',
      },
    });
    confirmDialog.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this.posts.splice(index, 1);
        this.postService.deletePost(post.id).subscribe(() => {
          this.toastr.success('Post is deleted!');
        });

        this.messageService.errors$.subscribe((err) => {
          const message = err;
          this.toastr.warning(message);
        });
      }
    });
  }

  goTo(route: string): void {
    this.router.navigate([route]);
  }
}
