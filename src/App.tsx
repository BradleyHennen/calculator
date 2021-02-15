import store from './store';
import { Provider } from "react-redux";
import Routes from './routes';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
