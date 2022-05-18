import { useState } from 'react';
import { useIo } from '../hooks';
import { RoomLink, IdAndParticipantCount } from '../components';

export function Lobby() {
  const [totalParticipants, setTotalParticipants] = useState(1);
  const [rooms, setRooms] = useState([]);  
  const io = useIo(({ on, emit }) => {
    emit('participants.count.get', (l) => setTotalParticipants(l));

    emit('rooms.get', rooms => {
      setRooms(rooms);
    });

    on('rooms.updated', rooms => {
      setRooms(rooms);
    });

    on('participants.count.updated', (num) => {
      setTotalParticipants(num);
    });
  }, []);

  const createRoom = () => {
    io.emit('room.create');
  };

  return (
    <>
      <IdAndParticipantCount count={totalParticipants}/>
      <div className="chat-rooms">
        <h2 className="title"><span>Rooms</span></h2>
        <p className="controls"><a onClick={createRoom}>./mkroom</a></p>
        { rooms.length ? [...rooms].reverse().map(({id}) => <RoomLink key={id} room={id}/>) : "There aren't any rooms. You can make one if you'd like."}
      </div>
    </>
  );
}
