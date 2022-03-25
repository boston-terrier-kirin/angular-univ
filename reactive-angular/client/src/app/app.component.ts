import { Component } from '@angular/core';
import { LoadingService } from './loading/loading.service';
import { MessagesService } from './messages/messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // ここでprovider登録すると、serviceでserviceをinjectできなくなるのでAppModuleに定義し直し。
  // providers: [LoadingService, MessagesService],
})
export class AppComponent {
  logout() {}
}
