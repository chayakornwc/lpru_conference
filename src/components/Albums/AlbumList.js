import React, { Component } from 'react'
import Album from '../Albums'
class AlbumList extends Component {
render() {
const { data } = this.props
return (
<div>
{data && data.map(e => {
return (
<Album data={e} key={e.id} />
)
})}
</div>
)
}
}
export default AlbumList;