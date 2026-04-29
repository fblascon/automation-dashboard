import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../core/services/pokemon.service';
import { Pokemon } from '../../core/models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  imports: [CommonModule, RouterLink],
  template: `
    <div class="pokedex-container">
      <div class="header">
        <h1>Pokédex</h1>
        <p>Explora la colección de Pokémon</p>
      </div>

      @if (loading()) {
        <div class="loading">
          <div class="spinner"></div>
        </div>
      } @else {
        <div class="pokemon-grid">
          @for (pokemon of pokemon(); track pokemon.name) {
            <a [routerLink]="['/pokemon', pokemon.name]" class="pokemon-card">
              <span class="pokemon-number">#{{ getId(pokemon.url) }}</span>
              <span class="pokemon-name capitalize">{{ pokemon.name }}</span>
            </a>
          }
        </div>

        <div class="pagination">
          <button [disabled]="offset() === 0" (click)="previousPage()" class="nav-button">
            ← Anterior
          </button>
          <button [disabled]="pokemon().length < 20" (click)="nextPage()" class="nav-button">
            Siguiente →
          </button>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .pokedex-container {
        max-width: 1000px;
        margin: 0 auto;
        padding: 1rem;
      }

      .header {
        margin-bottom: 2rem;
      }

      .header h1 {
        font-size: 2rem;
        font-weight: 700;
        margin: 0 0 0.5rem 0;
      }

      .header p {
        color: var(--mat-sys-on-surface-variant);
        margin: 0;
      }

      .loading {
        display: flex;
        justify-content: center;
        padding: 3rem;
      }

      .spinner {
        width: 40px;
        height: 40px;
        border: 3px solid var(--mat-sys-surface-container-high);
        border-top-color: var(--mat-sys-primary);
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      .pokemon-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 1rem;
      }

      .pokemon-card {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        background: var(--mat-sys-surface-container-high);
        border-radius: 12px;
        text-decoration: none;
        color: var(--mat-sys-on-surface);
        transition:
          transform 0.2s,
          box-shadow 0.2s;
      }

      .pokemon-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      .pokemon-number {
        font-size: 0.8rem;
        color: var(--mat-sys-on-surface-variant);
      }

      .pokemon-name {
        font-size: 1rem;
        font-weight: 600;
        margin-top: 0.25rem;
      }

      .pagination {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 2rem;
      }

      .nav-button {
        padding: 0.5rem 1.5rem;
        background: var(--mat-sys-primary-container);
        color: var(--mat-sys-on-primary-container);
        border: none;
        border-radius: 8px;
        font-weight: 500;
        cursor: pointer;
        transition: opacity 0.2s;
      }

      .nav-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .nav-button:hover:not(:disabled) {
        opacity: 0.9;
      }

      .capitalize {
        text-transform: capitalize;
      }
    `,
  ],
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
