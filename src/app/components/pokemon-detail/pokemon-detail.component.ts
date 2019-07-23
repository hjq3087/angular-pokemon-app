import { Component, OnInit, Input } from '@angular/core'
import { Pokemon } from '../../model/pokemon'

import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'

import { PokemonService } from '../../service/pokemon.service'

@Component({
    selector: 'app-pokemon-detail',
    templateUrl: './pokemon-detail.component.html',
    styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {

    @Input() pokemon: Pokemon
    topList: Pokemon[]
    isOnList: boolean

    constructor(
        private route: ActivatedRoute,
        private pokemonService: PokemonService,
        private location: Location
    ) { }

    ngOnInit() {
        this.getTopList()
        this.getPokemon()
    }

    getTopList(): void {
        this.pokemonService.getTopList()
            .subscribe(topList => {
                this.topList = topList
            })
    }

    getPokemon(): void {
        const id = this.route.snapshot.paramMap.get('id')
        this.pokemonService.getPokemon(id)
            .subscribe(pokemon => {
                this.pokemon = pokemon[0]
                this.isOnList = this.checkOnList(this.pokemon, this.topList)
            })
    }

    checkOnList(pokemon: Pokemon, list: Pokemon[]): boolean {
        const id = pokemon.id
        const isOnlist = list.some(pokemon => pokemon.id === id)
        return isOnlist
    }

    goBack(): void {
        this.location.back();
    }

    add(): void {
        this.pokemonService.addPokemon(this.pokemon)
            .subscribe(() => {
                this.isOnList = true
            })
    }

    delete(): void {
        const id = this.route.snapshot.paramMap.get('id')
        this.pokemonService.deletePokemon(id)
            .subscribe(() => {
                this.isOnList = false
            })
    }

}
