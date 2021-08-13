import { Route } from 'react-router-dom';
import { useState } from 'react';

import Menu from './components/Menu'
import Home from './components/Home'
import Test from './components/Test'
import Loading from './components/Loading';

function App() {     
  
  const [ loading, setLoading ] = useState(true);

  return (
    <div className="App">
        <Loading loading={loading}/>
        <Menu />
        <div className='middle-container'>
           <Route exact path='/' component={()=><Home setLoading={setLoading} />}></Route>
           <Route exact path='/quiz/:category' component={({ match : { params } })=><Test params={params} setLoading={setLoading}/>}></Route>
        </div>
    </div>
  );
}

export default App
