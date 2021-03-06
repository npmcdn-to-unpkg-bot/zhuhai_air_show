import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import  {Provider} from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router,IndexRoute, Route, Redirect,browserHistory } from 'react-router'
import rootStore from './store/rootStore'
import AuthUtil from './utils/AuthUtil'
import App from './containers/App'
import DevTools from './containers/index/DevTools'
import LoginHeaderContainer from './containers/auth/LoginHeaderContainer'
import LoginBodyContainer from './containers/auth/LoginBodyContainer'
import PasswordHearderContainer from './containers/auth/PasswordHearderContainer'
import PasswordBodyContainer from './containers/auth/PasswordBodyContainer'
import RegisterHeaderContainer from './containers/index/RegisterHeaderContainer'
import RegisterBodyContainer from './containers/index/RegisterBodyContainer'
import HeaderContainer from './containers/HeaderContainer'
import IndexBodyContainer from './containers/index/IndexBodyContainer'
import ContactBodyContainer from './containers/index/ContactBodyContainer'
import ProductBodyContainer from './containers/product/ProductBodyContainer'
import SolutionBodyContainer from './containers/product/SolutionBodyContainer'
import StudioHeaderContainer from './containers/studio/StudioHeaderContainer'
import StudioBodyContainer from './containers/studio/StudioBodyContainer'
import StudioSolutionContainer from './containers/studio/StudioSolutionContainer'
import StudioDataContainer from './containers/studio/StudioDataContainer'
import StudioHelpContainer from './containers/studio/StudioHelpContainer'
import OperateHeaderContainer from './containers/operate/OperateHeaderContainer'
import OperateBodyContainer from './containers/operate/OperateBodyContainer'
import {APP_ROOT_NAME} from './config/appConfig'

const store = rootStore()
const history = syncHistoryWithStore(browserHistory, store)

let devTool = ""
if (process.env.NODE_ENV === 'production') {
    devTool = ""
} else {
    devTool = <DevTools/>
}

function requireAuth(nextState, replace) {
    if (!AuthUtil.isLogin()) {
        replace({
            pathname: APP_ROOT_NAME + 'login',
            state: {nextPathname: nextState.location.pathname}
        })
    }
}

render((
        <Provider store={store}>
            <div>
                <Router history={history}>
                    <Redirect from={APP_ROOT_NAME} to={APP_ROOT_NAME+"studio"}/>
                    <Route path={APP_ROOT_NAME} component={App}>
                        <Route path="index" components={{headerView:HeaderContainer,bodyView:IndexBodyContainer}}
                               />
                        <Route path="contact" components={{headerView:HeaderContainer,bodyView:ContactBodyContainer}}
                               onEnter={requireAuth}/>
                        <Route path="product" components={{headerView:HeaderContainer,bodyView:ProductBodyContainer}}
                               onEnter={requireAuth}/>
                        <Route path="solution" components={{headerView:HeaderContainer,bodyView:SolutionBodyContainer}}
                               onEnter={requireAuth} />
                        <Route path="studio" components={{headerView:StudioHeaderContainer,bodyView:StudioBodyContainer}}
                               >
                            <IndexRoute components={{contentView:StudioSolutionContainer}}/>
                            <Route path="data" components={{contentView:StudioDataContainer}}/>
                            <Route path="help" components={{contentView:StudioHelpContainer}}/>
                        </Route>
                        <Route path="operate/:id"
                               components={{headerView:OperateHeaderContainer,bodyView:OperateBodyContainer}}
                               onEnter={requireAuth}/>
                        <Route path="login" components={{headerView:LoginHeaderContainer,bodyView:LoginBodyContainer}}/>
                        <Route path="register" components={{headerView:RegisterHeaderContainer,bodyView:RegisterBodyContainer}}/>
                        <Route path="forgetpassword" components={{headerView:PasswordHearderContainer,bodyView:PasswordBodyContainer}}/>
                    </Route>
                </Router>
                {devTool}
            </div>
        </Provider>
    ),
    document.getElementById('root')
)

