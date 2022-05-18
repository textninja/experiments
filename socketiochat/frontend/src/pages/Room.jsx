import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { IdAndParticipantCount } from '../components';
import { useIo } from '../hooks';

export function Room() {
  const { register, handleSubmit, setValue } = useForm();

  const { room } = useParams();

  const [messages, setMessages] = useState([]);

  const io = useIo(({ emit, on }) => {
    emit('room.join', room);

    emit('chat.messages.get', room, (messages) => {
      console.log(messages);
      setMessages(messages);
    });

    on('chat.messages.updated', (roomId, messages) => {
      if (roomId === room) setMessages(messages);
    });
  });

  return <>
    <IdAndParticipantCount count={null}/>
    <h2><span>{room}</span></h2>

    <form onSubmit={handleSubmit((data) => {
      io.emit('chat.message.create', {
        room: room,
        message: data.chat
      });
      setValue("chat", "");
    })}>
      {
        messages.map(message => <p key={message.id}>{message.author}: {message.message}</p>)
      }
      <input {...register("chat")} type="text" placeholder="Type your message here"/>
    </form>
  </>;
}
