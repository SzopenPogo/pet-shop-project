import { ISubcategory } from '../../../interfaces/ISubcategory';
import SubcategoryListItem from '../../list-items/SubcategoryListItem/SubcategoryListItem';
import classes from './CategoryList.module.scss';

interface IProps {
  title: string;
  subcategories: Array<ISubcategory>;
}

const CategoryList = ({ title, subcategories }: IProps) => {
  
  const renderSubcategories = subcategories.map(subcategory => (
    <SubcategoryListItem
      key={subcategory._id}
      _id={subcategory._id}
      categoryId={subcategory.categoryId}
      imageUrl={subcategory.imageUrl}
      title={subcategory.title}
    />
  ))

  return (
    <div className={classes['category-container']}>
      <h1>{title}</h1>
      <ul className={classes['category-list']}>
        {renderSubcategories}
      </ul>
    </div>
  )
}

export default CategoryList