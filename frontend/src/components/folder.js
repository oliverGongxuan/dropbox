import * as API from '../api/API';
import React, {Component} from 'react';
import ListFolders from './ListFolders';
import ejs from 'ejs';
import { Route, withRouter } from 'react-router-dom';
import Sharing from './Sharing';
class Folder extends Component{
    state = {
        showed: false,
        message: '',
        username: '',
        foldername: '',
        folders: []
    };
    componentDidMount(){
        document.title = `Welcome, ${this.state.username} !!`;
        API.getFolders()
            .then((data) => {
                console.log("folders !!!: "+data);
                this.setState({
                    folders: data
                });
            });
    }
    loadDirPage=(req,res)=>
    {
        ejs.renderFile('doc/',function(err, result) {
            if (!err) {
                res.end(result);
            }
            else {
                res.end('An error occurred');
                console.log(err);
            }
        });

        //res.render("ListDir");
    }
    handleCreateFolderClick = (userdata) => {
        API.creatFolder(userdata)
            .then((status) => {
                if (status === 201) {
                    this.setState({
                        showed: true,
                        message: "create folder1 folder..!!",
                        username: userdata.username,
                        foldername : userdata.foldername
                    });
                    // this.props.history.push("/welcome");
                } else if (status === 401) {
                    this.setState({
                        create: false,
                        message: "create folder fail!!"
                    });
                }
            });
    };


    handleListDirSubmmit = ()=>{
        API.listdir()
            .then((status) => {
                if (status === 201) {
                    this.setState({
                        message: "list sucess!Welcome to dropbox..",
                    });
                    // this.props.history.push("/welcome");
                } else if (status === 401) {
                    this.setState({
                        message: "list fail!!"
                    });
                }
            });
    };
    render() {
        return (
            <div >
                <form>
                    <br></br>
                    <h1>Dropbox</h1>
                    <br></br>
                    <input
                        className="form-control"
                        type="text"
                        label="foldername"
                        placeholder="create a folder"
                        value={this.state.foldername}
                        onChange={(event) => {
                            this.setState({
                                foldername : event.target.value
                            });
                        }}
                    />
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={this.handleCreateFolderClick(this.state)}>Create a Folder
                    </button>

                </form>
                <br/>
                <button className="btn btn-primary" onClick={() => {
                    this.props.history.push("/sharing");
                }}>
                    Sharing
                </button>
                <br/>
                <br/>


                <Route exact path="/folders" render={() => (
                    <div>

                        <h3>My files</h3>
                        <br></br>
                        <ListFolders folders={this.state.folders}/>
                    </div>

                )}/>

            </div>

        );
    }
}
export default withRouter(Folder);