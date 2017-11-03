import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as API from '../api/API';
import {withRouter } from 'react-router-dom';

class Sharing extends Component {
    handleSharingClick = (userdata) => {
        API.sharing(userdata)
            .then((status) => {
                if (status === 201) {
                    this.setState({
                        is_sent:true,
                        message: "sharing folder sucess..!!",
                        fromUser: userdata.fromUser,
                        fromPassword : userdata.fromPassword,
                        toUser: userdata.toUser,
                        shareFile: userdata.shareFile
                    });
                    // this.props.history.push("/welcome");
                } else if (status === 401) {
                    this.setState({
                        is_sent:false,
                        message: "share folder fail!!"
                    });
                }
            });
    };
    state = {
        fromUser: '',
        fromPassword: '',
        toUser: '',
        shareFile: '',
        is_sent: false,
        message: ''
    };
    componentWillMount(){
        this.setState({
            fromUser: '',
            fromPassword: '',
            toUser: '',
            shareFile: '',
            is_sent:false,
            message: ''
        });
    }
    render() {
        return (
            <div className="row justify-content-md-center">
                <div className="col-md-3">
                    <form>
                        <div className="form-group">
                            <h1>Sharing</h1>
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                id="fromUser"
                                label="fromUser"
                                placeholder="Your Gemail address"
                                value={this.state.fromUser}
                                onChange={(event) => {
                                    this.setState({
                                        fromUser: event.target.value
                                    });
                                }}
                            /><br></br>
                            <input
                                className="form-control"
                                type="password"
                                id="fromPassword"
                                label="fromPassword"
                                placeholder="Your Gemail password"
                                value={this.state.fromPassword}
                                onChange={(event) => {
                                    this.setState({
                                        fromPassword: event.target.value
                                    });
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                id="toUser"
                                label="toUser"
                                placeholder="To Email address"
                                value={this.state.toUser}
                                onChange={(event) => {
                                    this.setState({
                                        toUser: event.target.value
                                    });
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                id="shareFile"
                                label="shareFile"
                                placeholder="eg ./doc/folder1"
                                value={this.state.shareFile}
                                onChange={(event) => {
                                    this.setState({
                                        shareFile: event.target.value
                                    });
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={() => this.handleSharingClick(this.state)}>
                                Submit
                            </button>
                        </div>
                    </form>
                    <div>
                        <button className="btn btn-primary" onClick={() => {
                            this.props.history.push("/folders");
                        }}>
                            Return
                        </button>
                    </div>
                    <br></br>
                    <div className="alert alert-warning" role="alert">
                        {this.state.message}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Sharing);