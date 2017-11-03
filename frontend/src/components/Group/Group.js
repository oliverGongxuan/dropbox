import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../../api/API';
import Message from "../Message";
import ShowMember from "./ShowMember";

class Group extends Component {
    handleShowMemberSubmit = (userdata) => {
        API.getMembers(userdata)
            .then((status) => {
                if (status === 201) {
                    this.setState({
                        showed: true,
                        message: "show member sucess..!!",
                        groupName: userdata.groupName
                    });
                    this.props.history.push("/showMember");
                } else if (status === 401) {
                    this.setState({
                        showed: false,
                        message: "show member fail..!!"
                    });
                }
            });
    };
    componentDidMount(){
        API.getMembers()
            .then((data) => {
                console.log("Members here : "+data);
                this.setState({
                    members: data
                });
            });
    }
    state = {
        username: '',
        password: '',
        members:[],
        groupName: '',
        showed: '',
        message:''
    };

    componentWillMount(){
        this.setState({
            username: '',
            members:[],
            password: '',
            groupName: '',
            showed: '',
            message:''
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <Route exact path="/group" render={() => (
                    <div>
                        <br></br>
                        <h1>Group</h1>
                        <br></br>
                        <button className="btn btn-primary" onClick={() => {
                            this.props.history.push("/createGroup");
                        }}>
                            Create Group
                        </button>
                        <br></br>
                        <br></br>
                        <button className="btn btn-primary" onClick={() => {
                            this.props.history.push("/addMember");
                        }}>
                            Add Member
                        </button>
                        <br></br>
                        <br></br>
                        <button className="btn btn-primary" onClick={() => {
                            this.props.history.push("/deleteGroup");
                        }}>
                            Delete Group
                        </button>
                        <br></br>
                        <br></br>
                        <button className="btn btn-primary" onClick={() => {
                            this.props.history.push("/deleteMember");
                        }}>
                            Delete Member
                        </button>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <div className="row justify-content-md-center">
                            <form>
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="groupName"
                                        label="groupName"
                                        placeholder="Enter Group Name"
                                        value={this.state.groupName}
                                        onChange={(event) => {
                                            this.setState({
                                                groupName: event.target.value
                                            });
                                        }}
                                    />
                                </div>
                                <div className="form-group">
                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={() => this.handleShowMemberSubmit(this.state)}>
                                        select group
                                    </button>
                                </div>
                            </form>
                        </div>
                        <button className="btn btn-primary" onClick={() => {
                            this.props.history.push("/showMember");
                        }}>
                            Show Member
                        </button>
                        <Message message={this.state.message}/>
                        <Route exact path="/showMember" render={() => (
                            <div>
                                <ShowMember members={this.state.members}/>
                            </div>
                        )}/>
                    </div>

                )}/>


            </div>
        );
    }
}

export default withRouter(Group);