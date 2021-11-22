import React, {useState, useEffect} from "react";
import { classNames } from 'classnames';
import './App.css';
import './css/style.css';
import { Pagination } from './Pagination';

function App() {
  const [data, setData] = useState([]);
  const [currentListIndex, setCurrentListIndex] = useState(0);
  const [search, setSearch] = useState('');
  const [reset, setReset] = useState(false);

  const vendorIndexRange = [
      20 * currentListIndex,
      20 * (currentListIndex + 1),
  ];
  const visibleList = data.slice(...vendorIndexRange);

  useEffect(async () => {
    const response = await fetch(`/currency`)
    const data = await response.json();
    setData(data)
  }, [reset])

  const handleChangeCurrentCurrency = (e) => {
      setSearch(e.target.value);
  }

  const handleSearch = (e) => {
      e.stopPropagation();
      const newCurrency = data.filter((currensyInfo) => currensyInfo.name.match(search));
      setData(newCurrency);
  }

  const handleReset = () => {
      setReset(!reset)
      setSearch('')
  }

  return (
      <div class='main'>
          <div >
            Search:
              <input className="input" type="text" name="search"  value={search} onChange={(e) => handleChangeCurrentCurrency(e)}/>
              <button
                  className="button"
                  onClick={(e) => handleSearch(e)}
              >
                  go!
              </button>
              <button
                  className="button"
                  onClick={() => handleReset()}
              >
                  reset
              </button>
          </div>
          <div class='table1'>
                  <div class='table'>
                      {
                          data.length === 0 ? (
                              <p>Список пуст</p>
                          ) : (
                              <table>
                                  <tr>
                                      <th>N</th>
                                      <th>Currency</th>
                                  </tr>
                                  {visibleList.map((currency, i) => (
                                      <>
                                          <tr>
                                              <td>{i + 1}</td>
                                              <td class='secondTD'>{currency.name}</td>
                                          </tr>
                                      </>
                                  ))}
                              </table>
                          )
                      }
                      <Pagination
                          class='pagination'
                          amount={Math.ceil(data.length / 20)}
                          currentIndex={currentListIndex}
                          onToggle={(newIndex) => setCurrentListIndex(newIndex)}
                      />
                  </div>
          </div>
      </div>
  );
}

export default App;
