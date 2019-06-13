import React from 'react';
import {Provider} from 'react-redux';
import {store,history} from './redux/store';
import PublicRoutes from './router';
import Boot from './redux/boot';

const MainApp=()=>{
    <Provider store={store}>
        <PublicRoutes history={history}/>
    </Provider>
};

Boot()
    .then(()=>MainApp())
    .catch(err => console.error(err));

export default MainApp;