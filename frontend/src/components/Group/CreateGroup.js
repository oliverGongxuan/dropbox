import React, {Component} from 'react';
import * as API from '../../api/API';
import { Route, withRouter } from 'react-router-dom';
import Message from "../Message";

class CreateGroup extends Component {

    handleCreateGroupSubmit = (userdata) => {
        API.createGroup(userdata)
            .then((status) => {
                if (status === 201) {
                    this.setState({
                        showed: true,
                        message: "create group sucess..!!",
                        groupName: userdata.groupName
                    });
                    this.props.history.push("/createGroup");
                } else if (status === 401) {
                    this.setState({
                        showed: false,
                        message: "create group fail..!!"
                    });
                }
            });
    };

    state = {
        groupName: '',
        showed: '',
        message:''
    };

    componentWillMount(){
        this.setState({
            groupName: '',
            showed: '',
            message:''
        });
    }

    render() {
        return (
            <div>
                <div className="row justify-content-sm-end">
                    <button className="btn btn-primary" onClick={() => {
                        this.props.history.push("/group");
                    }}>
                        Return
                    </button>
                </div>
                <div className="row justify-content-md-center">
                    <form>
                        <br/>
                        <div className="form-group">
                            <h3>Create Group</h3>
                        </div>
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
                                onClick={() => this.handleCreateGroupSubmit(this.state)}>
                                Create Group
                            </button>
                        </div>
                        <Message message={this.state.message}/>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(CreateGroup);