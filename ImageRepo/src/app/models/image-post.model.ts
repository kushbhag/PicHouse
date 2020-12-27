export class ImagePost {
    constructor(name: string, imageUpload: File, userId: string) {
        this.name = name;
        this.imageUpload = imageUpload;
        this.userId = userId;
    }

    name: string;
    imageUpload: File;
    userId: string;
}