import React from 'react'
import { Redirect } from 'react-router-dom';
class ProtectedRoute extends React.Component {

    render() {
        const Component = this.props.component;
        const isAuthenticated = localStorage.getItem('access_token');
        if(this.props.path.includes('login') || this.props.path.includes('signup') || this.props.path.includes('resetPassword') ||  this.props.path.includes('verification')){
            if(isAuthenticated){
                return <Redirect to={{ pathname: '/userProfile' }} />
            } else {
                return <Component />
            }
        }
        return isAuthenticated ? (
            <Component />
        ) : (
            <Redirect to={{ pathname: '/login' }} />
        );
    }
}

export default ProtectedRoute;