import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PostsStorage } from '../shared/services/posts-store.service';
import { MessageService } from '../shared/services/message.service';
import { Post } from '../shared/model/post.model';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  editForm: FormGroup;
  postId: number;
  posts$: Observable<Post>;
  post: Post;
  edit: string;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private postsStorage: PostsStorage,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.edit = 'edit post';
    this.editForm = this.fb.group({
      title: [''],
      subtitle: [''],
      body: [''],
    });

    this.postId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    const loadPosts$ = this.postsStorage.storedPosts$;
    this.posts$ = loadPosts$.pipe(
      map((post) => post.find((post) => post.id == this.postId))
    );
    this.posts$.subscribe((post) =>
      this.editForm.patchValue({
        title: post.title,
        subtitle: post.subtitle,
        body: post.body,
      })
    );
  }

  updatePost(): void {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        title: 'Edit Post',
        message: 'Do you really want to update this post?',
      },
    });
    confirmDialog.afterClosed().subscribe((result) => {
      if (result == 'true') {
        const changes = {
          title: this.editForm.value.title,
          subtitle: this.editForm.value.subtitle,
          body: this.editForm.value.body,
          id: this.postId,
          createdAt: undefined,
          updatedAt: undefined,
        };

        this.postsStorage.editPost(changes).subscribe(() => {
          this.router.navigateByUrl(''),
            this.toastr.success('Successfully changed post!');
        });
        this.messageService.errors$.subscribe((err) => {
          const message = err;
          this.toastr.warning(message);
        });
      }
    });
  }
}
