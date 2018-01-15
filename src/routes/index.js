import App from '../App';
import Home from '../pages/Home';
import User from '../pages/User';
import Album from '../pages/Album';
import Photo from '../pages/Photo';
import Register from '../pages/Register';
import Preview from '../pages/preview';
import Form from '../pages/Form';
const routes = [{
path: '/',
component: App,
indexRoute:{component:Home},
childRoutes:[
    {path:'user', component:User },
    { path: 'album/:userID(/:title)', component: Album },
    { path: 'photo/:albumID(/:title)', component:Photo  },
    {path:'register', component:Register},
    {path:'preview', component:Preview},
    {path:'form', component:Form}
    ],
 
}]
export default routes;