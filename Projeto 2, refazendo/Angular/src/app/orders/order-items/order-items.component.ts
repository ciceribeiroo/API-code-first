import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { OrderItem } from 'src/app/shared/order-item.model';
import { ItemService } from 'src/app/shared/item.service';
import { Item } from 'src/app/shared/item.model';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styles: []
})
export class OrderItemsComponent implements OnInit {
  formData: OrderItem;
  itemList: Item[];
  isValid: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<OrderItemsComponent>,
    private itemService: ItemService,
    private orderSevice: OrderService) { }

  ngOnInit() {
    this.itemService.getItemList().then(res => this.itemList = res as Item[]);
    if (this.data.orderItemIndex == null)
      this.formData = {
        OrderItemID: null,
        OrderID: this.data.OrderID,
        ItemID: 0,
        ItemName: '',
        Price: 0,
        Quantity: 0,
        Total: 0
      }
    else
      this.formData = Object.assign({}, this.orderSevice.orderItems[this.data.orderItemIndex]);
  }

  updatePrice(ctrl) {
    if (ctrl.selectedIndex == 0) {
      this.formData.Price = 0;
      this.formData.ItemName = '';
    }
    else {
      this.formData.Price = this.itemList[ctrl.selectedIndex -1].Price; // -1 quando tem - select
      this.formData.ItemName = this.itemList[ctrl.selectedIndex-1].ItemName; // -1 quando tem - select
    }
    this.updateTotal();
  }

  updateTotal() {
    this.formData.Total = parseFloat((this.formData.Quantity * this.formData.Price).toFixed(2));
  }

  onSubmit(form: NgForm) {
    if (this.validateForm(form.value)) {
      if (this.data.orderItemIndex == null)
        this.orderSevice.orderItems.push(form.value);
      else
        this.orderSevice.orderItems[this.data.orderItemIndex] = form.value;
      this.dialogRef.close();
    }
  }

  validateForm(formData: OrderItem) {
    this.isValid = true;
    if (formData.ItemID == 0)
      this.isValid = false;
    if (formData.Quantity == 0)
      this.isValid = false;
    return this.isValid;
  }

}