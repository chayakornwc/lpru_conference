import App from '../App';
import Home from '../pages/Home';
import User from '../pages/User';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Course from '../pages/Course';
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
    {path:'Register', component:Register},
    {path:'signin',component:Login},
    {path:'course',component:Course},
    {path:'Login', component:Login},
    {path:'form', component:RequireAuth(RequireAuthAdmin(Form))},
    {path:'logout',component:RequireAuth(Logout)}
    ],
 
}]
export default routes;