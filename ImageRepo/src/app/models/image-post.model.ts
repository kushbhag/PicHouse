export class ImagePost {
    constructor(name: string, imageUpload: File) {
        this.name = name;
        this.imageUpload = imageUpload;
    }

    name: string;
    imageUpload: File;
}