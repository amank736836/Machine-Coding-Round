import { useState } from 'react';
import './App.css';
import InfiniteScroll from './Components/InfiniteScroll';
function App() {
  const [data, setData] = useState([]);
  return (
    <InfiniteScroll data={data} setData={setData}/>
  );
}

export default App;
