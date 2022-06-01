import ImageButton from "../../buttons/ImageButton/ImageButton"
import searchIcon from '../../../images/icon/search.svg';
import classes from './SearchInput.module.scss';
import React, { useEffect, useRef, useState } from "react";
import SearchBarResultsList from "../../lists/SearchBarResultsList/SearchBarResultsList";
import { ISearchbarData } from "../../../interfaces/ISearchbar";

interface IProps {
  title: string;
  searchTime: number;
  searchFunction: (value: string) => void;
  isSearchWindow?: boolean;
  searchWindowData?: ISearchbarData
}

const SearchInput = ({
  title, 
  searchTime, 
  searchFunction,
  isSearchWindow,
  searchWindowData
  }: IProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const[searchInputValue, setSearchInputValue] = useState<string>('');
  const[isSearchWindowActive, setIsSearchWindowActive] = useState<boolean>(false);


  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      searchFunction(searchInputValue);
    }, searchTime);

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
    const value = event.target.value

    setSearchInputValue(value);
    toggleSearchWindow(value);
  }

  const toggleSearchWindow = (value: string) => {
    if(isSearchWindow && !isSearchWindowActive) {
      return setIsSearchWindowActive(true);
    }

    if(isSearchWindow && isSearchWindowActive && value.length <= 0) {
      return setIsSearchWindowActive(false);
    }
  }

  const formClass = !isSearchWindowActive 
    ? `${classes['search-container']}`
    : `${classes['search-container']} ${classes['search-container--active']}`;

  return (
    <form className={formClass} onSubmit={searchSubmitHandler}>
      <div className={classes['searchbar-container']}>
        <input 
          ref={searchInputRef} 
          type='text' 
          placeholder={title} 
          value={searchInputValue} 
          onChange={searchInputHandler} />
        <ImageButton height="70%" width="2rem" image={searchIcon} isSubmit={true} />
        </div>
      {isSearchWindowActive && searchWindowData && 
      <SearchBarResultsList 
        searchbarData={searchWindowData}
      />}
    </form>
  )
}

export default SearchInput