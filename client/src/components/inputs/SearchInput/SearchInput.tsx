import ImageButton from "../../buttons/ImageButton/ImageButton"
import searchIcon from '../../../images/icon/search.svg';
import classes from './SearchInput.module.scss';
import React, { useEffect, useRef, useState } from "react";

interface IProps {
  title: string;
  searchTime: number;
  searchFunction: (value: string) => void;
}

const SearchInput = ({title, searchTime, searchFunction}: IProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const[searchInputValue, setSearchInputValue] = useState<string>('');

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      searchFunction(searchInputValue);
    }, searchTime)

    return () => {
      clearTimeout(searchTimeout);
    }
  }, [searchInputValue, searchFunction, searchTime]);

  const searchSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const searchInputValue = searchInputRef.current!.value;
    searchFunction(searchInputValue);
  }

  const searchInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(event.target.value);

    //TODO
  }

  return (
    <form className={classes['search-container']} onSubmit={searchSubmitHandler}>
      <input 
        ref={searchInputRef} 
        type='text' 
        placeholder={title} 
        value={searchInputValue} 
        onChange={searchInputHandler} />
      <ImageButton height="70%" width="2rem" image={searchIcon} isSubmit={true} />
    </form>
  )
}

export default SearchInput