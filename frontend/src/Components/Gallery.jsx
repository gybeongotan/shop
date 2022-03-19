function Gallery({images}){

    return (<ul className="gallery">
        {images.map(image=>(
            <li key={image._id}><img src={image.url}  /></li>
        ))}
    </ul>)

}


export default Gallery