import App from '../App';
import Home from '../pages/Home';
import User from '../pages/User';
import Album from '../pages/Album';
import Photo from '../pages/Photo';
import Register from '../pages/Register';
import Preview from '../pages/preview';


import Login from '../pages/Login';
import Logout from '../components/Logon/logout';

import Form from '../pages/Form';

import RequireAuth from '../pages/Auth/Authentication';
import RequireAuthAdmin from '../pages/Auth/AuthenticationAdmin';


const routes = [{
path: '/',
component: App,
indexRoute:{component:Home},
childRoutes:[
    {path:'user', component:RequireAuth(RequireAuthAdmin(User))},
    {path: 'album/:userID(/:title)', component: Album },
    {path: 'photo/:albumID(/:title)', component:Photo  },
    {path:'Register', component:Register},
    {path:'signin',component:Login},
    {path:'Login', component:Login},
    {path:'form', component:RequireAuth(RequireAuthAdmin(Form))},
    {path:'logout',component:RequireAuth(Logout)}
    
    ],
 
}]
export default routes;