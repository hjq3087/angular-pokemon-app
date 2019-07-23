import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'

import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Pokemon } from '../model/pokemon'
// import { POKEMONS } from '../db/pokemons'

import { MessageService } from './message.service'

import { catchError, map, tap } from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
})

export class PokemonService {

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) { }

    private pokemonUrl = 'http://localhost:5000/api/pokemon'

    private log(message: string) {
        this.messageService.add(`PokemonService: ${message}`);
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            // console.error(error) // log to console instead

            // TODO: better job of transforming error for user consumption
            const errorMsg = error.error.msg
            this.log(`${operation} failed: ${errorMsg}`)

            // Let the app keep running by returning an empty result.
            return of(result as T)
        }
    }

    getPokemons(): Observable<Pokemon[]> {
        const pokemons = this.http
            .get<Pokemon[]>(`${this.pokemonUrl}/all`)
            .pipe(
                tap(_ => this.log('fetched pokemons')),
                catchError(this.handleError<Pokemon[]>('getPokemons', []))
            )
        return pokemons
    }

    getTopList(): Observable<Pokemon[]> {
        const pokemons = this.http
            .get<Pokemon[]>(`${this.pokemonUrl}/toplist`)
            .pipe(
                tap(_ => this.log('fetched toplist')),
                catchError(this.handleError<Pokemon[]>('getToplist', []))
            )
        return pokemons
    }

    getPokemon(id: string): Observable<Pokemon> {
        const pokemon = this.http
            .get<Pokemon>(`${this.pokemonUrl}/${id}`)
            .pipe(
                tap(_ => this.log(`fetched Pokemon id=${id}`)),
                catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
            )
        return pokemon
    }

    addPokemon(pokemon: Pokemon): Observable<any> {
        const data:string = JSON.stringify(pokemon)
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        }
        const url = `${this.pokemonUrl}/toplist/add`
        const post = this.http.post(url, data, httpOptions)
            .pipe(
                tap(_ => this.log(`add pokemon id=${pokemon.id}`)),
                catchError(this.handleError<any>('addPokemon'))
            )
        return post
    }

    deletePokemon(id: string): Observable<Pokemon> {
        const pokemons = this.http
            .get<Pokemon>(`${this.pokemonUrl}/toplist/delete/${id}`)
            .pipe(
                tap(_ => this.log(`delete Pokemon id=${id}`)),
                catchError(this.handleError<Pokemon>(`deletePokemon id=${id}`))
            )
        return pokemons
    }
}
