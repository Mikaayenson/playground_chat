import { useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { useAuth, useResolved } from 'hooks';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Chat, Login, Signup } from 'components';
import { ChatProvider } from 'context/ChatContext';

export const App = () => {
    const history = useHistory();
    const { authUser } = useAuth();
    const authResolved = useResolved(authUser);

    useEffect(() => {
        if (authResolved) {
            history.push(!!authUser ? '/' : '/login');
        }
    }, [authUser, authResolved, history]);

    return authResolved ? (
        <ChatProvider authUser={authUser}>
            <div className="app">
                <Switch>
                    <Chat exact path='/' component={Chat}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/signup' component={Signup}/>
                </Switch>
            </div>
        </ChatProvider>
    ) : (<>Loading...</>);
};
