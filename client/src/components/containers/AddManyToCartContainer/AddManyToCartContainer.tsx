import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../../store/cart/actions/cart-add-to-actions';
import AddToCartBigButton from '../../buttons/AddToCartBigButton/AddToCartBigButton';
import NumberInput from '../../inputs/NumberInput/NumberInput';
import classes from './AddManyToCartContainer.module.scss';

interface IProps {
  _id: string;
}

const AddManyToCartContainer = ({_id}: IProps) => {
  const dispatch = useDispatch();

  const ammountRef = useRef<HTMLInputElement>(null);

  const addToCartHandler = () => {
    const ammountValue = ammountRef.current?.value ? ammountRef.current?.value :  1;
    
    dispatch(addItemToCart({_id, ammount: +ammountValue}))
  }

  const setMinimumValue = (value: string) => {
    return +value > 0;
  }

  return (
    <div className={classes['add-many-to-cart-container']}>
      <NumberInput
        ref={ammountRef}
        isLabel={false}
        isReadonly={false}
        isRequired={false}
        title='Ammount'
        value={1}
        min={1}
        validateInput={setMinimumValue}
      />
      <AddToCartBigButton onClick={addToCartHandler} />
    </div>
  )
}

export default AddManyToCartContainer