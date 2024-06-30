import { HttpClient } from '@angular/common/http';
import { Attribute, Component, inject } from '@angular/core';
import { PotterdbService } from '../../services/potterdb.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Attributes, Character, CharactersResponse } from '../../interfaces/character.interface';
import { CommonModule } from '@angular/common';
import { DefaultImagePipe } from '../../pipes/default-image.pipe';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule, DefaultImagePipe],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css'
})
export class CharactersComponent {

  public potterdbService = inject(PotterdbService);
  public unsubscribe$ = new Subject<void>();
  public characters$!: Character[];


  ngOnInit():void {
    this.getCharacters();
  }

  getCharacters(): void {
    this.potterdbService.getCharacters()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((response: CharactersResponse) => {
        this.characters$ = response.data;
    });
  }

  ngOnDestroy():void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}