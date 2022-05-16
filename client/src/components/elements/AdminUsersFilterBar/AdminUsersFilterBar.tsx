import classes from './AdminUsersFilterBar.module.scss';
import SearchInput from '../../inputs/SearchInput/SearchInput'
import SelectInput from '../../inputs/SelectInput/SelectInput';
import { SELECT_ADMIN_OPTIONS__ADMIN, SELECT_ADMIN_OPTIONS__ALL, SELECT_ADMIN_OPTIONS__USERS, SELECT_STATUS_OPTIONS__ADMIN, SELECT_STATUS_OPTIONS__ALL, SELECT_STATUS_OPTIONS__USERS } from '../../../constants/selectOptions';


const SELECT_TYPE_OPTIONS = [
  {
    title: SELECT_ADMIN_OPTIONS__ALL,
    value: SELECT_ADMIN_OPTIONS__ALL
  },
  {
    title: SELECT_ADMIN_OPTIONS__ADMIN,
    value: SELECT_ADMIN_OPTIONS__ADMIN
  },
  {
    title: SELECT_ADMIN_OPTIONS__USERS,
    value: SELECT_ADMIN_OPTIONS__USERS
  }
];

const SELECT_STATUS_OPTIONS = [
  {
    title: SELECT_STATUS_OPTIONS__ALL,
    value: SELECT_STATUS_OPTIONS__ALL
  },
  {
    title: SELECT_STATUS_OPTIONS__ADMIN,
    value: SELECT_STATUS_OPTIONS__ADMIN
  },
  {
    title: SELECT_STATUS_OPTIONS__USERS,
    value: SELECT_STATUS_OPTIONS__USERS
  }
]


const AdminUsersFilterBar = () => {
  const accountTypeValueChangeHandler = (value: string) => {
    console.log('val ' + value);
    
  }

  const accountStatusValueChangeHandler = (value: string) => {
    console.log('val ' + value);
  }

  return (
    <div className={classes['user-filter-bar-container']}>
      <div><SearchInput /></div>
      <form>
        <SelectInput
          isRequired={false}
          isLabel={true}
          title='Account type'
          options={SELECT_TYPE_OPTIONS}
          onChangeFunction={accountTypeValueChangeHandler}
        />
        <SelectInput
          isRequired={false}
          isLabel={true}
          title='Account status'
          options={SELECT_STATUS_OPTIONS}
          onChangeFunction={accountStatusValueChangeHandler}
        />
      </form>
    </div>
  )
}

export default AdminUsersFilterBar