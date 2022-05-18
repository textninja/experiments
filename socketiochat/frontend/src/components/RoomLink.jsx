import { Link } from 'react-router-dom';

export function RoomLink({ room }) {
  return (
    <div><Link to={`/room/${room}`}>{room}</Link></div>
  )
}
