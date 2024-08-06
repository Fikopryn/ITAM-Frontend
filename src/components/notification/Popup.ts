import { getMediaPath } from "@/core/helpers/assets";
import Swal from "sweetalert2";

export enum typeValue {
  success = "submitted",
  submitted = "submitted",
  deleted = "deleted",
  copied = "copied",
  logout = "logout",
}
interface params {
  type: typeValue;
  desc?: string;
}

export const popupSuccess = (params: params) => {
  let _iconLink = `${getMediaPath("icons/main/popup/submited.svg")}`;

  if (params.type.toString() == "submitted") {
    _iconLink = `${getMediaPath("icons/main/popup/submited.svg")}`;
  } else if (params.type.toString() == "deleted") {
    _iconLink = `${getMediaPath("icons/main/popup/deleted.svg")}`;
  } else if (params.type.toString() == "copied") {
    _iconLink = `${getMediaPath("icons/main/popup/copied.svg")}`;
  }

  const titleHtml = `<h3 class="m-2">Success</h3>`;
  let descHtml = `<p> Data has been ${params.type} successfully</p>`;

  if (params.type == typeValue.logout) {
    descHtml = `<p> You have been successfully logged out!</p>`;
  }

  if (params.desc) {
    descHtml = `<p> ${params.desc}</p>`;
  }
  const iconHtml = `<img width='100' src="${_iconLink}" alt="ic-alert">`;

  Swal.fire({
    title: titleHtml,
    iconHtml: iconHtml,
    html: descHtml,
    showCloseButton: true,
    heightAuto: false,
    showConfirmButton: false,
  });
};
