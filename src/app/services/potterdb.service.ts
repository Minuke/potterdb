import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Character, CharactersResponse } from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root'
})
export class PotterdbService {

  private readonly http = inject(HttpClient);
  private charactersSubject = new BehaviorSubject<Character[]>([]);
  characters$ = this.charactersSubject.asObservable();
  private readonly baseUrl: string = "https://api.potterdb.com/v1/characters";

  searchCharacters(name: string, limit: number | null = 10): Observable<CharactersResponse> {
    let url = this.baseUrl;
    if (name) {
      url += `?filter[name_cont]=${name}`;
      if (limit !== null) {
        url += `&page[limit]=${limit}`;
      }
    }
    return this.http.get<CharactersResponse>(url);
  }

  updateCharacters(characters: Character[]) {
    this.charactersSubject.next(characters);
  }
}
