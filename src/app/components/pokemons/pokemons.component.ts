import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core'
import { Pokemon } from '../../model/pokemon'
import { PokemonService } from '../../service/pokemon.service'

@Component({
    selector: 'app-pokemons',
    templateUrl: './pokemons.component.html',
    styleUrls: ['./pokemons.component.css', '../../app.component.css'],
    providers: [ PokemonService]
})
export class PokemonsComponent implements OnInit {

    constructor(private pokemonService: PokemonService) { }
    pokemons: Pokemon[]
    showAll: boolean
    keyWord: string
    keyWordResultList: Pokemon[]

    getPokemons(): void {
        this.pokemonService.getPokemons()
            .subscribe(pokemons => {
                this.pokemons = pokemons
            })
    }

    
    ngOnInit() {
        console.log('onInit')
        this.getPokemons()
    }

    toggleShowAll(): void {
        this.showAll = !this.showAll
    }

    searchKeyWord(keyWord: string): void {
        console.log('click')
        console.log(`you are searching for ${keyWord} of the Pokemons`)
        const result = this.pokemons.filter(pokemon => pokemon.name.includes(keyWord))
        console.log(`you got a result-list of ${result.length} pokemons`)
        this.keyWordResultList = result
    }
}
