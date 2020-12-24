import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImagePost } from 'src/app/models/image-post.model';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {

  imageForm: FormGroup;

  constructor(private fb: FormBuilder,
              private imageService: ImageService) { }

  get f(){
    return this.imageForm.controls;
  }

  ngOnInit(): void {
    this.imageForm = this.fb.group({
      name: ['', Validators.required],
      public: [true],
      image: [File, Validators.required]
    });
  }

  onFileChange(event) {
    console.log(event.target.files);
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.imageForm.patchValue({
        image: file
      });
    }
  }

  submit() {
    // console.log(this.imageForm.get('image').value);
    var im = new ImagePost(this.imageForm.get('name').value, this.imageForm.get('image').value);
    this.imageService.postImages(im).subscribe(res => {
      console.log(res);
    });
  }

}
