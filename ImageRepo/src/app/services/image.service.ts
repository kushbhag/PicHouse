import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from 'src/app/models/image.model'
import { ImagePost } from '../models/image-post.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  apiPath: string;

  constructor(private http: HttpClient) {
    this.apiPath = "https://image-repository-kush.herokuapp.com";
    //this.apiPath = "http://localhost:3000";
  }

  getImages(): Observable<any> {
    return this.http.get<any>(this.apiPath+"/image");
  }

  getImage(id: string): Observable<any> {
    return this.http.get<any>(this.apiPath+"/image/"+id);
  }

  postImages(image: ImagePost) {
    const formData: FormData = new FormData();
    formData.append('imageUpload', image.imageUpload);
    formData.append('name', image.name);
    return this.http.post(this.apiPath+"/image", formData);
  }
}
