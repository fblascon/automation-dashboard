import { Component, inject, signal, OnInit, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PokemonService } from '../../core/services/pokemon.service';
import { PokemonDetail } from '../../core/models/pokemon.model';

@Component({
  selector: 'app-pokemon-detail',
  imports: [CommonModule, RouterLink],
  template: `
    <div class="pokedex-container">
      <a routerLink="/pokemon" class="back-link">← Volver a la Pokédex</a>

      @if (loading()) {
        <div class="loading-container">
          <div class="spinner"></div>
        </div>
      } @else if (pokemon()) {
        <div class="pokemon-detail">
          <div class="pokemon-card main-card">
            <h1 class="pokemon-name capitalize">{{ pokemon()!.name }}</h1>
            <p class="pokemon-id">#{{ pokemon()!.id }}</p>

            <div class="sprites">
              <img [src]="pokemon()!.sprites.front_default" [alt]="pokemon()!.name" />
              <img [src]="pokemon()!.sprites.front_shiny" [alt]="pokemon()!.name + ' shiny'" />
            </div>

            <div class="types">
              @for (type of pokemon()!.types; track type.slot) {
                <span class="type-badge capitalize" [attr.data-type]="type.type.name">
                  {{ type.type.name }}
                </span>
              }
            </div>
          </div>

          <div class="info-cards">
            <div class="info-card">
              <h2>Características</h2>
              <div class="info-grid">
                <div class="info-item">
                  <span class="info-label">Altura</span>
                  <span class="info-value">{{ pokemon()!.height / 10 }} m</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Peso</span>
                  <span class="info-value">{{ pokemon()!.weight / 10 }} kg</span>
                </div>
              </div>
            </div>

            <div class="info-card">
              <h2>Habilidades</h2>
              <div class="abilities">
                @for (ability of pokemon()!.abilities; track ability.ability.name) {
                  <span class="ability-tag capitalize" [class.hidden]="ability.is_hidden">
                    {{ ability.ability.name }}
                    @if (ability.is_hidden) {
                      (hidden)
                    }
                  </span>
                }
              </div>
            </div>

            <div class="info-card">
              <h2>Estadísticas Base</h2>
              <div class="stats-list">
                @for (stat of pokemon()!.stats; track stat.stat.name) {
                  <div class="stat-row">
                    <span class="stat-name capitalize">{{ stat.stat.name }}</span>
                    <div class="stat-bar-container">
                      <div class="stat-bar" [style.width.%]="(stat.base_stat / 200) * 100"></div>
                    </div>
                    <span class="stat-value">{{ stat.base_stat }}</span>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      } @else {
        <div class="error-message">Pokémon no encontrado</div>
      }
    </div>
  `,
  styles: [
    `
      .pokedex-container {
        max-width: 900px;
        margin: 0 auto;
        padding: 1rem;
      }

      .back-link {
        display: inline-block;
        color: var(--mat-sys-primary);
        text-decoration: none;
        font-weight: 500;
        margin-bottom: 1.5rem;
      }

      .back-link:hover {
        text-decoration: underline;
      }

      .loading-container {
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

      .pokemon-detail {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
      }

      @media (max-width: 768px) {
        .pokemon-detail {
          grid-template-columns: 1fr;
        }
      }

      .pokemon-card {
        background: var(--mat-sys-surface-container-high);
        border-radius: 16px;
        padding: 2rem;
        text-align: center;
      }

      .pokemon-name {
        font-size: 2rem;
        font-weight: 700;
        margin: 0;
      }

      .pokemon-id {
        color: var(--mat-sys-on-surface-variant);
        margin: 0.5rem 0;
      }

      .sprites {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin: 1.5rem 0;
      }

      .sprites img {
        width: 120px;
        height: 120px;
      }

      .types {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
      }

      .type-badge {
        padding: 0.4rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 500;
        background: var(--mat-sys-primary-container);
        color: var(--mat-sys-on-primary-container);
      }

      .info-cards {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .info-card {
        background: var(--mat-sys-surface-container-high);
        border-radius: 12px;
        padding: 1.25rem;
      }

      .info-card h2 {
        font-size: 1.1rem;
        font-weight: 600;
        margin: 0 0 1rem 0;
      }

      .info-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }

      .info-item {
        text-align: center;
      }

      .info-label {
        display: block;
        color: var(--mat-sys-on-surface-variant);
        font-size: 0.85rem;
        margin-bottom: 0.25rem;
      }

      .info-value {
        font-size: 1.25rem;
        font-weight: 600;
      }

      .abilities {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      .ability-tag {
        padding: 0.3rem 0.8rem;
        border-radius: 16px;
        font-size: 0.85rem;
        background: var(--mat-sys-surface-container);
        border: 1px solid var(--mat-sys-outline);
      }

      .ability-tag.hidden {
        background: var(--mat-sys-secondary-container);
      }

      .stats-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      .stat-row {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .stat-name {
        width: 70px;
        font-size: 0.85rem;
        color: var(--mat-sys-on-surface-variant);
      }

      .stat-bar-container {
        flex: 1;
        height: 8px;
        background: var(--mat-sys-surface-container);
        border-radius: 4px;
        overflow: hidden;
      }

      .stat-bar {
        height: 100%;
        background: var(--mat-sys-primary);
        border-radius: 4px;
      }

      .stat-value {
        width: 30px;
        text-align: right;
        font-weight: 600;
        font-size: 0.9rem;
      }

      .error-message {
        padding: 2rem;
        text-align: center;
        background: var(--mat-sys-error-container);
        color: var(--mat-sys-on-error-container);
        border-radius: 12px;
      }

      .capitalize {
        text-transform: capitalize;
      }
    `,
  ],
})
export class PokemonDetailComponent implements OnInit {
  private pokemonService = inject(PokemonService);

  name = input<string>();

  pokemon = signal<PokemonDetail | null>(null);
  loading = signal(true);

  ngOnInit() {
    this.loadPokemon();
  }

  loadPokemon() {
    const pokemonName = this.name();
    if (!pokemonName) return;

    this.loading.set(true);
    this.pokemonService.getPokemonDetail(pokemonName).subscribe({
      next: (data) => {
        this.pokemon.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.pokemon.set(null);
        this.loading.set(false);
      },
    });
  }
}
