import React from 'react';
import '../styles/homepage.css';

class HomePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: {
                email: {},
                password: {},
            }
        };
    }

    // Check if user is already logged
    componentWillMount() {
        if (sessionStorage.getItem('token')) {
            const token = sessionStorage.getItem('token');
            const settings = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "token": token,
                })
            }

            fetch(`https://the-room-back-end-staging.herokuapp.com/users/validatetoken`, settings)
                .then(response => response.json())
                .then(data => {
                    switch (data.code) {
                        case 200:
                            this.props.history.push("/chat")
                            break
                        case 401:
                            return
                            break
                        default:
                            return
                            break
                    }
                }).catch(e => {
                return
            });
        }
    }

    handleLoginFailed() {
        setTimeout(() => {
            $('.invalid-feedback').css('display', 'block');
            $('#btn-submit').html('<i class="fas fa-times"></i> retry please');
        }, 400);
    }

    handleLoginSuccess() {
        setTimeout(() => {
            $('.invalid-feedback').css('display', 'none');
            $('#btn-submit').html('<i class="fas fa-check"></i> logged');
        }, 400);
    }

    handleSubmit(event) {
        event.preventDefault();
        const cl = this;

        $('#btn-submit').html('<div class="loader"> </div>');

        const settings = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": event.target.email.value,
                "password": event.target.password.value,
            })
        }

        fetch(`https://the-room-back-end-staging.herokuapp.com/users/login`, settings)
            .then(response => response.json())
            .then(data => {
                switch (data.code) {
                    case 200:
                        sessionStorage.setItem('token', data.token); // Store token in local storage
                        this.handleLoginSuccess()
                        this.props.history.push("/chat") // Redirect
                        break
                    case 401:
                        cl.setState({error: data});
                        this.handleLoginFailed()
                        break
                    default:
                        this.handleLoginFailed()
                        break
                }
            }).catch(e => {
            this.handleLoginFailed()
        });
    }

    render() {
        return (
            <div className="login">
                <section className="h-100">
                    <div className="container h-100">
                        <div className="row justify-content-center h-100">
                            <div className="card-wrapper">
                                <div className="brand animated flipInX">
                                    <img src="../styles/img/logo.png" alt="logo" />
                                </div>
                                <div className="card fat animated fadeIn">
                                    <div className="card-body">
                                        <form onSubmit={event => this.handleSubmit(event)} className="my-login-validation" noValidate>
                                            <div className="form-group">
                                                <label htmlFor="email"> <i className="fas fa-envelope"></i> Email </label>
                                                <input id="email" type="email" className="form-control" name="email" required autoFocus autoComplete="off" />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="password"> <i className="fas fa-lock"></i> Password
                                                    <a href="forgot.html" className="float-right">
                                                        Forgot Password ?
                                                    </a>
                                                </label>
                                                <input id="password" type="password" className="form-control" name="password" required data-eye />
                                                <div className="invalid-feedback">
                                                    {this.state.error ? this.state.error.message : null}
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="custom-checkbox custom-control">
                                                    <input type="checkbox" name="remember" id="remember" className="custom-control-input" />
                                                    <label htmlFor="remember" className="custom-control-label">Remember me</label>
                                                </div>
                                            </div>

                                            <div className="form-group m-0">
                                                <button type="submit" className="btn btn-primary btn-block" id="btn-submit">
                                                    Login
                                                </button>
                                            </div>
                                            <div className="mt-4 text-center">
                                                Don't have an account ? <a href="register">Create one</a>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default HomePage;
