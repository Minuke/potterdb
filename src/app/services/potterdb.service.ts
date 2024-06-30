import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Character, Attributes, CharactersResponse } from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root'
})
export class PotterdbService {

  private readonly http = inject(HttpClient);
  private charactersSubject = new BehaviorSubject<Character[]>([]);
  characters$ = this.charactersSubject.asObservable();
  private readonly baseUrl:string = "https://api.potterdb.com/v1/characters";

  // GET characters
  getCharacters():Observable<CharactersResponse>{
    return this.http.get<CharactersResponse>(this.baseUrl);
  }

   // GET characters by name
  searchCharacters(name: string): Observable<CharactersResponse> {
    const url = `${this.baseUrl}?filter[name_cont]=${name}&[limit]=10`;
    return this.http.get<CharactersResponse>(url);
  }

  updateCharacters(characters: Character[]) {
    this.charactersSubject.next(characters);
  }

}