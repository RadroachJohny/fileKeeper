import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";



import {beersLoad} from "../../redux/actions";

import classes from './styles.module.scss';

const MainTable = () => {
  const dispatch = useDispatch()
  const beers = useSelector((state: any) => state.beerReducer)
  console.log(beers)
  useEffect(() => {
    fetch('https://api.punkapi.com/v2/beers?page=2&per_page=25')
      .then(res => {
        return res.json()
      })
      .then(res => {
        dispatch(beersLoad(res))
      })
  },[])

  return <div className={classes.container}>
    <div className={classes['table-wrapper']}>
      <table className={classes.table}>
        <tr>
          <th>Name</th>
          <th>Tagline</th>
          <th>Photo</th>
          <th>ABV</th>
        </tr>
        {beers.length && beers.map(({name, tagline, image_url, abv}: any) => {
          return (

            <tr className={classes.row}>
              <td>{name}</td>
              <td>{tagline}</td>
              <td><img src={image_url} alt=""/></td>
              <td>{abv}</td>
            </tr>
          )
        })}

      </table>
    </div>
  </div>
};

export default MainTable;