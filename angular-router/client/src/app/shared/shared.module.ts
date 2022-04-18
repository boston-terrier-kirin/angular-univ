import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { MessagesComponent } from './messages/messages.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [MessagesComponent, LoadingComponent, SafeUrlPipe],
  imports: [CommonModule, MatProgressSpinnerModule, MatIconModule],
  exports: [MessagesComponent, LoadingComponent, SafeUrlPipe],
})
export class SharedModule {}
