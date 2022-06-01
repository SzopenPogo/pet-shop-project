import { BACKEND_URL } from '../../../constants/backend';
import { ISearchbarData } from '../../../interfaces/ISearchbar';
import Spinner from '../../spinners/Spinner/Spinner';
import classes from './SearchBarResultsList.module.scss';

interface IProps {
  searchbarData: ISearchbarData
}

const SearchBarResultsList = ({searchbarData}: IProps) => {
  const {loading, data} = searchbarData;
  const renderResults = data.map(result => (
    <li key={result._id} className={classes['result-item']}>
      <div 
        className={classes['result-item-image']}
        style={{backgroundImage: `url('${BACKEND_URL}/${result.imageUrl}')`}}
       />
      <h3 className={classes['result-item-title']}>
        {result.title}
      </h3>
    </li>
  ));

  return (
    <ul className={classes['search-results']}>
      {!loading && renderResults}
      {loading && <Spinner size={'2rem'} borderSize={'.35rem'} color={'gray'} />}
    </ul>
  )
}

export default SearchBarResultsList