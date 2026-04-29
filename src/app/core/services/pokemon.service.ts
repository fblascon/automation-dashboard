import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap, catchError, of } from 'rxjs';
import { Pokemon, PokemonDetail, PokemonListResponse } from '../models/pokemon.model';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemonList(limit = 20, offset = 0): Observable<Pokemon[]> {
    return this.http
      .get<PokemonListResponse>(`${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`)
      .pipe(map((response) => response.results));
  }

  getPokemonDetail(name: string): Observable<PokemonDetail | null> {
    return this.http.get<PokemonDetail>(`${this.baseUrl}/pokemon/${name}`).pipe(
      catchError(() => {
        console.error(`Pokemon ${name} not found`);
        return of(null);
      }),
    );
  }

  getPokemonById(id: number): Observable<PokemonDetail | null> {
    return this.http.get<PokemonDetail>(`${this.baseUrl}/pokemon/${id}`).pipe(
      catchError(() => {
        console.error(`Pokemon with id ${id} not found`);
        return of(null);
      }),
    );
  }
}
