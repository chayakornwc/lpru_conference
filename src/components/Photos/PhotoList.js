import React from 'react';
import Photo from '../Photos';
const PhotoList = (props) => {
const { data } = props
return (
<div>
{data && data.map(e => {
return (
<Photo data={e} key={e.id} />
)
})}
</div>
)
}
export default PhotoList;