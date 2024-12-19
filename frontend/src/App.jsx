import { RouterProvider } from 'react-router-dom'
import router from './router'

import './App.css'
import { Provider } from 'react-redux';
import store from './store/store';

function App() {

  return (
    <div className='app'>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;