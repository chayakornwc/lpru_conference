import React from 'react'
const Photo = (props) => {
const { data } = props
return (
<div>
<article className="media">
<figure className="media-left">
<p className="image is-128x128">
<img src={data.thumbnailUrl} alt={data.title}/>
</p>
</figure>
<div className="media-content">
<div className="content">
{data.title}
</div>
</div>
</article>
</div>
)
}
export default Photo