import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../store"
import { addInfoMessage } from "../../../store/ui/actions/info-items-actions";
import AdminCategoryListItem from "../../list-items/AdminCategoryListItem/AdminCategoryListItem";
import Spinner from "../../spinners/Spinner/Spinner";
import classes from './AdminCategoryList.module.scss';

const AdminCategoryList = () => {
  const dispatch = useDispatch();

  const categories = useSelector((state: RootState) => state.category.categories);
  const {loading, error, data} = categories;

  useEffect(() => {
    if(error) {
      dispatch(addInfoMessage({message: error, timeout: 2000, isPositive: false}));
    }
  }, [dispatch, error, ]);

  const renderCategories = data.map((category, index) => (
    <AdminCategoryListItem 
      key={category.title}
      index={index}
      title={category.title} 
      _id={category._id}  
    />
  ))

  return (
    <ul className={classes['admin-category-list']}>
      {!loading && renderCategories}
      {loading && <Spinner borderSize='.75rem' size='12rem' color='gray' />}
    </ul>
  )
}

export default AdminCategoryList