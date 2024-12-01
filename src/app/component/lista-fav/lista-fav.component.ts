import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-lista-fav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-fav.component.html',
  styleUrls: ['./lista-fav.component.scss'],
})
export class ListaFavComponent implements OnInit {
  favoritos: Pokemon[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
    } else {
      console.warn('localStorage no está disponible en este entorno.');
      this.favoritos = [];
    }
  }

  removeFromFavorites(pokemon: any): void {
    this.favoritos = this.favoritos.filter(fav => fav.name !== pokemon.name);
    localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
  }

}
