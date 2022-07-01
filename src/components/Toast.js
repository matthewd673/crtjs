import './Toast.css';
import { useState } from 'react';
import { DialogButton, DialogButtonContainer } from './DialogButton';

const Toast = (props) => {

  const [show, setShow] = useState(true);

  const onClick = () => {
    props.toast.onClick();
    setShow(false);
  }

  const close = () => setShow(false);

  if (show) {
  return (
    <div className="toast">
      <p className="title">{props.toast.title}</p>
      <p className="text">{props.toast.text}</p>
      <DialogButtonContainer>
        <DialogButton text={props.toast.cancelText} onClick={close} />
        <DialogButton text={props.toast.actionText} buttonStyle="primary" onClick={onClick} />
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