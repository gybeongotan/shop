import Gallery from './Gallery'
import Api from './Api'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const Shop = () => {
  let [isLoading, setLoading] = useState(true),
    [shopName, setShopName] = useState(''),
    [shopDescription, setShopDescription] = useState(''),
    [shopWallpaper, setShopWallpaper] = useState(''),
    [gallery, setGallery] = useState([])

  useEffect(() => {
    Api.get('/shop/info', { withCredentials: true }).then(({ data }) => {
      setShopName(data.name)
      setShopDescription(data.description)
      setGallery(data.img.gallery)
      setShopWallpaper(data.img.wallpaper)
      setLoading(false)
    })
  }, [])

  if (isLoading) {
    return <h1> Loading </h1>
  }
  return (
    <div className="shop">
      <header>
        <h1>{shopName}</h1>
      </header>
      <main>
        <img className="wallpaper" alt="sample" src={shopWallpaper} />
        <div className="shop-info">
          {/* <h2 className="followers-amount">1.2K Followers</h2>
          <h2 className="star-rating">*****</h2>  */}

          <p className="shop-description">{shopDescription}</p>
          <div className="nav">
            <a href="#">Orders</a>&nbsp;|&nbsp;
            <a href="#">&nbsp;Products&nbsp;</a>&nbsp;|&nbsp;
            <a href="#">Contacts</a>&nbsp;|&nbsp;
            <Link to='/editShop'>Edit Info</Link> 
          </div>
        </div>
        {gallery ? <Gallery images={gallery} /> : 'not yet'}
      </main>
    </div>
  )
}

export default Shop
