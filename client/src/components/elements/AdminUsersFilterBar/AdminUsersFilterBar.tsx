import classes from './AdminUsersFilterBar.module.scss';
import SearchInput from '../../inputs/SearchInput/SearchInput'
import SelectInput from '../../inputs/SelectInput/SelectInput';
import { SELECT_ADMIN_OPTIONS__ADMIN, SELECT_ADMIN_OPTIONS__ALL, SELECT_ADMIN_OPTIONS__USERS, SELECT_STATUS_OPTIONS__ACTIVE, SELECT_STATUS_OPTIONS__ALL, SELECT_STATUS_OPTIONS__BANNED } from '../../../constants/selectOptions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useEffect, useState } from 'react';
import { setAdminGetAllUsersUrl } from '../../../store/admin/actions/admin-get-all-users-url';
import { setUrlBoolValue } from '../../../utils/url/setUrlBoolValue';


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
    title: SELECT_STATUS_OPTIONS__ACTIVE,
    value: SELECT_STATUS_OPTIONS__ACTIVE
  },
  {
    title: SELECT_STATUS_OPTIONS__BANNED,
    value: SELECT_STATUS_OPTIONS__BANNED
  }
]


const AdminUsersFilterBar = () => {
  const dispatch = useDispatch();

  const [isAdminOption, setIsAdminOption] = useState<string>('');
  const [isActiveOption, setIsActiveOption] = useState<string>('');

  useEffect(() => {
    dispatch(setAdminGetAllUsersUrl(isActiveOption, isAdminOption));
  }, [dispatch, isActiveOption, isAdminOption])

  const accountTypeValueChangeHandler = (value: string) => {
    setIsAdminOption(setUrlBoolValue(
      'isAdmin', 
      value,
      SELECT_ADMIN_OPTIONS__ADMIN, 
      SELECT_ADMIN_OPTIONS__USERS
    ));
  }

  const accountStatusValueChangeHandler = (value: string) => {
    setIsActiveOption(setUrlBoolValue(
      'isActive', 
      value,
      SELECT_STATUS_OPTIONS__ACTIVE, 
      SELECT_STATUS_OPTIONS__BANNED
    ));
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