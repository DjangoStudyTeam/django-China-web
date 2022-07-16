import React, {
  MutableRefObject,
  Ref,
  createContext,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

import type { ToastProps } from 'react-bootstrap';

let key = 0;
const defaults: Partial<ToastProps> = { show: true, delay: 3000, autohide: true };

export interface ToastOption {
  header: string;
  body: string;
  toastProps: ToastProps;
}

interface ToastsHandle {
  create: (toastOption: ToastOption) => void;
}

const Toasts = forwardRef<ToastsHandle>((props, ref) => {
  const [toasts, setToasts] = useState<Array<ToastOption & { key: number }>>([]);

  useImperativeHandle(ref, () => ({
    create: (toastOption: ToastOption) => {
      const { toastProps } = toastOption;
      const mergedProps = { ...defaults, ...toastProps };

      const withKey = { ...toastOption, toastProps: mergedProps, key: key++ };
      setToasts((toastsState) => {
        const copy = [...toastsState];
        copy.push(withKey);
        return copy;
      });
    },
  }));

  return (
    <ToastContainer className="p-3" position="top-end">
      {toasts.map((toast) => {
        const { key, header, body, toastProps } = toast;
        const { onClose } = toastProps;
        delete toastProps.onClose;
        return (
          <Toast
            key={key}
            {...toastProps}
            onClose={() => {
              setToasts((toastsState) => toastsState.filter((t) => t.key !== toast.key));
              onClose?.();
            }}
          >
            <Toast.Header>
              <strong className="me-auto">{header}</strong>
            </Toast.Header>
            <Toast.Body>{body}</Toast.Body>
          </Toast>
        );
      })}
    </ToastContainer>
  );
});

export const ToastsContext = createContext<React.RefObject<ToastsHandle> | null>(null);

export const ToastsProvider = ({ children }: { children: JSX.Element }) => {
  const toastsRef = useRef<ToastsHandle>(null);
  window.toasts = toastsRef;

  return (
    <ToastsContext.Provider value={toastsRef}>
      {children}
      <Toasts ref={toastsRef}></Toasts>
    </ToastsContext.Provider>
  );
};

export default ToastsProvider;
