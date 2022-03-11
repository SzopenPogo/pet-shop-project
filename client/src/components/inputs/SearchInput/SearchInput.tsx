import ImageButton from "../../buttons/ImageButton/ImageButton"
import searchIcon from '../../../images/icon/search.svg';
import classes from './SearchInput.module.scss';

const SearchInput = () => {
  const searchHandler = () => {

  }

  return (
    <form className={classes['search-container']}>
      <ImageButton height="70%" width="2rem" image={searchIcon} onClick={searchHandler} />
      <input type='text' placeholder="Search our store" />
    </form>
  )
}

export default SearchInput