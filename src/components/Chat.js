import React from "react";
import '../styles/chat.css';

class Chat extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    handleSidebar() {
        $('#sidebar').toggleClass('active');
    }

    // Secure access to chat
    componentWillMount() {
        if (sessionStorage.getItem('token')) {
            const token = sessionStorage.getItem('token');
            const settings = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            }

            fetch(`https://the-room-back-end-staging.herokuapp.com/users/`, settings)
                .then(response => response.json())
                .then(data => {
                    switch (data.code) {
                        case 200:
                            console.log("token valid");
                            break
                        default:
                            this.props.history.push("/")
                            break
                    }
                }).catch(e => {
                this.props.history.push("/")
            });
        } else {
            this.props.history.push("/")
        }
    }

    render() {
        const ajust = { 'marginLeft': '6px' };
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-custom">
                    <ul className="navbar-nav mr-auto" style={ajust}>
                        <li className="nav-item" onClick={this.handleSidebar}>
                            <i className="fas fa-bars fa-2x"></i>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link">
                                <img src="../styles/img/avatar_male.png" alt="Avatar" className="avatar img-responsive" />
                                <span className="nickname">Utilisateur</span>
                            </a>
                        </li>
                    </ul>
                </nav>


                <div className="wrapper">
                    <nav id="sidebar">
                        <div className="sidebar-header">

                            <li className="nav-item list-unstyled active">
                                <i className="fas fa-comments fa-2x"></i>
                            </li>

                            <li className="nav-item list-unstyled">
                                <i className="fas fa-users fa-2x"></i>
                            </li>

                            <li className="nav-item list-unstyled">
                                <i className="fas fa-envelope fa-2x"></i>
                            </li>

                            <li className="nav-item list-unstyled">
                                <i className="fas fa-user fa-2x"></i>
                            </li>
                        </div>
                    </nav>

                </div>
            </div>
        );
    }
}

export default Chat;
