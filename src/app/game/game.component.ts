import { Component, OnInit } from '@angular/core';
import { Gamelogic } from '../gamelogic';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [Gamelogic]
})
export class GameComponent implements OnInit {

  constructor(public game: Gamelogic) { }
  ngOnInit(): void {

  }
  startGame(): void {
    this.game.gameStart();
    const currentPlayer = 'Turno actual: Jugador ' + this.game.currentTurn;
    const information = document.querySelector('.current-status');

    if (information === null) {
      console.log('ups');
    }
    else {
      information.innerHTML = currentPlayer;
    }
  }

  async clickSubField(subfield: any): Promise<void> {
    if (this.game.gameStatus === 1) {
      const position = subfield.currentTarget.getAttribute('position');
      const information = document.querySelector('.current-status');

      console.log(position);
      this.game.setField(position, this.game.currentTurn);

      const color = this.game.getPlayerColorClass();
      subfield.currentTarget.classList.add(color);


      await this.game.checkGameEndWinner().then( (end:boolean) =>{
        if(this.game.gameStatus === 0 && end){
          if (information === null) {
            console.log('ups');
          }
          else {
            information.innerHTML = 'El ganador es: Jugador ' + this.game.currentTurn;
          }
        }
      });

      await this.game.checkGameEndFull().then( (end:boolean) =>{
        if(this.game.gameStatus === 0 && end){
          if (information === null) {
            console.log('ups');
          }
          else {
            information.innerHTML = 'No hay ganador';
          }
        }
      });


      this.game.changePlayer();
      if (this.game.gameStatus === 1) {
        const currentPlayer = 'Turno actual: Jugador ' + this.game.currentTurn;
        if (information === null) {
          console.log('ups');
        }
        else {
          information.innerHTML = currentPlayer;
        }
      }
    }


  }



}
