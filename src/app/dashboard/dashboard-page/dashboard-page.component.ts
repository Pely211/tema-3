import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/_core/models/Game';
import { GameDataService } from 'src/app/_core/services/game-data.service';
import { GamesService } from 'src/app/_core/services/games.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  gameList = [];
  gameName: string;
  gameDescription: string;

  // prettier ignore
  constructor(
    private router: Router,
    private gamesService: GamesService,
    private gameDataService: GameDataService,
  ) { }

  ngOnInit(): void {
    this.gamesService.getGames().subscribe((res) => {
      this.gameList = res
    });
  }

  navigateToGamePage(gameInfo: any): void {
    this.gameDataService.selectedGame = gameInfo;
    this.router.navigate(['/game-page'], { queryParams: { gameId: gameInfo.id } });
  }

  addNewGame(): void {
    const gameInfo = {
      title: this.gameName,
      description: this.gameDescription
    }
    this.gamesService.addGame(gameInfo).subscribe((res) => this.gameList.push(res));
  }
  filterGames(filterName): void {
    const filtered = document.getElementsByClassName("gameCard") as unknown as HTMLElement;
      let i=0;
    while(i<this.gameList.length)
    {
      if(this.gameList[i].title!==filterName && !this.gameList[i].title.includes(filterName)) 
      {
        filtered[i].hidden="True";
      }
      i++;
    }
    }
    sortGames(): void{
      let i=0;
      let j=0;
      while(i<this.gameList.length-1)
      {
        while(j<this.gameList.length-i-1)
        {
          if(this.gameList[j].title>this.gameList[j+1].title)
          {
            let tempgame=this.gameList[j];
            this.gameList[j]=this.gameList[j+1];
            this.gameList[j+1]=tempgame;
          }
          j++;
        }
        i++;
      }
    }
    
    
  }
