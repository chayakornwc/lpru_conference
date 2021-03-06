import App from '../App';
import User from '../pages/User';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Course from '../pages/Course';
import Logout from '../components/Logon/logout';
import Pastevents from '../pages/Pastevents';
import EventDetail from '../pages/EventsDetail';
import Form from '../pages/Form';
import Profile from '../pages/Profile';
import RequireAuth from '../pages/Auth/Authentication';
import RequireAuthAdmin from '../pages/Auth/AuthenticationAdmin';
import Editprofile from '../pages/Editprofile';
import Examination from '../pages/Examination';
  
const routes = [{
path: '/',
component: App,
indexRoute:{component:Profile},
childRoutes:[
    {path:'user', component:RequireAuth(RequireAuthAdmin(User)),childRoutes:[
    ]},
    {path:'/events/:id', component:EventDetail},
    {path:'Register', component:Register},
    {path:'/examination/:id', component:Examination},
    {path:'signin',component:Login},
    {path:'upcomingevents',component:Course},
    {path:'pastevents',component:Pastevents},
    {path:'profile', component:RequireAuth(Profile)},
    {path:'/profile/edit', component:RequireAuth(Editprofile)},
    {path:'Login', component:Login},
    {path:'form', component:RequireAuth(RequireAuthAdmin(Form))},
    {path:'logout',component:RequireAuth(Logout)}
    ],
 
},{
    path:'/order/:id/', 
    component:App
}]
export default routes;