import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PotterdbService } from '../../services/potterdb.service';
import { Character } from '../../interfaces/character.interface';
import { DefaultImagePipe } from '../../pipes/default-image.pipe';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule, DefaultImagePipe],
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  
  characters: Character[] = [];
  public potterdbService = inject(PotterdbService);

  ngOnInit() {
    this.potterdbService.characters$.subscribe(characters => {
      this.characters = characters;
      console.log(this.characters);
    });
  }
}
