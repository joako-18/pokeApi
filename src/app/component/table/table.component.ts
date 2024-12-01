import { Component, Output, EventEmitter } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Pokemon } from '../../models/pokemon';
import { PokeApiService } from '../../services/poke-api.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { RemplacePipe } from '../../pipes/remplace.pipe';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatIconModule, RemplacePipe],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent {
  displayedColumns: string[] = ['name', 'url', 'favorite'];
  pokemons: Pokemon[] = [];
  @Output() favoriteChanged = new EventEmitter<Pokemon[]>();

  constructor(private pokeApiService: PokeApiService, private router: Router) {}

  ngOnInit(): void {
    this.pokeApiService.getPokemons(15, 0).subscribe((response: any) => {
      this.pokemons = response.results.map((pokemon: any) => {
        const id = pokemon.url.split('/').filter(Boolean).pop(); // Extrae el ID del Pokémon
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

        return {
          ...pokemon,
          isFavorite: false,
          url: imageUrl // Agrega la URL de la imagen al objeto Pokémon
        };
      });
    });
  }

  toggleFavorite(pokemon: Pokemon): void {
    pokemon.isFavorite = !pokemon.isFavorite;
    this.updateFavoriteList(pokemon);
  }

  updateFavoriteList(pokemon: Pokemon): void {
    const favoritos: Pokemon[] = JSON.parse(localStorage.getItem('favoritos') || '[]');

    if (pokemon.isFavorite) {
      if (!favoritos.some((fav) => fav.name === pokemon.name)) {
        favoritos.push({ ...pokemon });
      }
    } else {
      const index = favoritos.findIndex((fav) => fav.name === pokemon.name);
      if (index !== -1) favoritos.splice(index, 1);
    }

    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }

  navigateToDetails(pokemon: Pokemon): void {
    this.router.navigate(['/pokemon', pokemon.name]);
  }
}
