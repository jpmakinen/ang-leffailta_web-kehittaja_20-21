// luokka, jossa määritellään kuvan ominaisuudet

export class Image {
  key!: string;
  name!: string;
  url!: string;
  file: File;

  constructor(file: File) {
    this.file = file;
  }
}
