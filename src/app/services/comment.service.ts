import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Comment } from '../Comment';
import { Response } from '../Response';


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  // vai fazer a ligação com o banco de dados e retorna uma resposta.

  private baseApiUrl = environment.baseApiUrl;

  private apiUrl = `${this.baseApiUrl}/api/moments`

  constructor(
    private http: HttpClient,
  ) { }


    createComment(data: Comment): Observable<Response<Comment>>{

      const url = `${this.apiUrl}/${data.momentId}/comments`;

      return this.http.post<Response<Comment>>(url, data);
    }


}
