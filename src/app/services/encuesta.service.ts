import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_BACKEND } from '../constants';
import { Encuesta } from '../models/encuesta.model';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  urlEncuesta = `${URL_BACKEND}/api/encuesta`;

  constructor(private http: HttpClient) { }

  save (encuesta: Encuesta) {
    return this.http.post(this.urlEncuesta, encuesta);
  }

  getAll () {
    return this.http.get(this.urlEncuesta);
  }
}
