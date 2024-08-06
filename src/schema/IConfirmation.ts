import type { SweetAlertIcon } from "sweetalert2";

export interface IConfirmation {
  title?: string;
  desc?: string;
  iconLink?: string;
  icon?: SweetAlertIcon;
  confirmText?: string;
  cancelText?: string;

  redirectTo?: string;
}
