import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { PokemonsComponent } from './components/pokemons/pokemons.component'
import { HomeComponent } from './components/home/home.component'
import { DashboardComponent }   from './components/dashboard/dashboard.component'
import { PokemonDetailComponent }   from './components/pokemon-detail/pokemon-detail.component'


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'pokemons', component: PokemonsComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'detail/:id', component: PokemonDetailComponent },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
