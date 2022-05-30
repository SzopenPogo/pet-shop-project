import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IProduct } from '../../../interfaces/IProduct';
import { RootState } from '../../../store';
import { adminDeleteProduct } from '../../../store/product/actions/product-delete-actions';
import { selectProduct } from '../../../store/product/actions/product-select-actions';
import DeleteButton from '../../buttons/DeleteButton/DeleteButton';
import EditButton from '../../buttons/EditButton/EditButton';
import MainButton from '../../buttons/MainButton/MainButton';
import ProductItemImageContainer from '../../containers/ProductItemImageContainer/ProductItemImageContainer';
import ProductForm from '../../forms/ProductForm/ProductForm';
import MainModal from '../../modals/MainModal/MainModal';
import classes from './AdminProductListItem.module.scss';

interface IProps extends IProduct {
  index: number
}

const AdminProductListItem = ({
  _id,
  description,
  images,
  price,
  subcategoryId,
  title,
  index
}: IProps) => {
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.user.token);
  const {_id: selectedSubcategoryId, 
    index: selectedSubcategoryIndex} = useSelector((state: RootState) => state.product.selectedProduct);

  const [isReadonly, setIsReadonly] = useState<boolean>(true);
  const [isDeleteWindow , setIsDeleteWindow] = useState<boolean>(false);

  const toggleProductEdit = () => {
    setIsReadonly(!isReadonly);
  }

  const productSelectToDeleteHandler = () => {
    dispatch(selectProduct({_id, index}));
    toggleDeleteWindow();
  }

  const toggleDeleteWindow = () => {
    setIsDeleteWindow(!isDeleteWindow);
  }

  const deleteProductHandler = () => {
    dispatch(adminDeleteProduct(token, selectedSubcategoryId, selectedSubcategoryIndex));
  }

  const categoryItemClass = isReadonly 
  ? `${classes['admin-product-item']}`
  : `${classes['admin-product-item']} ${classes['admin-product-item--edit']}`;

  return (
    <>
      <li className={categoryItemClass}>
        <div className={classes['info-items']}>
          <span><span className={classes['id-wrapper']}>ID:</span> {_id}</span>
          {isReadonly && <ProductItemImageContainer images={images} title={title} />}
        </div>
        <ProductForm
          _id={_id}
          description={description}
          images={images}
          index={index}
          price={price}
          subcategoryId={subcategoryId}
          title={title}
          isReadonly={isReadonly}
        />

        <div className={classes['product-manage-buttons']}>
          <DeleteButton onClick={productSelectToDeleteHandler} />
          <EditButton isActive={isReadonly} onClick={toggleProductEdit} />
        </div>
      </li>
      <MainModal 
        activate={isDeleteWindow}
        timeout={300}
        title={`Delete "${title}"`}
        closeFunction={toggleDeleteWindow}
      >
        <>
          <h2 style={{margin: '.5rem 0'}}>
            Are you sure you want to delete {title}?
          </h2>
          <span style={{marginBottom: '1rem'}}>ID: {_id}</span>
          <MainButton
            isSubmit={false}
            title='Delete'
            onClick={deleteProductHandler}
          />
        </>
      </MainModal>
    </>
  )
}

export default AdminProductListItem