import { Component, Input ,SimpleChanges } from '@angular/core'

import { Pokemon } from '../../model/pokemon'

@Component({
    selector: 'app-result-list',
    templateUrl: './result-list.component.html',
    styleUrls: ['./result-list.component.css']
})
export class ResultListComponent {

    @Input() resultList: Pokemon[]
    
    showPokemons: Pokemon[]
    range: number
    isAllShowed: boolean

    init() {
        this.range = 9
        this.showPokemons = this.resultList.slice(0, this.range)
        this.isAllShowed = this.resultList.length < this.range ? true : false
    }

    // ngOnInit() {
        // this.range = 9
        // this.showPokemons = this.resultList.slice(0, this.range)
        // this.isAllShowed = this.resultList.length < this.range ? true : false
    //     this.init()
    //     console.log(this.showPokemons)
    // }

    ngOnChanges(changes: SimpleChanges) {
        // for (let pN in changes) {
        //     let chng = changes[pN]
        //     let cur = chng.currentValue.length
        //     let prev = chng.previousValue ? chng.previousValue.length : 0
        //     console.log(cur, prev)
        // }
        console.log(changes)
        this.init()
    }
    
    showMove() {
        this.range = this.range + 9 > this.resultList.length ? this.resultList.length : this.range + 9
        this.showPokemons = this.resultList.slice(0, this.range)
        this.isAllShowed = this.showPokemons.length === this.resultList.length ? true: false
    }

}
