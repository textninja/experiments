import { useIdentity } from '../hooks';

export function IdAndParticipantCount({ count }) {
  const id = useIdentity();
  let message = '';
  
  if (typeof count === 'number') {
    if (count === 1) {
      message = <>There is only <strong>1</strong> person here - you!</>;
    } else {
      message = <>There are <strong>{count}</strong> people here, including yourself.</>;
    }
  }

  return (
    <p>
      You're <code>{id}</code>.{" "}
      {
        message
      }
    </p>
  );
}
