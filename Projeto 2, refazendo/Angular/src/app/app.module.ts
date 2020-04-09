import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderComponent } from './orders/order/order.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderItemsComponent } from './orders/order-items/order-items.component';
import { OrderService } from './shared/order.service';

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    OrdersComponent,
    OrderItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule
  ],
  entryComponents:[OrderItemsComponent],
  providers: [OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
