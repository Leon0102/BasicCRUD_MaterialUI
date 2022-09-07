import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  categories: Array<any> = [];
  freshnessList = ["Brand New", "Second Hand", "Refurbished"];
  productForm !: FormGroup;
  actionBtn: string = "Save";
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public editData: any,
  ) { }

  ngOnInit(): void {
    this.categories = [
      { value: '9', viewValue: 'General Knowledge' },
      { value: '10', viewValue: 'Entertainment: Books' },
      { value: '11', viewValue: 'Entertainment: Film' },
      { value: '12', viewValue: 'Entertainment: Music' },
    ]

    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = "Update";
      this.productForm.patchValue(this.editData);
    }

  }

  onSubmit() {
    console.log('submit');
  }

  addProduct() {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.apiService.postProduct(this.productForm.value).subscribe({
          next: (res: any) => {
            alert('Product added successfully');
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: (err: any) => {
            alert('Error while adding product');
          }
        });
      }
    }
    else {
      this.updateProduct();
    }
  }

  updateProduct() {
    this.apiService.putProduct(this.productForm.value, this.editData.id).subscribe({
      next: (res: any) => {
        alert('Product updated successfully');
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error: (err: any) => {
        alert('Error while updating product');
      }
    });
  }
}
