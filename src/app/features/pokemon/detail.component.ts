import { Component, inject, signal, OnInit, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PokemonService } from '../../core/services/pokemon.service';
import { PokemonDetail } from '../../core/models/pokemon.model';

@Component({
  selector: 'app-pokemon-detail',
  imports: [CommonModule, RouterLink],
  template: `
    <div class="space-y-6">
      <a routerLink="/pokemon" class="btn btn-ghost">← Volver</a>

      @if (loading()) {
        <div class="flex justify-center py-8">
          <span class="loading loading-spinner loading-lg"></span>
        </div>
      } @else if (pokemon()) {
        <div class="grid grid-cols-2 gap-6">
          <div class="card bg-base-200">
            <div class="card-body items-center text-center">
              <h1 class="card-title text-4xl capitalize">{{ pokemon()!.name }}</h1>
              <p class="text-on-surface-variant text-lg">#{{ pokemon()!.id }}</p>

              <div class="flex gap-4 my-4">
                <img
                  [src]="pokemon()!.sprites.front_default"
                  [alt]="pokemon()!.name"
                  class="w-40 h-40"
                />
                <img
                  [src]="pokemon()!.sprites.front_shiny"
                  [alt]="pokemon()!.name + ' shiny'"
                  class="w-40 h-40"
                />
              </div>

              <div class="flex gap-2 justify-center">
                @for (type of pokemon()!.types; track type.slot) {
                  <span class="badge badge-lg capitalize badge-primary">{{ type.type.name }}</span>
                }
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <div class="card bg-base-200">
              <div class="card-body">
                <h2 class="card-title text-xl">Características</h2>
                <div class="stats shadow">
                  <div class="stat">
                    <div class="stat-title">Altura</div>
                    <div class="stat-value text-2xl">{{ pokemon()!.height / 10 }}m</div>
                  </div>
                  <div class="stat">
                    <div class="stat-title">Peso</div>
                    <div class="stat-value text-2xl">{{ pokemon()!.weight / 10 }}kg</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card bg-base-200">
              <div class="card-body">
                <h2 class="card-title text-xl">Habilidades</h2>
                <div class="flex flex-wrap gap-2">
                  @for (ability of pokemon()!.abilities; track ability.ability.name) {
                    <span
                      class="badge badge-outline badge-lg capitalize"
                      [class.badge-secondary]="ability.is_hidden"
                    >
                      {{ ability.ability.name }}
                      @if (ability.is_hidden) {
                        (hidden)
                      }
                    </span>
                  }
                </div>
              </div>
            </div>

            <div class="card bg-base-200">
              <div class="card-body">
                <h2 class="card-title text-xl">Estadísticas</h2>
                <div class="space-y-3">
                  @for (stat of pokemon()!.stats; track stat.stat.name) {
                    <div class="flex items-center gap-3">
                      <span class="w-20 capitalize text-sm font-medium">{{ stat.stat.name }}</span>
                      <progress
                        class="progress progress-primary flex-1"
                        [value]="stat.base_stat"
                        max="200"
                      ></progress>
                      <span class="text-sm font-bold w-8">{{ stat.base_stat }}</span>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      } @else {
        <div class="alert alert-error">
          <span>Pokémon no encontrado</span>
        </div>
      }
    </div>
  `,
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
