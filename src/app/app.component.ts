import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  displayedColumns: string[] = ['productName', 'category', 'price', 'freshness', 'comment', 'date', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  title = 'material-ui';

  constructor(
    private dialog: MatDialog,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '30%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'save') {
        this.getAllProducts();
      }
      console.log(`Dialog result: ${result}`);
    });
  }

  getAllProducts() {
    this.apiService.getProduct().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(row: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(result => {
      if (result === 'update') {
        this.getAllProducts();
      }
    }
    );
  }
  deleteProduct(id: any) {
    this.apiService.deleteProduct(id).subscribe({
      next: (res: any) => {
        alert('Product deleted successfully');
        this.getAllProducts();
      },
      error: (err: any) => {
        alert('Error while deleting product');
      }
    });
  }
}
