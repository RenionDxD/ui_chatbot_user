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
  pregunta: string = '';
  mensajes: { texto: string, tipo: string, find?: string, mostrado?:string }[] = [];
  preguntas: { pregunta: string, tipo: string }[] = [];
  color: string = '';
 
  serverStatus: boolean = false;


  constructor(private chatService: ChatServiceService) {}




  loading: boolean = false; 
  likeStatus: string = '';
  
  enviarMensaje() {
    this.loading = true;
    this.chatService.enviarMensaje(this.mensaje).subscribe(
      (respuesta) => {
        this.preguntas = [];
        this.mensajes.push({ texto: this.mensaje, tipo: 'enviado' });
        const colorDelMensajeRecibido = respuesta.find ? '' : '#d75b5d';
        this.mensajes.push({ texto: respuesta.solucion, tipo: 'recibido', find: colorDelMensajeRecibido, mostrado: respuesta.find });
        // Agregar mensajes similares en tarjetas
        this.preguntas.push({ pregunta: respuesta.similares, tipo: 'preguntas' });
        this.mensaje = '';
        this.pregunta = '';
        this.loading = false;// Realiza acciones adicionales si es necesario
      },
      (error) => {
        this.loading = false;
        console.error('Error al enviar mensaje', error);
      }
    ); 
  }

  enviarPregunta(pregunta: string){
    this.loading = true;
    this.preguntas = [];
    this.chatService.enviarMensaje(pregunta).subscribe(
      (respuesta) => {
        this.mensajes.push({ texto: pregunta, tipo: 'enviado' });
        this.mensajes.push({ texto: respuesta.solucion, tipo: 'recibido' });
        // Agregar mensajes similares en tarjetas
        this.preguntas.push({ pregunta: "", tipo: 'preguntas' });
        this.mensaje = '';
        this.pregunta = '';
        this.loading = false;// Realiza acciones adicionales si es necesario
      },
      (error) => {
        this.loading = false;
        console.error('Error al enviar mensaje', error);
      }
    ); 
  }


  showAlert(reaction: boolean,mensaje:string): void {
    const indiceMensaje = this.mensajes.findIndex(m => m.texto === mensaje);
    if (indiceMensaje !== -1) {
      // Resta una posición al índice
      const nuevoIndice = indiceMensaje - 1;
      const Pregunta = this.mensajes[nuevoIndice]['texto']
      this.chatService.sendReview(reaction,mensaje,Pregunta).subscribe()
    }
  }



  ngOnInit() {
    this.chatService.checkServerStatus().subscribe(
      (response: any) => {
        this.serverStatus = response.status === 'online';
        // Resto del código según tus necesidades
      },
      error => {
        console.error('Error al obtener el estado del servidor:', error);
        // Manejo de error según tus necesidades
      }
    );
  }


 

  






  

}
