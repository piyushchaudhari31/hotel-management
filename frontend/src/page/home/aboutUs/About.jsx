import { ArrowDownOutlined } from '@ant-design/icons'
import './about.scss'
import { Button } from 'antd'

const Aboutus = () => {
    return (
        <div className='AboutUs'>
            <section className='section1'>
                <div className="title">
                    <p className="smallTitle">ABOUT US</p>
                    <h1 className="mainTitle">Realnet Story</h1>
                    <p><ArrowDownOutlined /></p>
                </div>

            </section>

            <section className='section2'>
                <img src="https://media.istockphoto.com/id/1990444472/photo/scandinavian-style-cozy-living-room-interior.jpg?s=612x612&w=0&k=20&c=qgzrs_4vKDrOVo6gVc0EVb9-PziE-REbV9DcM5ZAfig=" alt="" />
                <div>
                    <h3>REal HOTEL</h3>
                    <h1>Luxury hotel in the heart of the city</h1>
                    <p>Lairta Luxury Hotel,situated in the heart of the city, blends modeern luxury with timeless elegance. Offering over 500 spacious, it's perfect for both business and leisure travelers. Enjoy premium facilities, including a apa,fitness center, and fine dinning. Our friendly, attentive staff provides personalized service, ensuring every stay is seamless and unforgettable. with stunning city views and an inviting atmosphere, realnet luxury hotel offers the ideal escape for relaxtion and indulgence,delivering an exceptional hospitality experience in every detail</p>
                    <div>
                        <Button className='rooms'>Rooms & Suites</Button>
                        <Button className='talkBtn'>Let's talk now</Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Aboutus