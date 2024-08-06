<template>
  <!-- begin::Button -->
  <div id="actions" class="d-flex flex-wrap flex-md-row gap-3">
    <!-- begin::Cancel -->
    <button
      v-if="isFieldEdit && enabledEdit"
      tabindex="3"
      type="button"
      ref="cancelButtonRef"
      id="cancelButtonRef"
      class="btn btn-sm btn-secondary"
      @click="onCancel()"
    >
      <span class="indicator-label fs-6">
        <inline-svg
          class="h-20px w-20px"
          :src="getMediaPath('icons/main/ic-cancel.svg')"
        />
        Cancel
      </span>

      <span class="indicator-progress">
        Please wait...
        <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
      </span>
    </button>
    <!-- edn::Cancel -->

    <!-- begin::Save -->
    <button
      v-if="isFieldEdit && enabledEdit"
      tabindex="3"
      type="button"
      ref="saveButtonRef"
      id="saveButtonRef"
      class="btn btn-sm btn-secondary"
      @click="onSave()"
    >
      <span class="indicator-label fs-6 text-primary">
        <inline-svg
          class="h-20px w-20px"
          :src="getMediaPath('icons/main/ic-save.svg')"
        />
        Save
      </span>

      <span class="indicator-progress">
        Please wait...
        <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
      </span>
    </button>
    <!-- edn::Save -->

    <!-- begin::Edit -->
    <button
      v-if="showEditButton && !isFieldEdit && enabledEdit"
      type="button"
      ref="editButtonRef"
      id="editButtonRef"
      class="btn btn-sm btn-danger"
      @click="onEdit()"
    >
      <span class="indicator-label">
        <inline-svg
          class="h-20px w-20px"
          :src="getMediaPath('icons/main/ic-edit.svg')"
        />
        {{ editText }}
      </span>

      <span class="indicator-progress">
        Please wait...
        <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
      </span>
    </button>
    <!-- edn::Edit -->

    <!-- begin::NotObtained -->
    <button
      v-if="showSubmitButton && module == 'PR' && enabledNotObtained"
      type="submit"
      ref="notObtainedButtonRef"
      id="notObtainedButtonRef"
      class="btn btn-sm btn-danger"
      @click="onNotObtained()"
    >
      <span class="indicator-label">
        <inline-svg
          class="h-20px w-20px"
          :src="getMediaPath('icons/main/ic-not-obtained.svg')"
        />
        Not Obtained
      </span>

      <span class="indicator-progress">
        Please wait...
        <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
      </span>
    </button>
    <!-- end::NotObtained -->

    <!-- begin::Submit -->
    <button
      v-if="showSubmitButton && enabledSubmit"
      type="submit"
      ref="submitButtonRef"
      id="submitButtonRef"
      class="btn btn-sm btn-danger"
      @click="onSubmit()"
    >
      <span v-if="submitText == 'Register'" class="indicator-label">
        <inline-svg
          class="h-20px w-20px"
          :src="getMediaPath('icons/main/ic-register.svg')"
        />
        {{ submitText }}
      </span>
      <span v-else class="indicator-label">
        <inline-svg
          class="h-20px w-20px"
          :src="getMediaPath('icons/main/ic-submit.svg')"
        />
        Submit
      </span>

      <span class="indicator-progress">
        Please wait...
        <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
      </span>
    </button>
    <!-- end::Submit -->

    <!-- begin::Route -->
    <button
      v-if="showRouteButton && enabledRoute"
      type="button"
      ref="route_button_ref"
      id="routeButtonRef"
      class="btn btn-sm btn-danger"
      :data-bs-toggle="'modal'"
      :data-bs-target="`#${modalId}`"
    >
      <span class="indicator-label">
        <inline-svg
          class="h-20px w-20px"
          :src="getMediaPath('icons/main/ic-approve.svg')"
        />
        Route
      </span>

      <span class="indicator-progress">
        Please wait...
        <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
      </span>
    </button>
    <!-- end::Route -->
  </div>
  <!-- end::Button -->

  <ModalRoute
    :modal-id="modalId"
    :modal-title="modalRouteTitle"
    :comment-required="modalCommentRequired"
    @submitAction="onRoute"
  />
</template>

<script src="./ActionButton.ts" lang="ts"></script>
