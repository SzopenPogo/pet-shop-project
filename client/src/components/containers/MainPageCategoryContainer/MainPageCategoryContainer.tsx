import classes from './MainPageCategoryContainer.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import CategoryList from '../../lists/CategoryList/CategoryList';

const MainPageCategoryContainer = () => {
  const categoryData = useSelector((state: RootState) => state.category.categories.data);
  
  const renderCategoryLists = categoryData.map(category => (
    <CategoryList
      key={category._id}
      title={category.title}
      subcategories={category.subcategoryRef}
    />
  ))

  return (
    <section className={classes['category']}>
      {renderCategoryLists}
    </section>
  )
}

export default MainPageCategoryContainer