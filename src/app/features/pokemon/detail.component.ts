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
        <div class="card bg-base-200">
          <div class="card-body">
            <h1 class="card-title text-3xl capitalize">{{ pokemon()!.name }}</h1>
            <p class="text-on-surface-variant">#{{ pokemon()!.id }}</p>

            <div class="flex gap-4 my-4">
              <img
                [src]="pokemon()!.sprites.front_default"
                [alt]="pokemon()!.name"
                class="w-32 h-32"
              />
              <img
                [src]="pokemon()!.sprites.front_shiny"
                [alt]="pokemon()!.name + ' shiny'"
                class="w-32 h-32"
              />
            </div>

            <div class="stats stats-vertical lg:stats-horizontal shadow">
              <div class="stat">
                <div class="stat-title">Altura</div>
                <div class="stat-value text-lg">{{ pokemon()!.height / 10 }} m</div>
              </div>
              <div class="stat">
                <div class="stat-title">Peso</div>
                <div class="stat-value text-lg">{{ pokemon()!.weight / 10 }} kg</div>
              </div>
            </div>

            <div class="mt-4">
              <h3 class="font-bold mb-2">Tipos</h3>
              <div class="flex gap-2">
                @for (type of pokemon()!.types; track type.slot) {
                  <span class="badge badge-lg capitalize">{{ type.type.name }}</span>
                }
              </div>
            </div>

            <div class="mt-4">
              <h3 class="font-bold mb-2">Habilidades</h3>
              <div class="flex flex-wrap gap-2">
                @for (ability of pokemon()!.abilities; track ability.ability.name) {
                  <span
                    class="badge badge-outline capitalize"
                    [class.badge-secondary]="ability.is_hidden"
                  >
                    {{ ability.ability.name }}
                    {{ ability.is_hidden ? '(hidden)' : '' }}
                  </span>
                }
              </div>
            </div>

            <div class="mt-4">
              <h3 class="font-bold mb-2">Estadísticas base</h3>
              <div class="space-y-2">
                @for (stat of pokemon()!.stats; track stat.stat.name) {
                  <div class="flex items-center gap-2">
                    <span class="w-24 capitalize text-sm">{{ stat.stat.name }}</span>
                    <progress
                      class="progress progress-primary w-full"
                      [value]="stat.base_stat"
                      max="200"
                    ></progress>
                    <span class="text-sm w-8">{{ stat.base_stat }}</span>
                  </div>
                }
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
