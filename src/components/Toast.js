import './Toast.css';
import { useState } from 'react';
import { DialogButton, DialogButtonContainer } from './DialogButton';

const Toast = (props) => {

  const [show, setShow] = useState(true);

  const onClick = () => {
    props.toast.onClick();
    setShow(false);
  }

  if (show) {
  return (
    <div className="toast">
      <p className="title">{props.toast.title}</p>
      <p className="text">{props.toast.text}</p>
      <DialogButtonContainer>
        <DialogButton text="Load" buttonStyle="primary" onClick={onClick}></DialogButton>
      </DialogButtonContainer>
    </div>
  );
  } else return (<></>);
}

const ToastView = (props) => {
  return (
    <div className="toast-view">
      {
        props.toasts.map((t, i) => 
          <Toast key={i} toast={t} />
        )
      }
    </div>
  )
}

export { Toast, ToastView }