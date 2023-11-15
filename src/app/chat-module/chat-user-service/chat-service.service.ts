import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  private apiUrl = 'http://127.0.0.1:5051/chatbot/preguntas'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  enviarMensaje(mensaje: string): Observable<any> {
    const body = { "pregunta": mensaje };
    // Realiza una solicitud POST a la API con el mensaje
    return this.http.post<any>(this.apiUrl, body );
  }
}
