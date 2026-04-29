import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../core/services/pokemon.service';
import { Pokemon } from '../../core/models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  imports: [CommonModule, RouterLink],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-bold mb-1">Pokédex</h1>
        <p class="text-on-surface-variant">Lista de Pokémon de la API</p>
      </div>

      @if (loading()) {
        <div class="flex justify-center py-8">
          <span class="loading loading-spinner loading-lg"></span>
        </div>
      } @else {
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          @for (pokemon of pokemon(); track pokemon.name) {
            <a
              [routerLink]="['/pokemon', pokemon.name]"
              class="card bg-base-200 hover:bg-base-300 transition-colors cursor-pointer"
            >
              <div class="card-body p-4">
                <span class="text-xs text-on-surface-variant">#{{ getId(pokemon.url) }}</span>
                <h2 class="card-title text-lg capitalize">{{ pokemon.name }}</h2>
              </div>
            </a>
          }
        </div>

        <div class="flex justify-center gap-4">
          <button class="btn btn-primary" [disabled]="offset() === 0" (click)="previousPage()">
            Anterior
          </button>
          <button class="btn btn-primary" [disabled]="pokemon().length < 20" (click)="nextPage()">
            Siguiente
          </button>
        </div>
      }
    </div>
  `,
})
export class PokemonListComponent implements OnInit {
  private pokemonService = inject(PokemonService);

  pokemon = signal<Pokemon[]>([]);
  loading = signal(true);
  offset = signal(0);

  ngOnInit() {
    this.loadPokemon();
  }

  loadPokemon() {
    this.loading.set(true);
    this.pokemonService.getPokemonList(20, this.offset()).subscribe({
      next: (data) => {
        this.pokemon.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  getId(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2], 10);
  }

  nextPage() {
    this.offset.update((v) => v + 20);
    this.loadPokemon();
  }

  previousPage() {
    if (this.offset() > 0) {
      this.offset.update((v) => v - 20);
      this.loadPokemon();
    }
  }
}
