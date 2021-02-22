import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../../services/config/config.service';
import {Pokemon, PokemonService} from "../../../services/pokemon/pokemon.service";
import {switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-cypress-test',
  templateUrl: './cypress-test.component.html',
  styleUrls: ['./cypress-test.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})

export class CypressTestComponent implements OnInit {

  pokemon: Pokemon;

  constructor(private pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    this.pokemonService.getPokemon("ditto")
      .subscribe(pokemon => this.pokemon = pokemon);
  }

  searchForPokemon(search: string) {
    this.pokemonService.getPokemon(search.toLowerCase())
      .subscribe(pokemon => this.pokemon = pokemon);
  }

}
