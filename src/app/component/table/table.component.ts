import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Pokemon } from '../../models/pokemon';
import { PokeApiService } from '../../services/poke-api.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { RemplacePipe } from '../../pipes/remplace.pipe';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatIconModule, RemplacePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  displayedColumns: string[] = ['name', 'url','favorite'];
  pokemons: Pokemon[] = [];

  constructor(private pokeApiService: PokeApiService, private router: Router) {}

  ngOnInit(): void {
    this.pokeApiService.getPokemons(15, 0).subscribe((response: any) => {
      this.pokemons = response.results.map((pokemon: Pokemon) => ({
        ...pokemon,
        isFavorite: false
      }));
    });
  }

  toggleFavorite(pokemon: Pokemon): void {
    pokemon.isFavorite = !pokemon.isFavorite;
  }

  navigateToDetails(pokemon: Pokemon): void {
    this.router.navigate(['/pokemon', pokemon.name]);
  }
}
