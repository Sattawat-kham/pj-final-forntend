import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import routes from '../routes'

const loading = (
    <div className="sk-cube-grid">
        <div className="sk-cube sk-cube1" />
        <div className="sk-cube sk-cube2" />
        <div className="sk-cube sk-cube3" />
        <div className="sk-cube sk-cube4" />
        <div className="sk-cube sk-cube5" />
        <div className="sk-cube sk-cube6" />
        <div className="sk-cube sk-cube7" />
        <div className="sk-cube sk-cube8" />
        <div className="sk-cube sk-cube9" />
    </div>

)

function Main() {
    return (
        <Suspense fallback={loading}>
            <Switch>
                {routes.map((route, idx) => {
                    return route.component && (
                        <Route
                            key={idx}
                            path={route.path}
                            exact={route.exact}
                            name={route.name}
                            render={props => (
                                <div className="container-fluid">
                                    <route.component {...props} />
                                </div>

                            )} />
                    )
                })}
                <Redirect from="/" to="/dashboard" />
            </Switch>
        </Suspense>
    )
}

export default Main
