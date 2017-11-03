import React, {Component} from 'react';
// import PropTypes from 'prop-types';

class UserAccount extends Component {

    // static propTypes = {
    //     handleAccountSubmit: PropTypes.func.isRequired
    // };

    state = {
        about: '',
        interest: ''
    };

    componentWillMount(){
        this.setState({
            about: '',
            interest: ''
        });
    }
    handleAccountSubmit = (userdata) => {
    };
    render() {
        return (
            <div className="row justify-content-md-center">
                <div className="col-md-3">
                    <form>
                        <div className="form-group">
                            <h2>User Account</h2>
                        </div>
                        <textarea className="form-control" rows="4" cols="50" label="about"
                                  placeholder="about"
                                  value={this.state.about}
                                  onChange={(event) => {
                                      this.setState({
                                          about: event.target.value
                                      });
                                  }}>

                        </textarea>
                        <br></br>
                        <textarea className="form-control" rows="4" cols="50" label="interests"
                                  placeholder="interests"
                                  value={this.state.interests}
                                  onChange={(event) => {
                                      this.setState({
                                          interests: event.target.value
                                      });
                                  }}>

                        </textarea>
                        <br></br>
                        <div className="form-group">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={() => this.handleAccountSubmit(this.state)}>
                                save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default UserAccount;