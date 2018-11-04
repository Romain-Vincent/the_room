import React from 'react';
import '../styles/register.css';

class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            gender: false,
            conflict: {

            },
            error: {
                email: {},
                password: {},
                username: {},
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

    handleGender() {
        this.setState(prevState => ({
            gender: !prevState.gender
        }));
    }

    handleRegisterFailed() {
        setTimeout(() => {
            $('.invalid-feedback').css('display', 'block');
            $('#btn-submit').html('<i class="fas fa-times"></i> retry please');
        }, 400);
    }

    handleRegisterSuccess() {
        setTimeout(() => {
            $('.invalid-feedback').css('display', 'none');
            $('#btn-submit').html('<i class="fas fa-check"></i> account created');
        }, 400)
    }

    handleSubmit(event) {
        event.preventDefault();
        const gender = (this.state.gender) ? 'female' : 'male';
        const cl = this;

        $('#btn-submit').html('<div class="loader"> </div>');

        const settings = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "user": {
                    "username": event.target.username.value,
                    "password": event.target.password.value,
                    "email": event.target.email.value,
                    "age": event.target.age.value,
                    "gender": gender,
                }
            })
        }

        fetch(`https://the-room-back-end-staging.herokuapp.com/users/register`, settings)
            .then(response => response.json())
            .then(data => {
                switch (data.code) {
                    case 200:
                        this.handleRegisterSuccess()
                        break
                    case 400:
                        cl.setState({error: data.errors});
                        this.handleRegisterFailed()
                        break
                    case 409:
                        cl.setState({ error: {}, conflict: data })
                        this.handleRegisterFailed()
                        break
                    default:
                        this.handleRegisterFailed()
                        break
                }
            }).catch(e => {
            this.handleRegisterFailed()
        });
    }


    render() {
        return (
            <div className="register">
                <section className="h-100">
                    <div className="container h-100">
                        <div className="row justify-content-center h-100">
                            <div className="card-wrapper">
                                <div className="brand animated flipInX">
                                    <img src="../styles/img/logo.png" alt="logo"/>
                                </div>
                                <div className="card fat animated fadeIn">
                                    <div className="card-body">
                                        <form onSubmit={event => this.handleSubmit(event)} noValidate>
                                            <div className="form-group">
                                                <label htmlFor="email"> <i className="fas fa-envelope"></i> Email
                                                </label>
                                                <input id="email" type="email" className="form-control" name="email"
                                                       autoFocus autoComplete="off" required />
                                                <div className="invalid-feedback">
                                                    {this.state.error.email ? this.state.error.email.message : null}
                                                    {this.state.conflict.email ? this.state.conflict.email.message  : null}
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="password"> <i className="fas fa-lock"></i> Password
                                                </label>
                                                <input id="password" type="password" className="form-control"
                                                       name="password" required data-eye />
                                                <div className="invalid-feedback">
                                                    {this.state.error.password ? this.state.error.password.message : null}
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="username"> <i className="fas fa-user"></i> Username
                                                </label>
                                                <input id="username" type="text" className="form-control"
                                                       name="username" autoComplete="off" required />
                                                <div className="invalid-feedback">
                                                    {this.state.error.username ? this.state.error.username.message : null}
                                                    {this.state.conflict.username ? this.state.conflict.username.message  : null}
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="age"> <i className="fas fa-clock"></i> Age
                                                </label>
                                                <input id="age" type="number" className="form-control" name="age"
                                                       defaultValue="13" min="13" max="80" required />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="gender"> <i className="fas fa-transgender"></i> Gender
                                                </label>
                                                <button type="button" name="gender" className="btn btn-toggle" data-toggle="button"
                                                        aria-pressed={this.state.gender} onClick={event => this.handleGender(event)}>
                                                    <div className="handle"></div>
                                                </button>
                                            </div>

                                            <div className="form-group m-0">
                                                <button type="submit" className="btn btn-primary btn-block" id="btn-submit">
                                                    Register
                                                </button>
                                            </div>
                                            <div className="mt-4 text-center">
                                                Already have an account ? <a href="./">Login</a>
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

export default Register;
