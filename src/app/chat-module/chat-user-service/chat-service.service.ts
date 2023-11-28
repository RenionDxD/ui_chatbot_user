import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  private apiUrl = 'http://127.0.0.1:5051/chatbot/preguntas'; // Reemplaza con la URL de tu API
  private apiUrl2 = 'http://127.0.0.1:5051/chatbot/Online';
  private apiUrl3 = 'http://127.0.0.1:5051/chatbot/send_review';
  constructor(private http: HttpClient) { }

  enviarMensaje(mensaje: string): Observable<any> {
    const body = { "pregunta": mensaje };
    // Realiza una solicitud POST a la API con el mensaje
    return this.http.post<any>(this.apiUrl, body );
  }

  checkServerStatus() {
    return this.http.get(this.apiUrl2);
  }

  sendReview(review: boolean, respuesta: string, Pregunta: string) {
    const body = { "respuesta": respuesta,
                   "review":review,
                   "pregunta":Pregunta };
    return this.http.post<any>(this.apiUrl3, body );
  }
}
