import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Playground } from "./playground";

@Injectable({
  providedIn: 'root'
})
export class PlaygroundService {
  playgrounds$: Observable<Playground[]>;

  constructor(http: HttpClient) {
    this.playgrounds$ = http.get<Playground[]>('/assets/copenhagen.json');
  }

  getPlaygrounds() {
    return this.playgrounds$;
  }

  getPlayground(id: any): Observable<Playground | undefined> {
    return this.playgrounds$.pipe(
      map(playgrounds => playgrounds.find(playground => playground.id === id))
    );
  }
}