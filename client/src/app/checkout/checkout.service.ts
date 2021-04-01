import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDeliveryMeathod } from '../shared/models/deliveryMeathod';
import { IOrderToCreate } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createOrder(order: IOrderToCreate){
    return this.http.post(this.baseUrl + 'orders', order);
  }

  getDeliveryMeathods(){
    return this.http.get(this.baseUrl + 'orders/deliveryMeathods').pipe(
      map((dm: IDeliveryMeathod[]) => {
        return dm.sort((a, b) => b.price - a.price);
      })
    );
  }


}
