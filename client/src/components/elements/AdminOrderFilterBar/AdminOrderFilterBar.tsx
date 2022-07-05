import OrderSearchbar from '../../Searchbars/OrderSearchbar/OrderSearchbar';
import classes from './AdminOrderFilterBar.module.scss';

const AdminOrderFilterBar = () => {
  return (
    <div className={classes['admin-order-filter-bar']}>
      <div className={classes['order-searchbar-container']}>
        <OrderSearchbar />
      </div>
    </div>
  )
}

export default AdminOrderFilterBar;