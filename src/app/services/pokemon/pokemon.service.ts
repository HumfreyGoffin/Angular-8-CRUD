// https://pipl.ir/v1/getPerson


import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class PokemonService {

  constructor(private http: HttpClient) {
  }


  public getPokemon(pokemonName: string) {
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  }
}

export interface Pokemon {
  name: string;
  order: string;
  sprites: Sprites;
}

export interface Sprites {
  front_default: string;
}
