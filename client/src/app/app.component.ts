import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SkiNet';
  faCoffee = faCoffee;


  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    const basketId = localStorage.getItem('basket_id');
    if(basketId){
      this.basketService.getBasket(basketId).subscribe(() => {
        console.log('initialised basket');
      }, error => {
        console.log(error)
      });
    }
  }

}
