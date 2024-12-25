type Height = {
  height: number;
  toastId: number | string;
};

export type ToastTypes =
  | 'default'
  | 'error'
  | 'info'
  | 'success'
  | 'warning';

export type Position =
  | 'bottom-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'top-left'
  | 'top-right';

export type Toast = {
  id: number | string;
  type: ToastTypes;
  cancel?: { label: string; onClick?: () => void };
  delete?: boolean;
  dismissable?: boolean;
  style?: string;
  title?: string;
  action?: { label: string; onClick: (event: MouseEvent) => void };
  description?: string;
  duration?: number;
  important?: boolean;
  onAutoClose?: (toast: Toast) => void;
  onDismiss?: (toast: Toast) => void;
  position?: Position;
};
type ToastArguments = Omit<Toast, 'id' | 'type'>;

export type ToastToDismiss = {
  dismiss: boolean;
  id: number | string;
};

export type ToastOptions = { duration?: number };

let toastsCounter = $state(0);

class ToastState {
  heights = $state<Array<Height>>([]);
  toasts = $state<Array<Toast>>([]);

  addToast = (data: Toast) => {
    this.toasts.unshift(data);
  };

  create = (
    data: {
      message?: string;
      type?: ToastTypes;
    } & ToastArguments
  ) => {
    const { message, ...rest } = data;
    const id = toastsCounter++;

    const dismissable = data.dismissable === undefined ? true : data.dismissable;
    const type = data.type === undefined ? 'default' : data.type;

    const alreadyExists = this.toasts.find((toast) => toast.id === id);

    if (alreadyExists) {
      this.toasts = this.toasts.map((toast) => {
        if (toast.id !== id) {
          return { ...toast, updated: false };
        }

        return {
          ...toast,
          ...data,
          dismissable,
          id,
          title: message,
          type,
          updated: true
        };
      });
    } else {
      this.addToast({
        ...rest,
        dismissable,
        id,
        title: message,
        type
      });
    }

    return id;
  };

  dismiss = (id?: number | string) => {
    if (id === undefined) {
      this.toasts = this.toasts.map((toast) => ({ ...toast, dismiss: true }));
      return;
    }

    this.toasts = this.toasts.map((toast) => (toast.id === id ? { ...toast, dismiss: true } : toast));

    return id;
  };

  error = (message: string, data?: ToastArguments) =>
    this.create({ ...data, message, type: 'error' });

  info = (message: string, data?: ToastArguments) =>
    this.create({ ...data, message, type: 'info' });

  message = (message: string, data?: ToastArguments) =>
    this.create({ ...data, message, type: 'default' });

  remove = (id?: number | string) => {
    if (id === undefined) {
      this.toasts = [];
      return;
    }

    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    return id;
  };

  removeHeight = (id: number | string) => {
    this.heights = this.heights.filter((height) => height.toastId !== id);
  };

  reset = () => {
    this.toasts = [];
  };

  setHeight = (data: Height) => {
    const exists = this.heights.find((el) => el.toastId === data.toastId);
    if (exists === undefined) {
      this.heights = [data, ...this.heights];
      return;
    }

    this.heights = this.heights.map((el) => el.toastId === data.toastId ? data : el);
  };

  success = (message: string, data?: ToastArguments) =>
    this.create({ ...data, message, type: 'success' });

  warning = (message: string, data?: ToastArguments) =>
    this.create({ ...data, message, type: 'warning' });
};

export const toastState = new ToastState();

const toastFn = (message: string, data?: ToastArguments) => toastState.create({
  message,
  ...data
});

const _toast = toastFn;
export const toast = Object.assign(_toast, {
  dismiss: toastState.dismiss,
  error: toastState.error,
  info: toastState.info,
  message: toastState.message,
  success: toastState.success,
  warning: toastState.warning
});
