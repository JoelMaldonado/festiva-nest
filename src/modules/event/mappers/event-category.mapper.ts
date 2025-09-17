import { CategoryEntity } from '@entities/category.entity';

export function mapEventCategory(item: CategoryEntity) {
  return {
    id: item.id,
    title: item.title,
    idStatus: item.status.id,
  };
}
