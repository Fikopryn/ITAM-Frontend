<template>
  <div
    class="d-flex flex-wrap flex-md-row align-items-center justify-content-end gap-2"
  >
    <!-- begin::Obsolete -->
    <div class="fs-6 my-auto" v-if="showBtnObsolete">
      Show Obsolete
      <el-switch
        :disabled="disabledBtnObsolete"
        :model-value="obsolete"
        size="default"
        style="--el-switch-off-color: #ccc"
        class="ms-1"
        @click="showObsolete(obsolete)"
      />
    </div>
    <!-- end::Obsolete -->

    <!-- begin::Filter -->
    <div
      v-if="showBtnFilter"
      class="btn btn-light text-primary fs-6 rounded px-3 py-2"
      :class="{ disabled: disabledBtnFilter }"
      @click="!disabledBtnFilter ? showFilter(filter) : ''"
    >
      <span class="svg-icon svg-icon-primary svg-icon-2x">
        <img :src="getMediaPath('icons/main/ic_filter.svg')" alt="" />
      </span>
      Filter
    </div>
    <!-- end::Filter -->

    <!-- begin::Export -->
    <div
      v-if="showBtnExport"
      class="btn btn-light text-primary fs-6 rounded px-3 py-2"
      :class="{ disabled: disabledBtnExport }"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      ref="exportToRef"
    >
      <span class="indicator-label">
        <span class="svg-icon svg-icon-primary svg-icon-2x">
          <inline-svg :src="getMediaPath('icons/main/ic_export.svg')" />
        </span>
        Export
      </span>
      <span class="indicator-progress">
        Downloading...
        <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
      </span>
    </div>
    <div id="export-to" class="dropdown-menu">
      <div class="d-flex flex-column p-5 gap-4" style="color: #181c32">
        <div class="d-flex flex-row align-items-center">
          <div class="fs-6">PDF</div>
          <span
            class="svg-icon svg-icon-1 ms-auto cursor-pointer"
            @click="exportTo('pdf')"
          >
            <inline-svg :src="getMediaPath('icons/main/ic_download.svg')" />
          </span>
        </div>

        <div class="d-flex flex-row align-items-center">
          <div class="fs-6">Spreadsheet</div>
          <span
            class="svg-icon svg-icon-1 ms-auto cursor-pointer"
            @click="exportTo('xlsx')"
          >
            <inline-svg :src="getMediaPath('icons/main/ic_download.svg')" />
          </span>
        </div>

        <div
          class="btn btn-sm btn-danger"
          id="btn_download_all"
          @click="exportTo('all')"
        >
          Download All
        </div>
      </div>
    </div>
    <!-- end::Export -->

    <!-- begin::Import -->
    <div
      v-if="showBtnImport"
      class="btn btn-light text-primary fs-6 rounded px-3 py-2 h-100"
      :class="{ disabled: disabledBtnImport }"
      @click="!disabledBtnImport ? onImport() : ''"
    >
      <span class="svg-icon svg-icon-primary svg-icon-2x">
        <inline-svg :src="getMediaPath('icons/main/ic-download.svg')" />
      </span>
      Import
    </div>
    <!-- end::Import -->

    <router-link
      v-if="showBtnCreate"
      class="btn btn-sm btn-danger fs-6"
      :class="disabledBtnCreate ? 'disabled' : ''"
      :to="{
        name: redirectTo,
      }"
    >
      <i class="bi bi-plus-lg"></i>
      Create
    </router-link>
  </div>
</template>

<script src="./ActionToolbar.ts" lang="ts"></script>

<style lang="scss" scoped>
#export-to {
  top: 12px !important;
  min-width: 256px;
}
</style>
