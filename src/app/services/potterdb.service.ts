import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Character, Attributes, CharactersResponse } from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root'
})
export class PotterdbService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl:string = "https://api.potterdb.com/v1/characters";

  // GET characters
  getCharacters():Observable<CharactersResponse>{
    return this.http.get<CharactersResponse>(this.baseUrl);
  }

}