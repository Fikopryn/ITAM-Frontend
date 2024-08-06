import { getMediaPath } from "@/core/helpers/assets";
import router from "@/router/index";
import type { IConfirmation } from "@/schema/IConfirmation";
import Swal from "sweetalert2";

export const confirmationPopUp = async (confirmation: IConfirmation) => {
  const confirmationTitle = `<h2 class="fw-bold"> ${
    confirmation.title ?? "Attention"
  }</h2>`;
  const confirmationDesc = `<h4 class="fw-normal">${confirmation.desc}</h4>`;
  const confirmText = confirmation.confirmText
    ? confirmation.confirmText
    : "Save";
  const cancelText = confirmation.cancelText
    ? confirmation.cancelText
    : "Cancel";
  let status: boolean = false;

  await Swal.fire({
    title: confirmationTitle,
    html: confirmationDesc,
    imageUrl: getMediaPath(confirmation.iconLink ?? "icons/main/ic-alert.svg"),
    imageWidth: 100,
    imageHeight: 100,
    buttonsStyling: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    confirmButtonColor: "#CB2131",
    cancelButtonColor: "#F1F1F6",
    showCancelButton: true,
    heightAuto: false,
    reverseButtons: true,
    allowOutsideClick: false,
    showCloseButton: true,
    customClass: {
      confirmButton: "btn fw-semibold text-white",
      cancelButton: "btn fw-semibold text-dark",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      status = true;
    } else if (result.isDismissed) {
      status = false;
    }
    return status;
  });
  return status;
};

export const successPopUp = async (confirmation?: IConfirmation) => {
  const title = `<h2 class="fw-bold my-0"> ${
    confirmation?.title ?? "Success"
  }</h2>`;
  const desc = `<h4 class="fw-normal text-gray-500 my-0 py-1">${
    confirmation?.desc ?? "Data has been submitted successfully"
  }</h4>`;
  // setTimeout(() => {
  Swal.fire({
    title: title,
    html: desc,
    imageUrl: getMediaPath(
      confirmation?.iconLink ?? "icons/main/ic-success.svg"
    ),
    imageWidth: 100,
    imageHeight: 100,
    buttonsStyling: false,
    showConfirmButton: false,
    showCloseButton: true,
    heightAuto: true,
  });
  // }, 1000);
};

export const errorPopUp = async (confirmation?: IConfirmation) => {
  const title = `<h2 class="fw-bold my-0"> ${
    confirmation?.title ?? "Something Error"
  }</h2>`;
  const desc = `<h4 class="fw-normal text-gray-500 my-0 py-1">${
    confirmation?.desc ?? "Data has been submitted successfully"
  }</h4>`;
  Swal.fire({
    title: title,
    html: desc,
    imageUrl: getMediaPath(
      confirmation?.iconLink ?? "icons/main/ic-error-data.svg"
    ),
    imageWidth: 100,
    imageHeight: 100,
    buttonsStyling: false,
    showConfirmButton: false,
    showCloseButton: true,
    heightAuto: true,
  });
};

export const successWithConfirmationPopUp = async (
  confirmation?: IConfirmation
) => {
  const title = `<h2 class="fw-bold my-0"> ${
    confirmation?.title ?? "Success"
  }</h2>`;
  const desc = `<h4 class="fw-normal text-gray-500 my-0 py-1">${
    confirmation?.desc ?? "Data has been submitted successfully"
  }</h4>`;
  const confirmText = confirmation?.confirmText
    ? confirmation.confirmText
    : "Back to List";
  const cancelText = confirmation?.cancelText
    ? confirmation.cancelText
    : "Stay on This Page";

  Swal.fire({
    title: title,
    html: desc,
    imageUrl: getMediaPath(
      confirmation?.iconLink ?? "icons/main/ic-success.svg"
    ),
    imageWidth: 100,
    imageHeight: 100,
    buttonsStyling: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    confirmButtonColor: "#CB2131",
    cancelButtonColor: "#F1F1F6",
    showCancelButton: true,
    heightAuto: false,
    reverseButtons: true,
    allowOutsideClick: false,
    showCloseButton: true,
    customClass: {
      confirmButton: "btn fw-semibold text-white",
      cancelButton: "btn fw-semibold text-dark",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      router.push({ name: confirmation?.redirectTo ?? "dashboard" });
    }
  });
};
