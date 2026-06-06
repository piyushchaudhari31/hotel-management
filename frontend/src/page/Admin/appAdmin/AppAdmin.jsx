import './appAdmin.scss'
import { Input } from 'antd';
const { TextArea } = Input

const AppAdmin = () => {
  return (
    <div className="room-Detail">
      <h1>Create Room</h1>
      <p>Dashbord • ROOM • LIST</p>
      <div className="createRoom">
        <div className="create-room-info">
          <h3>Details Room</h3>
          <p>Title, short description, image</p>
          <hr />

          <Input placeholder="Basic usage" className='roomName' />
          <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />


        </div>

        <div className='room-detail'>
          <h3>Details Room</h3>
          <p>Title, short description, image</p>
          <hr />

          <Input placeholder="Basic usage" className='roomName' />
          <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />



        </div>

      </div>

    </div>
  )
}

export default AppAdmin