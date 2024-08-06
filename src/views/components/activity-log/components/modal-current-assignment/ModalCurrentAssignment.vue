<template>
  <!--begin::Modal - Create App-->
  <div
    class="modal fade"
    id="modal_current_assignment"
    ref="modalCurrentAssignment"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    >
    <!--begin::Modal dialog-->
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollable mw-1000px"
    >
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header">
          <!--begin::Modal title-->
          <h2>Current Assignment</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->

        <!--begin::Modal body-->
        <div class="modal-body py-lg-10 px-lg-10">
          <EmptyData
            v-if="currentAssignment.length == 0"
            title="No Approval Yet"
            desc="Please do nothing."
            icon-link="illustrations/main/empty-state/img-no-data-general.svg"
          />
          <Datatable
            v-else
            :header="tableHeaderCurrentAssignment"
            :data="currentAssignment"
            enableItemsPerPageDropdown
          >
            <template v-slot:userId="{ row: data }">
              <span
                style="
                  font-weight: 400;
                  font-size: 14px;
                  line-height: 24px;
                  color: #181c32;
                "
                >{{ data.USERNAME }}</span
              >
            </template>

            <template v-slot:action>
              <div class="text-end">
                <img
                  style="cursor: not-allowed !important"
                  :src="getMediaPath('icons/main/ic-send-reminder.svg')"
                  width="30"
                  class="img-fluid my-auto"
                  alt=""
                  srcset=""
                />
              </div>
            </template>
          </Datatable>
        </div>
        <!--begin::Modal body-->

        <!-- being::Modal footer -->
        <div class="modal-footer">
          <button
            class="btn btn-lg btn-secondary"
            type="button"
            data-bs-dismiss="modal"
          >
            <span class="indicator-label"> Close </span>
            <span class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
        </div>
        <!-- end::Modal footer -->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!--end::Modal - Create App-->
</template>

<script src="./ModalCurrentAssignment.ts" lang="ts"></script>
