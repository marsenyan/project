import React from "react";
import styles from "./Search.module.scss"
import { SearchContext } from "../../App";
import debounce from "lodash.debounce";


const Search = () => {
  const [value, setValue] = React.useState("");
  const {searchValue, setSearchValue} = React.useContext(SearchContext);
  const inputRef = React.useRef(); 
  const onClickClear = () =>{
    setSearchValue("")
    setValue("")
    inputRef.current.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 250),
    [],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

    return (
        <div className={styles.root}>
            <svg 
              className={styles.icon}
              
              fill="none" 
              height="24" 
              stroke="currentColor" 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              viewBox="0 0 24 24" 
              width="24" 
              xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" x2="16.65" y1="21" y2="16.65"/>
            </svg>
            <input 
              ref={inputRef}
              value={value} 
              onChange = {onChangeInput}
              className={styles.input} 
              placeholder="Busqueda de pizza..."
            />
            {searchValue &&(
            <svg 
              onClick={onClickClear}
              className={styles.clearIcon}
              height="48" 
              viewBox="0 0 48 48" 
              width="48" 
              xmlns="http://www.w3.org/2000/svg">
                <path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"/><path d="M0 0h48v48H0z" fill="none"/>
            </svg>
            )}

        </div>
        
    );
};


export default Search;