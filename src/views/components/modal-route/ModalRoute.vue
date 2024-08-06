<template>
  <!--begin::Modal - Create App-->
  <div
    class="modal fade"
    :id="modalId"
    ref="modalRoute"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
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
          <h2>{{ modalTitle }}</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
            @click="clearForm()"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->

        <!--begin::Modal body-->
        <div class="modal-body">
          <!-- begin::Field remark -->
          <div v-if="commentRequired" class="row">
            <label class="fs-5 col-form-label"> Comment </label>

            <div class="col-12">
              <el-form
                ref="routeRulesRef"
                :model="submitData"
                :rules="routeRules"
                scroll-to-error
              >
                <el-form-item class="mb-n1" prop="remarks">
                  <el-input
                    size="default"
                    class="w-100"
                    v-model="submitData.remarks"
                    placeholder="Input comment"
                    id="route_comment"
                    name="route_comment"
                    type="textarea"
                    :rows="6"
                  />
                </el-form-item>
              </el-form>
            </div>
          </div>
          <!-- end::Field remark -->
        </div>
        <!--begin::Modal body-->

        <!-- being::Modal footer -->
        <div class="modal-footer">
          <button
            class="btn btn-lg btn-secondary"
            type="button"
            @click="revise()"
          >
            <span class="indicator-label"> Revise </span>
            <span class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
          <button
            class="btn btn-lg btn-danger"
            type="button"
            @click="validate()"
          >
            <span class="indicator-label"> Validate </span>
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

<script src="./ModalRoute.ts" lang="ts" />
