import { Modal, Tab } from "bootstrap";

const showModalById = (modalId: string): void => {
  if (!modalId) {
    return;
  }
  const modal = new Modal(document.getElementById(modalId)!);
  modal.show();
};

const hideModalById = (modalId: string): void => {
  if (!modalId) {
    return;
  }
  const modal = Modal.getInstance(document.getElementById(modalId)!);
  modal?.hide();
};

const hideModal = (modalEl: HTMLElement | null): void => {
  if (!modalEl) {
    return;
  }

  const myModal = Modal.getInstance(modalEl);
  myModal?.hide();
};

const removeModalBackdrop = (): void => {
  if (document.querySelectorAll(".modal-backdrop.fade.show").length) {
    document.querySelectorAll(".modal-backdrop.fade.show").forEach((item) => {
      item.remove();
    });
  }
};

const showTab = (tabId): void => {
  if (!tabId) {
    return;
  }
  const tab = new Tab(document.getElementById(tabId)!);
  tab.show();
};

export {
  removeModalBackdrop,
  hideModal,
  hideModalById,
  showModalById,
  showTab,
};
