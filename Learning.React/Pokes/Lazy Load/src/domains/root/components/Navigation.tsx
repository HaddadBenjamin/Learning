import React, {FC, Suspense} from "react";
import Users from "../../users/components/Users";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"

const LazyTodos = React.lazy(() => import('../../todos/components/Todos'))
const LazyIngredients = React.lazy(() => import('../../ingredients/components/Ingredients'))

const Navigation : FC = () =>
     <BrowserRouter>
         <nav>
             <ul>
                 <li><Link to="/">Users</Link></li>
                 <li><Link to='/todos'>Todos</Link></li>
                 <li><Link to='/ingredients'>Ingrédients</Link></li>
             </ul>
         </nav>

        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route path="/" component={Users} exact/>
                <Route path="/todos" component={LazyTodos}/>
                <Route path="/ingredients" component={LazyIngredients}/>
            </Switch>
        </Suspense>
    </BrowserRouter>

export default Navigation