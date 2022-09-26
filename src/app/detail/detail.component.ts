import { Component, OnInit } from '@angular/core';
import { Tour } from '../model/tour';
import {TourService} from "../service/tour.service";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  tour?: Tour;
  id!: number;

  constructor(private tourService: TourService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = parseInt(<string>paramMap.get('id'));
    })
  }

  ngOnInit(): void {
  }

  getBookById(id: number) {
    this.tourService.getTourById(id).subscribe(tour => {
      this.tour = tour;
    })
  }

}
