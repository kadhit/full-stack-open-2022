const Notification = ({ style, message }) => {
  if (message === null) {
    return null;
  }
  return (
    <div
      className='message'
      style={{ ...style, opacity: 1, animation: 'fadeInOut 3.05s ease-in-out' }}
    >
      <p>{message}</p>
    </div>
  );
};

export default Notification;
