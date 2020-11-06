import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../shared/services/post.service';
import { MessageService } from '../shared/services/message.service';
import { Router } from '@angular/router';
import { Post } from '../shared/model/post.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  createForm: FormGroup;
  create: string;
  post: string;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private messageService: MessageService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.create = 'create';
    this.post = 'post';

    this.createForm = this.fb.group({
      title: ['', [Validators.required]],
      subtitle: ['', [Validators.required]],
      body: ['', [Validators.required]],
    });
  }

  createPost(): void {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        title: 'Create Post',
        message: 'Do you really want to create this post?',
      },
    });
    confirmDialog.afterClosed().subscribe((result) => {
      if (result == 'true') {
        const post = this.createForm.value;
        this.postService.createPost(post).subscribe(() => {
          this.router.navigateByUrl('');
          this.toastr.success('Successfully created post!');
        });

        this.messageService.errors$.subscribe((err) => {
          const message = err;
          this.toastr.warning(message);
        });
      }
    });
  }
}
