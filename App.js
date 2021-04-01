import * as React from 'react';
import { Provider } from 'react-redux'
import createStore from './Redux'
import RootContainer from "./RootContainer";

const store = createStore()

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

export default App
