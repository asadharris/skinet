import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AccountService } from '../account/account.service';
import { BasketService } from '../basket/basket.service';
import { IBasketTotals } from '../shared/models/basket';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  //basketTotals$: Observable<IBasketTotals>;
  checkoutForm: FormGroup

  constructor(private fb: FormBuilder, private accountService: AccountService, private basketService: BasketService) { }

  ngOnInit(): void {
    this.createCheckoutForm();
    this.getAddressFormValues();
    this.getDeliveryMeathodValue()
    //this.basketTotals$ = this.basketService.basketTotal$;
  }

  createCheckoutForm(){
    this.checkoutForm = this.fb.group({
      addressForm: this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        street: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        zipCode: [null, Validators.required]
      }),
      deliveryForm: this.fb.group({
        deliveryMeathod: [null, Validators.required]
      }),
      paymentForm: this.fb.group({
        nameOnCard: [null, Validators.required]
      })
    });
  }

  getAddressFormValues(){
    this.accountService.getUserAddress().subscribe(address => {
      if(address){
        this.checkoutForm.get('addressForm').patchValue(address);
      }
    }, error => {
       console.log(error);
    });
  }

  getDeliveryMeathodValue(){
    const basket = this.basketService.getCurrentBasketValue();
    if(basket.deliveryMeathodId !== null){
      console.log(basket.deliveryMeathodId);
      this.checkoutForm.get('deliveryForm').get('deliveryMeathod').patchValue(basket.deliveryMeathodId.toString());
    }
    else
    {
      console.log("No deliveryMeathodId");
    }
    
  }

}
