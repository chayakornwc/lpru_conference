import App from '../App';
import Home from '../pages/Home';
import User from '../pages/User';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Course from '../pages/Course';
import Logout from '../components/Logon/logout';
import Pastevents from '../pages/Pastevents';
import Form from '../pages/Form';

import RequireAuth from '../pages/Auth/Authentication';
import RequireAuthAdmin from '../pages/Auth/AuthenticationAdmin';


  
const routes = [{
path: '/',
component: App,
indexRoute:{component:Home},
childRoutes:[
    {path:'user', component:RequireAuth(RequireAuthAdmin(User)),childRoutes:[
        {path:':id',component:Home}
    ]},
    {path:'Register', component:Register},
    {path:'signin',component:Login},
    {path:'upcomingevents',component:Course},
    {path:'pastevents',component:Pastevents},
    {path:'Login', component:Login},
    {path:'form', component:RequireAuth(RequireAuthAdmin(Form))},
    {path:'logout',component:RequireAuth(Logout)}
    ],
 
},{
    path:'/order/:id/', 
    component:App
}]
export default routes;