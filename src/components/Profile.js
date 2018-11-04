import React from 'react';
import '../styles/profile.css';

const Profile = () => {
    return (
        <div className="my-login-page">
        <section className="h-100">
            <div className="container h-100">
                <div className="row justify-content-center h-100">
                    <div className="card-wrapper">
                        <div className="brand animated flipInX">
                            <img src="../styles/img/logo.png" alt="logo" />
                        </div>
                        <div className="card fat animated fadeIn">
                            <div className="card-body">
                                <div className="edit">
                                    <a href="profile-edit">
                                        <div className="edit-button">
                                        </div>
                                    </a>
                                </div>
                                <div className="profile-picture">
                                    <div className="picture"></div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="F_Name"> <i className="fas fa-envelope"></i> First Name </label>
                                    <input id="F_Name" type="text" className="form-control" name="F_Name" autoFocus autoComplete="off" disabled/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="L_Name"> <i className="fas fa-envelope"></i> Last Name </label>
                                    <input id="L_Name" type="text" className="form-control" name="L_Name" autoFocus autoComplete="off" disabled/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Association"> <i className="fas fa-envelope"></i> Association </label>
                                    <input id="Association" type="text" className="form-control" name="Association" autoFocus autoComplete="off" disabled/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Description"> <i className="fas fa-envelope"></i> Description </label>
                                    <textarea id="Description" className="form-control" name="Description" autoFocus autoComplete="off"  maxlength="2500" rows="8" disabled/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
);
};

export default Profile;
