import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../model/pokemon'
import { PokemonService } from '../../service/pokemon.service'

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    pokemons: Pokemon[] = []

    constructor(private pokemonService: PokemonService) { }

    ngOnInit() {
        this.getTopList();
    }

    getTopList(): void {
        this.pokemonService.getTopList()
            .subscribe(pokemons => this.pokemons = pokemons);
    }
}