import slugify from 'slugify';
import { nanoid } from 'nanoid';

export default function uniqueSlug(title) {
  return (slugify(title) + '-' + nanoid(6)).toLowerCase();
}