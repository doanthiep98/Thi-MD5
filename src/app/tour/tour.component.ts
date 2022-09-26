import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Tour} from "../model/tour";
import {TourService} from "../service/tour.service";

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {
  formTour!: FormGroup;
  tours: Tour[] = [];
  tour?: Tour;

  constructor(private tourService: TourService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formTour = this.fb.group({
      id: [''],
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
    this.getAllTours();
  }

  get id() {
    return this.formTour?.get('id');
  }

  get title() {
    return this.formTour?.get('title');
  }

  get price() {
    return this.formTour?.get('price');
  }

  get description() {
    return this.formTour?.get('description');
  }

  getAllTours() {
   this.tourService.getAllTours().subscribe(value => {
     this.tours = value
   })
    this.formTour?.reset();
    // @ts-ignore
    document.getElementById("form-create").hidden = false;
    // @ts-ignore
    document.getElementById("form-update").hidden = true;
  }

  getTour(id: number) {
    this.tourService.getTourById(id).subscribe((data) => {
      this.tours = [];
      this.tours.push(data);
    });
  }

  createTour() {
    const tour = {
      id: this.formTour?.value.id,
      title: this.formTour?.value.title,
      price: this.formTour?.value.author,
      description: this.formTour?.value.description
    };
    this.tourService.createTour(tour).subscribe(() => {
      alert('Create Tour Successfully');
      this.formTour?.reset();
      this.getAllTours();
    });
  }

  editTour(id?: number) {
    this.tourService.getTourById(id).subscribe(data => this.formTour?.patchValue(data));
   // @ts-ignore
    document.getElementById("form-update").hidden = false;
    // @ts-ignore
    document.getElementById("form-create").hidden = true;
  }

  updateTour() {
    const tour = {
      id: this.formTour?.value.id,
      title: this.formTour?.value.title,
      author: this.formTour?.value.author,
      description: this.formTour?.value.description
    };
    this.tourService.updateTour(tour.id, tour).subscribe(() => {
      alert('Update Tour Successfully');
      this.formTour?.reset();
      this.getAllTours();
      // @ts-ignore
      document.getElementById("form-update").hidden = true;
    });
  }

  deleteTour(id?: number) {
    if (confirm('Are you sure you want to delete ?')) {
      this.tourService.deleteTour(id).subscribe(() => {
        alert('Delete Successfully');
        this.getAllTours();
      });
    }
  }
}
