import bg1 from '../assets/img/banner/Bg1.png'
import bg2 from '../assets/img/banner/Bg2.png'
import bg3 from '../assets/img/banner/Bg3.png'
export default function bannerClient() {
    return (
        <div id="demo" className="carousel slide" data-bs-ride="carousel">

            
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active" style={{width:"10px" , height:"10px", borderRadius:"50%"}}></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="1" style={{width:"10px" , height:"10px", borderRadius:"50%"}}></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="2" style={{width:"10px" , height:"10px", borderRadius:"50%"}}></button>
            </div>

           
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={bg1} alt="" className="d-block" style={{width:"100%", height:"650px", objectFit:"cover"}}/>
                </div>
                <div className="carousel-item">
                    <img src={bg2} alt="" className="d-block" style={{width:"100%", height:"650px", objectFit:"cover"}}/>
                </div>
                <div className="carousel-item">
                    <img src={bg3} alt="" className="d-block" style={{width:"100%", height:"650px", objectFit:"cover"}}/>
                </div>
                
            </div>

           
            <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                <span className="carousel-control-prev-icon"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                <span className="carousel-control-next-icon"></span>
            </button>
        </div>
    )
}