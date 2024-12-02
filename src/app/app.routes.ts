import { Routes } from '@angular/router';
import { TableComponent } from './component/table/table.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PokemonDetailComponent } from './component/pokemon-detail/pokemon-detail.component';
import { ListaFavComponent } from './component/lista-fav/lista-fav.component';
import { ErrorComponent } from './component/error/error.component';

export const routes: Routes = [
  {path: '', component: TableComponent},
  {path: 'pokemon/:name', component: PokemonDetailComponent},
  {path: 'lista', component: ListaFavComponent},
  {path: 'error', component: ErrorComponent},
  {path:'**', redirectTo: '/error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
