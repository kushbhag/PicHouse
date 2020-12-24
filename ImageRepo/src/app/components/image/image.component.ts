import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Image } from 'src/app/models/image.model';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  id: string;
  image: Image;

  constructor(private route: ActivatedRoute,
              private imageService: ImageService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.imageService.getImage(this.id).subscribe(i => {
        this.image = i.image;
      });
    });
  }
}
