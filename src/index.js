import { h } from 'preact';
import { Provider } from 'preact-redux';
import configureStore from './store/index';

import './style';
import App from './components/app';

const Application = () => (
    <Provider store={configureStore({})}>
        <App />
    </Provider>
)

export default Application;
