import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PotterdbService } from './potterdb.service';
import { Character, CharactersResponse } from '../interfaces/character.interface';

describe('PotterdbService', () => {
  let service: PotterdbService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PotterdbService]
    });
    service = TestBed.inject(PotterdbService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch characters', () => {
    const mockCharacters: Character[] = [
      {
        id: '1',
        type: 'character',
        attributes: {
          name: 'Harry Potter',
          slug: 'harry-potter',
          alias_names: [],
          animagus: null,
          blood_status: null,
          boggart: null,
          born: null,
          died: null,
          eye_color: null,
          family_members: [],
          gender: null,
          hair_color: null,
          height: null,
          house: null,
          image: null,
          jobs: [],
          marital_status: null,
          nationality: null,
          patronus: null,
          romances: [],
          skin_color: null,
          species: null,
          titles: [],
          wands: [],
          weight: null,
          wiki: ''
        },
        links: { self: '' }
      }
    ];

    const mockResponse: CharactersResponse = {
      data: mockCharacters
    };

    service.searchCharacters('Harry', 10).subscribe((charactersResponse: CharactersResponse) => {
      expect(charactersResponse.data.length).toBe(1); // Verifica que haya un solo personaje en la respuesta
      expect(charactersResponse.data[0].id).toBe('1'); // Verifica el ID del personaje
      expect(charactersResponse.data[0].attributes.name).toBe('Harry Potter'); // Verifica el nombre del personaje
    });

    const req = httpMock.expectOne(`${service.baseUrl}?filter[name_cont]=Harry&page[limit]=10`);
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockCharacters });
  });
});
