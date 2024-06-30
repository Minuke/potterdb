import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PotterdbService } from '../../services/potterdb.service';
import { CharactersResponse } from '../../interfaces/character.interface';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  
  searchText: string = '';
  searchSubject: Subject<string> = new Subject();
  public potterdbService = inject(PotterdbService);

  ngOnInit() {
    this.searchCharacters(''); 
    this.searchSubject.pipe(
      debounceTime(500)
    ).subscribe(searchValue => {
      this.searchCharacters(searchValue);
    });
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchSubject.next(target?.value || '');
  }

  private searchCharacters(searchValue: string) {
    const limit = searchValue ? 10 : null; // Si hay texto de búsqueda, limita los resultados a 10
    this.potterdbService.searchCharacters(searchValue, limit).subscribe(
      (response: CharactersResponse) => {
        const characters = limit ? response.data.slice(0, limit) : response.data;
        this.potterdbService.updateCharacters(characters);
      }
    );
  }
}
