import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadPhotos } from '../actions'
import PhotoList from '../components/Photos/PhotoList';
class Photo extends Component {
componentDidMount() {
this.props.dispatch(loadPhotos(this.props.params.albumID))
}
render() {
    const { photos } = this.props
    if (photos.isRejected) {
    return <div>Not Load Photos</div>
    }
    return (
    <div>
    <h1>Photos by {this.props.params.title}</h1>
    <PhotoList data={photos.data} />
    </div>
    )
    }
    }
    function mapStateToProps(state) {
    return {
    photos: state.photos
    }
    }
    export default connect(mapStateToProps)(Photo)
