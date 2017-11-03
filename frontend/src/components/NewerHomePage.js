import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';
import Login from "./Login";
import Message from "./Message";
import Welcome from "./Welcome";
import Signup from "./Signup";
import Upload from './Upload';
import Folder from "./folder";
import ListFolders from "./ListFolders";
import UserAccount from "./UserAccount";
import Sharing from "./Sharing";
import Group from "./Group/Group";
import CreateGroup from "./Group/CreateGroup";
import DeleteGroup from "./Group/DeleteGroup";
import DeleteMember from "./Group/DeleteMember";
import ShowMember from "./Group/ShowMember";
import AddMember from "./Group/AddMember";

class NewerHomePage extends Component {

    state = {
        isLoggedIn: false,
        message: '',
        username: '',
        isSignup: false,
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        folders: [],
        members:[]
    };

    handleSubmit = (userdata) => {
        API.doLogin(userdata)
            .then((status) => {
                if (status === 201) {
                    this.setState({
                        isLoggedIn: true,
                        message: "Welcome to my dropbox..!!",
                        username: userdata.username
                    });
                    this.props.history.push("/welcome");
                } else if (status === 401) {
                    this.setState({
                        isLoggedIn: false,
                        message: "Wrong username or password. Try again..!!"
                    });
                }
            });
    };

    handleSignupSubmit = (userdata) => {
        API.doSignup(userdata)
            .then((status) => {
                if (status === 201) {
                    this.setState({
                        isSignup: true,
                        message: "Sign up sucess!Welcome to dropbox..",
                        lastname: userdata.lastname,
                        firstname: userdata.firstname,
                        email: userdata.email,
                        password: userdata.password
                    });
                    this.props.history.push("/welcome");
                } else if (status === 401) {
                    this.setState({
                        isSignup: false,
                        message: "Sign up fail!!"
                    });
                }
            });
    };
    render() {
        return (
            <div className="container-fluid">
                <Route exact path="/" render={() => (
                    <div>
                        <br></br>
                        <h1>Dropbox</h1>
                        <br></br>
                        <button className="btn btn-primary" onClick={() => {
                            this.props.history.push("/login");
                        }}>
                            Login
                        </button>
                        <br></br>
                        <br></br>
                        <button className="btn btn-primary" onClick={() => {
                            this.props.history.push("/signup");
                        }}>
                            Sign up
                        </button>

                    </div>

                )}/>

                <Route exact path="/login" render={() => (
                    <div>
                        <Login handleSubmit={this.handleSubmit}/>
                        <Message message={this.state.message}/>
                    </div>
                )}/>
                <Route exact path="/signup" render={() => (
                    <div>
                        <Signup handleSubmit={this.handleSignupSubmit}/>
                        <Message message={this.state.message}/>
                    </div>
                )}/>
                <Route exact path="/welcome" render={() => (
                    <Welcome username={this.state.username}/>
                )}/>

                <Route exact path="/upload" render={() => (
                    <Upload username={this.state.username}/>
                )}/>
                <Route exact path="/folders" render={() => (
                    <div>
                        <Folder username={this.state.username}/>
                        <ListFolders folders={this.state.folders}/>
                    </div>
                )}/>
                <Route exact path="/account" render={() => (
                    <div>
                        <UserAccount />
                    </div>
                )}/>
                <Route exact path="/logout" render={() => (
                    <div>
                        {/*<UserAccount />*/}
                    </div>
                )}/>
                <Route exact path="/sharing" render={() => (
                    <div>
                        <Sharing />
                    </div>
                )}/>
                <Route exact path="/group" render={() => (
                    <div>
                        <Group />
                    </div>
                )}/>
                <Route exact path="/createGroup" render={() => (
                    <div>
                        <CreateGroup />
                    </div>
                )}/>
                <Route exact path="/deleteGroup" render={() => (
                    <div>
                        <DeleteGroup />
                    </div>
                )}/>
                <Route exact path="/deleteMember" render={() => (
                    <div>
                        <DeleteMember />
                    </div>
                )}/>
                <Route exact path="/showMember" render={() => (
                    <div>
                        <ShowMember members={this.state.members}/>
                    </div>
                )}/>
                <Route exact path="/addMember" render={() => (
                    <div>
                        <AddMember members={this.state.members}/>
                    </div>
                )}/>
            </div>
        );
    }
}

export default withRouter(NewerHomePage);