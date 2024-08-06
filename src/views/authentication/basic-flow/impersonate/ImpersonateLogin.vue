<template>
  <!--begin::Wrapper-->
  <div
    class="d-flex flex-center flex-column flex-md-row justify-content-center mt-20"
  >
    <img
      :src="getMediaPath('illustrations/main/login-as.png')"
      alt=""
      class="mw-150 mh-300px img-fluid"
    />
    <div class="w-lg-500px p-10">
      <!--begin::Form-->
      <VForm
        class="form w-100"
        id="kt_login_signin_form"
        @submit="onSubmitLogin"
        :validation-schema="loginAs"
      >
        <!--begin::Heading-->
        <div class="text-center mb-10">
          <!--begin::Title-->
          <h1 class="text-primary mb-3 fw-bold">Login As</h1>
          <!--end::Title-->

          <!--begin::Link-->
          <div class="text-gray-400 fw-semobold fs-4">
            Administrator only. Please handle with care!
          </div>
          <!--end::Link-->
        </div>
        <!--begin::Heading-->

        <!--begin::Input group-->
        <div class="fv-row mb-10">
          <!--begin::Label-->
          <label class="form-label fs-6 fw-bold text-dark">User Id</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-lg form-control-solid bg-white"
            type="text"
            id="userId"
            name="userId"
            placeholder="Masukkan user id"
            autocomplete="off"
            value="mk.hari.prasetyo3"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="userId" />
            </div>
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Actions-->
        <div class="text-end">
          <!--begin::Submit button-->
          <button
            tabindex="3"
            type="submit"
            ref="submitButton"
            id="kt_sign_in_submit"
            class="btn btn-lg btn-danger mb-5"
          >
            <span class="indicator-label"> Login As </span>

            <span class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
          <!--end::Submit button-->
        </div>
        <!--end::Actions-->
      </VForm>
      <!--end::Form-->
    </div>
  </div>

  <!--end::Wrapper-->
</template>

<script lang="ts" src="./ImpersonateLogin.ts"></script>
