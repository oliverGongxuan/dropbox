import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactStars from 'react-stars'
const divStyle = {

    // backgroundImage: 'url(' + imgUrl + ')',
};
const ratingChanged = (newRating) => {
    console.log(newRating)
}

class ListFolders extends Component {
    static propTypes = {
        folders: PropTypes.array.isRequired
    };

    render(){
        // const folders = this.props.folders;
        // console.log("folders:"+folders);
        return (
            <div>
                {this.props.folders.map(folder=>{
                    return <div style={divStyle} key={folder.folder}>
                        {folder.folder}
                        <ReactStars className="row justify-content-sm-center" onChange={ratingChanged} size={24} color2={'#ff9218'} />
                    </div>
                })}
            </div>
        );
    }
}


export default ListFolders;