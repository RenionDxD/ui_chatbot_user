import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatUserComponent } from './chat-user/chat-user.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ChatUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ]
})
export class ChatModuleModule { }
