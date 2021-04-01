import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { IDeliveryMeathod } from 'src/app/shared/models/deliveryMeathod';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkoutForm: FormGroup;
  deliveryMeathods: IDeliveryMeathod[];

  constructor(private checkoutService: CheckoutService, private basketService: BasketService) { }

  ngOnInit(): void {
    this.checkoutService.getDeliveryMeathods().subscribe((dm: IDeliveryMeathod[]) => {
      this.deliveryMeathods = dm;
    }, error => {
      console.log(error);
    });
  }

  setShippingPrice(deliveyMeathod: IDeliveryMeathod){
    this.basketService.setShippingPrice(deliveyMeathod);
  }

}
