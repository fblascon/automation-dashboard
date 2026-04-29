import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;

  beforeEach(() => {
    service = new PokemonService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
