<template>
  <!--begin::Wrapper-->
  <div class="w-sm-500px p-10">
    <!--begin::Form-->
    <VForm
      class="form w-100"
      id="kt_login_signin_form"
      @submit="onSubmitLogin"
      :validation-schema="login"
    >
      <!--begin::Heading-->
      <div class="text-center mb-10">
        <!--begin::Title-->
        <h1 class="text-primary mb-3 fw-bold">Welcome Back</h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="text-gray-400 fw-semobold fs-4">
          Enter your user ID and password
        </div>
        <!--end::Link-->
      </div>
      <!--begin::Heading-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Label-->
        <label class="form-label fs-6 fw-bold text-dark">Username</label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          tabindex="1"
          class="form-control form-control-lg form-control-solid"
          type="text"
          name="username"
          autocomplete="off"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="username" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-10" data-kt-password-meter="true">
        <!--begin::Label-->
        <label class="form-label fw-bold text-dark fs-6 mb-0">Password</label>
        <!--end::Label-->

        <div class="position-relative mb-1">
          <!--begin::Input-->
          <Field
            tabindex="2"
            class="form-control form-control-lg form-control-solid"
            :type="vTypePassword"
            name="password"
            autocomplete="off"
          />
          <!--begin::Visibility toggle-->
          <span
            class="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
            @click="showPassword(isPassVisible)"
          >
            <i v-if="isPassVisible" class="bi bi-eye fs-2"></i>
            <i v-else class="bi bi-eye-slash fs-2"></i>
          </span>
          <!--end::Visibility toggle-->
          <!--end::Input-->
        </div>
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="password" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="text-center">
        <!--begin::Submit button-->
        <button
          tabindex="3"
          type="submit"
          ref="submitButton"
          id="kt_sign_in_submit"
          class="btn btn-lg btn-danger w-100 mb-5"
        >
          <span class="indicator-label"> Login </span>

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
  <!--end::Wrapper-->
</template>

<script lang="ts" src="./SignIn.ts"></script>
