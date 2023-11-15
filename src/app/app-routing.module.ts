import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatUserComponent } from './chat-module/chat-user/chat-user.component'
const routes: Routes = [
  { path: '', component: ChatUserComponent },
  { path: 'chat', component: ChatUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
