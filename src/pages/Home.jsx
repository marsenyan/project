import React from 'react';

import { useSelector,  useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { sortList } from '../components/Sort';
import qs from "qs";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Pagination from '../Pagination';
import { SearchContext } from '../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';





const Home = () =>{

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const categoryId = useSelector((state)=> state.filterSlice.categoryId);
  const sortProperty = useSelector((state)=> state.filterSlice.sort.sortProperty);
  const currentPage = useSelector((state) => state.filterSlice.pageCount); 
 
  const {searchValue} = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  //const [categoryId, setCategoryId] = React.useState(0);
  //const [currentPage, setCurrentPage] = React.useState(1);
 /* const [sortType, setSortType] = React.useState({
    name: "popularidad",
    sortProperty: "rating",
  });*/

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = number => {
    dispatch(setCurrentPage(number));
  }

    const fetchPizzas = () => {
    const sortBy = sortProperty.replace("-", " ");
    const order = sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}`: " ";
    const search = searchValue ? `&search=${searchValue}` : " ";
    
    axios
    .get(
      `https://64522b38bce0b0a0f73e6343.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((response) => {
        setItems(response.data);
        setIsLoading(false);
      });
    

    }
    
  

  React.useEffect(() => {
    if(window.location.search){
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true; 
    }

  },[])


  React.useEffect(() => {
    window.scrollTo(0, 0);
    if(!isSearch.current){
      fetchPizzas();
    }  
    isSearch.current = false;
  }, [categoryId, sortProperty, searchValue, currentPage]); 

  

    
    /*fetch(
      `https://64522b38bce0b0a0f73e6343.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((res) => res.json())
      .then((arr)=> {
       setItems(arr);
       setIsLoading(false)
      });*/
  
  //(2) if there was a first rwnder, only then check when changing the parameters whether it is a necessary to sew into the URL o no 
  // if the parameters were changed and there was a first rendering
   
  //(1)if there was a first rendering, then we check the URL parameters and save to Redux
   
  

  React.useEffect(() => {
    if(isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  },[categoryId, sortProperty, searchValue, currentPage]);
  

  return(
      <div className="container">
        <div className="content__top">
            <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
            <Sort/>
        </div>
        <h2 className="content__title">Todas pizzas</h2>
        <div className="content__items">
          {isLoading
            ?[...new Array(6)].map((_, index) => <Skeleton key ={index}/>)
            :items.map((obj)=><PizzaBlock key={obj.id} {...obj}/>)
          
          }
          <Pagination currentPage = {currentPage} onChangePage={onChangePage}/>
  
        </div>
     
      </div>
    
  )
     
  
}

export default Home;