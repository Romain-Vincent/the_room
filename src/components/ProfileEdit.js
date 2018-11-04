import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/profile.css';

const ProfileEdit = () => {
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
                                <div className="profile-picture">
                                    <div className="picture"></div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="F_Name"> <i className="fas fa-envelope"></i> First Name </label>
                                    <input id="F_Name" type="text" className="form-control" name="F_Name" required autoFocus autoComplete="off" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="L_Name"> <i className="fas fa-envelope"></i> Last Name </label>
                                    <input id="L_Name" type="text" className="form-control" name="L_Name" required autoFocus autoComplete="off" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Association"> <i className="fas fa-envelope"></i> Association </label>
                                    <input id="Association" type="text" className="form-control" name="Association" required autoFocus autoComplete="off" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Description"> <i className="fas fa-envelope"></i> Description </label>
                                    <textarea id="Description" className="form-control" name="Description" required autoFocus autoComplete="off"  maxlength="2500" rows="8"/>
                                </div>
                                <div className="form-group">
                                    <input type="submit">Save</input>
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

export default ProfileEdit;
