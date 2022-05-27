import classes from './AdminSubcategoryList.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import AdminSubcategoryListItem from '../../list-items/AdminSubcategoryListItem/AdminSubcategoryListItem';

const AdminSubcategoryList = () => {
  const {data} = useSelector((state: RootState) => state.subcategory.subcategories);

  const renderSubcategories = data.map((subcategory, index) => (
    <AdminSubcategoryListItem
      key={subcategory._id}
      _id={subcategory._id}
      title={subcategory.title}
      imageUrl={subcategory.imageUrl}
      index={index}
      categoryId={subcategory.categoryId}
    />
  ));

  return (
    <ul className={classes['admin-subcategory-list']}>
      {data.length <= 0 && <h1>No subcategories found</h1>}
      {data.length > 0 && renderSubcategories}
    </ul>
  )
}

export default AdminSubcategoryList