import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TourComponent} from "./tour/tour.component";
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: 'tour',
    component: TourComponent
  }, {
    path: 'detail/:id',
    component: DetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
