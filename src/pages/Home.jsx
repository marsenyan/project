import React from 'react';


import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Pagination from '../Pagination';
import { SearchContext } from '../App';




const Home = () =>{
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => (state.filter.categoryId));
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const currentPage = useSelector((state) => state.filter.currentPage);

  const {searchValue} = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  //const [categoryId, setCategoryId] = React.useState(0);
  //const [currentPage, setCurrentPage] = React.useState(1);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  };
  const onChangePage = number => {
    dispatch(setCurrentPage(number));
  }
  
  React.useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.replace("-", " ");
    const order = sortType.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}`: " ";
    const search = searchValue ? `&search=${searchValue}` : " ";

    /*fetch(
      `https://64522b38bce0b0a0f73e6343.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((res) => res.json())
      .then((arr)=> {
       setItems(arr);
       setIsLoading(false)
      });*/
    axios.get(
      `https://64522b38bce0b0a0f73e6343.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((response) => {
        setItems(response.data);
        setIsLoading(false);
      });
    window.scrollTo(0,0);
  }, [categoryId, sortType, searchValue, currentPage]);

 

   
  return(
      <div className="container">
        <div className="content__top">
            <Categories value={categoryId} onChangeCategory={(id) => onChangeCategory(id)}/>
            <Sort/>
        </div>
        <h2 className="content__title">Todas pizzas</h2>
        <div className="content__items">
          {isLoading
            ?[...new Array(6)].map((_, index) => <Skeleton key ={index}/>)
            :items.map((obj)=><PizzaBlock key={obj.id} {...obj}/>)
          
          }
          <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
  
        </div>
     
      </div>
    
  )
     
  
}

export default Home;