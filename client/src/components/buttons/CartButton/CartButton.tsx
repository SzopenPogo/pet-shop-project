import cartIcon from '../../../images/icon/bag.svg';
import ImageButton from '../ImageButton/ImageButton';

interface IProps {
  size: string;
}

const CartButton = ({ size }: IProps) => {
  
  const cartButtonHandler = () => {

  }

  return (
    <ImageButton
      width={size}
      height={size}
      image={cartIcon}
      isSubmit={false}
      onClick={cartButtonHandler}
    />
  )
}

export default CartButton