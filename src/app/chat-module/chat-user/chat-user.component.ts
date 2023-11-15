import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatServiceService } from '../chat-user-service/chat-service.service'
@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.scss']
})
export class ChatUserComponent {

  mensaje: string = '';
  mensajes: { texto: string, tipo: string }[] = [];

  constructor(private chatService: ChatServiceService) {}

  
  loading: boolean = false; 
  
  enviarMensaje() {
    this.loading = true;
    this.chatService.enviarMensaje(this.mensaje).subscribe(
      (respuesta) => {
        this.mensajes.push({ texto: this.mensaje, tipo: 'enviado' });
        this.mensajes.push({ texto: respuesta.solucion, tipo: 'recibido' });
        this.mensaje = '';
        this.loading = false;// Realiza acciones adicionales si es necesario
      },
      (error) => {
        this.loading = false;
        console.error('Error al enviar mensaje', error);
      }
    );
    
  }

  

}
