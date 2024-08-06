<template>
  <!--begin::Modal - Create App-->
  <div
    class="modal fade"
    id="modal_import_data"
    ref="modal_import_data_ref"
    data-bs-keyboard="false"
    data-bs-backdrop="static"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollable mw-550px"
    >
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header py-5">
          <!--begin::Modal title-->
          <h2>Import</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
            :disabled="loadingImport"
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
          <div class="d-flex flex-column gap-3">
            <div
              class="w-100 text-primary fw-semibold rounded px-4 py-4"
              style="background: #f0f5ff"
            >
              <span
                ><i
                  class="fas fa-exclamation-circle ms-2 fs-7 text-primary mx-2"
                  title="Imported data will be saved automatically"
                ></i
                >Imported data will be saved automatically.</span
              >
            </div>

            <div class="d-flex flex-wrap align-middle">
              <div class="flex-grow-1">
                <el-upload
                  v-model:file-list="uploadedFile"
                  ref="uploadTemplateRef"
                  class="upload-template"
                  accept=".xls,.xlsx"
                  :auto-upload="false"
                  :limit="1"
                >
                  <template #trigger>
                    <el-button
                      size="default"
                      class="border-0 rounded fs-6"
                      style="background-color: #f0f5ff; color: #3699ff"
                      ><span
                        class="svg-icon svg-icon-primary svg-icon-2x my-auto"
                      >
                        <inline-svg
                          :src="getMediaPath('icons/main/ic-upload.svg')"
                        />
                      </span>
                      <span class="my-auto"> Click to upload</span></el-button
                    >
                  </template>

                  <template #file="{ file: UploadFile }">
                    <span
                      class="svg-icon svg-icon-primary svg-icon-2x text-dark fs-6"
                    >
                      <inline-svg
                        :src="getMediaPath('icons/main/ic-file.svg')"
                      />
                      {{ UploadFile.name }}
                    </span>
                  </template>
                </el-upload>
                <div class="fs-7">
                  <span>File with a size less than 25 Mb</span>
                </div>
              </div>

              <div
                class="flex-grow-1 btn text-success fw-semibold rounded p-2 h-100"
                style="background: #e4f7cf"
                ref="btnDownloadRef"
                @click="downloadFileTemplate()"
              >
                <span class="indicator-label">
                  <span class="svg-icon svg-icon-2 mx-2">
                    <inline-svg
                      :src="getMediaPath('icons/main/ic_download_template.svg')"
                    />
                  </span>
                  Download Template
                </span>
                <span class="indicator-progress">
                  Downloading...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <!--begin::Modal body-->

        <!-- being::Modal footer -->
        <div class="modal-footer py-5">
          <div
            class="btn btn-danger w-100"
            ref="btnImportRef"
            @click="importFileTemplate()"
          >
            <span class="indicator-label"> Import </span>
            <span class="indicator-progress">
              Importing...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </div>
        </div>
        <!-- end::Modal footer -->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!--end::Modal - Create App-->
</template>

<script src="./ModalImportData.ts" lang="ts"></script>
