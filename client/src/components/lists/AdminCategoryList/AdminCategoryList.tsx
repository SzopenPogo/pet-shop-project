import { useSelector } from "react-redux"
import { RootState } from "../../../store"
import AdminCategoryListItem from "../../list-items/AdminCategoryListItem/AdminCategoryListItem";
import classes from './AdminCategoryList.module.scss';

const AdminCategoryList = () => {
  const categories = useSelector((state: RootState) => state.category.categories.data);

  const renderCategories = categories.map((category) => (
    <AdminCategoryListItem 
      key={category.title} 
      title={category.title} 
      _id={category._id}  
    />
  ))

  return (
    <ul className={classes['admin-category-list']}>
      {renderCategories}
    </ul>
  )
}

export default AdminCategoryList