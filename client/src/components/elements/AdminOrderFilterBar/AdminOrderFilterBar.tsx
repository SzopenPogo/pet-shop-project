import OrderSearchbar from '../../Searchbars/OrderSearchbar/OrderSearchbar';
import OrderStatusUrlSelect from '../../Select/OrderStatusUrlSelect/OrderStatusUrlSelect';
import OrderSortSwitch from '../../Switches/OrderSortBySwitch/OrderSortSwitch';
import classes from './AdminOrderFilterBar.module.scss';

const AdminOrderFilterBar = () => {
  return (
    <div className={classes['admin-order-filter-bar']}>
      <div className={classes['order-item-container']}>
        <OrderSearchbar />
      </div>
      <div className={classes['order-item-container']}>
        <OrderStatusUrlSelect />
      </div>
      <OrderSortSwitch 
        title={'Date'} 
        url={'sortDate'} 
      />
    </div>
  )
}

export default AdminOrderFilterBar;