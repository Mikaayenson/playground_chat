import { Route, Switch } from 'react-router-dom';
import { Chat, Login, Signup } from 'components';

export const App = () => {

    return (
        <Switch>
            <Chat exact path='/' component={Chat}/>
            <Route path='/login' component={Login}/>
            <Route path='/signup' component={Signup}/>

        </Switch>
    );
};