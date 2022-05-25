import BigCreateButton from '../../buttons/BigCreateButton/BigCreateButton';
import classes from './CreateProductContainer.module.scss';

const CreateProductContainer = () => {
  return (
    <section className={classes['create-product-container']}>
      <BigCreateButton
        title='Product'
      />
    </section>
  )
}

export default CreateProductContainer