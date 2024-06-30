import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultImage',
  standalone: true
})
export class DefaultImagePipe implements PipeTransform {

  transform(imageUrl: string | null | undefined, defaultImageUrl: string = 'assets/images/missing_character.png'): string {
    if (!imageUrl || imageUrl.trim() === '') {
      return defaultImageUrl;
    }
    return imageUrl;
  }

}