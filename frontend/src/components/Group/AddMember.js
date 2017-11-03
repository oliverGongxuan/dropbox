import React, {Component} from 'react';
import * as API from '../../api/API';
import { Route, withRouter } from 'react-router-dom';
import Message from "../Message";

class AddMember extends Component {

    handleAddMemberSubmit = (userdata) => {
        API.addMember(userdata)
            .then((status) => {
                if (status === 201) {
                    this.setState({
                        showed: true,
                        message: "add member sucess..!!",
                        memberId:userdata.memberId,
                        groupName: userdata.groupName
                    });
                    this.props.history.push("/addMember");
                } else if (status === 401) {
                    this.setState({
                        showed: false,
                        message: "add member fail..!!"
                    });
                }
            });
    };

    state = {
        groupName: '',
        memberId:'',
        showed: ''
    };

    componentWillMount(){
        this.setState({
            groupName: '',
            memberId:'',
            showed: ''
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
                            <h3>Add Member</h3>
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
                            <input
                                className="form-control"
                                type="text"
                                id="memberId"
                                label="memberId"
                                placeholder="Enter member Id"
                                value={this.state.memberId}
                                onChange={(event) => {
                                    this.setState({
                                        memberId: event.target.value
                                    });
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={() => this.handleAddMemberSubmit(this.state)}>
                                Add Member
                            </button>
                        </div>
                    </form>
                    <Message message={this.state.message}/>
                </div>
            </div>
        );
    }
}

export default withRouter(AddMember);