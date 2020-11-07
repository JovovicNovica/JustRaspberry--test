import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { UuidInterceptor } from './shared/uuid.interceptor';
import { HomeComponent } from './home/home.component';
import { PostCardComponent } from './post-card/post-card.component';
import { HeaderComponent } from './header/header.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { EditComponent } from './edit/edit.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './footer/footer.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostCardComponent,
    HeaderComponent,
    CreatePostComponent,
    EditComponent,
    ConfirmDialogComponent,
    FooterComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MaterialModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    InlineSVGModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      positionClass: 'toast-top-right',
      closeButton: true,
      timeOut: 3000,
    }),
  ],
  entryComponents: [ConfirmDialogComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UuidInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
