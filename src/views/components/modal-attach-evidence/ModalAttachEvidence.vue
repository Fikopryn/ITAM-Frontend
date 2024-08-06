<template>
  <!--begin::Modal - Create App-->
  <div
    class="modal fade"
    :id="modalId"
    :ref="modalId + '_ref'"
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
          <h2>
            {{ modalTitle }}

            <span
              v-if="documentInfo.isDocumentCannotBeChanged && isFieldEditable()"
              class="badge rounded-pill bg-success my-auto"
            >
              Accepted
            </span>
          </h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            @click="onCancel()"
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
        <div class="modal-body">
          <el-skeleton :loading="loading">
            <template #template>
              <el-skeleton :rows="6" />
            </template>
            <template #default>
              <div class="d-flex flex-column gap-7">
                <!-- begin::Upload document -->
                <div class="row fs-5 fw-normal">
                  <label
                    class="col-sm-2 fs-5"
                    :class="isFieldEditable() ? 'mt-2' : ''"
                  >
                    Upload Document
                  </label>
                  <label
                    class="col-1 d-sm-block d-none text-end"
                    :class="isFieldEditable() ? 'mt-2' : ''"
                    >:</label
                  >
                  <div
                    class="col-sm-9 col-12"
                    :class="isFieldEditable() ? 'mt-0' : ''"
                  >
                    <div v-if="isFieldEditable()">
                      <el-upload
                        id="attach_evidence"
                        v-model:file-list="attachEvidence.document"
                        ref="uploadRef"
                        class="upload-regulation"
                        action="#"
                        :auto-upload="false"
                        multiple
                      >
                        <template #trigger>
                          <el-button
                            id="btn_attach_evidence"
                            size="default"
                            class="border-0 rounded fs-6"
                            style="background-color: #f0f5ff; color: #3699ff"
                            :disabled="hasAccess"
                            ><span
                              class="svg-icon svg-icon-primary svg-icon-2x my-auto"
                            >
                              <inline-svg
                                :src="getMediaPath('icons/main/ic-upload.svg')"
                              />
                            </span>
                            <span class="my-auto">
                              Click to upload</span
                            ></el-button
                          >
                        </template>

                        <template #tip>
                          <div class="el-upload__tip fs-6 text-dark">
                            File with a size less than 25 mb
                          </div>
                        </template>
                      </el-upload>
                    </div>
                    <div
                      class="d-flex flex-column gap-2"
                      :class="isFieldEditable() ? 'ms-2' : ''"
                    >
                      <div
                        v-for="(
                          element, index
                        ) in attachEvidence?.documentExisting?.filter(
                          (item) => !item.isDeleted
                        )"
                        :key="index"
                      >
                        <div class="d-flex flex-wrap justify-content-between">
                          <span
                            class="svg-icon svg-icon-primary svg-icon-2x flex-grow-1 cursor-pointer"
                            style="color: #3699ff"
                            @click="downloadDocument(element)"
                          >
                            <inline-svg
                              :src="getMediaPath('icons/main/ic-file.svg')"
                            />
                            {{ element.fileNameExtention }}
                          </span>
                          <span
                            v-if="isFieldEditable()"
                            class="cursor-pointer"
                            @click="
                              element.isDeleted = true;
                              attachEvidence.deletedDocument.push(element);
                            "
                          >
                            <el-icon
                              class="me-2"
                              style="vertical-align: middle"
                            >
                              <Close />
                            </el-icon>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end::Upload document -->
                <!-- begin::Link -->
                <div class="row fs-5 fw-normal" v-if="module != 'PR'">
                  <label
                    class="col-sm-2 fs-5"
                    :class="isFieldEditable() ? 'my-auto' : ''"
                  >
                    Link
                    <!-- <span v-if="isFieldEdit" class="text-danger">*</span> -->
                  </label>
                  <label
                    class="col-1 d-sm-block d-none text-end fs-5"
                    :class="isFieldEditable() ? 'my-auto' : ''"
                    >:</label
                  >
                  <div
                    class="col-sm-9 col-12"
                    :class="isFieldEditable() ? 'my-auto' : ''"
                  >
                    <el-form-item
                      class="mb-n1"
                      v-if="isFieldEditable()"
                      prop="attachEvidence.link"
                    >
                      <el-input
                        id="link"
                        name="link"
                        class="w-100"
                        type="text"
                        placeholder="Input"
                        v-model="attachEvidence.link"
                        clearable
                      />
                    </el-form-item>
                    <div v-else class="fs-5">
                      <a
                        :href="attachEvidence.link"
                        target="_blank"
                        class="text-break"
                      >
                        {{ attachEvidence.link }}
                      </a>
                    </div>
                  </div>
                </div>
                <!-- end::Link -->
              </div>
            </template>
          </el-skeleton>
        </div>
        <!--begin::Modal body-->

        <!-- being::Modal footer -->
        <div class="modal-footer">
          <button
            class="btn btn-lg"
            :class="isFieldEditable() ? 'btn-secondary' : 'btn-danger'"
            type="button"
            @click="onCancel()"
            data-bs-dismiss="modal"
          >
            <span class="indicator-label">
              {{ isFieldEditable() ? "Cancel " : "OK" }}
            </span>
            <span class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
          <button
            v-if="isFieldEditable()"
            class="btn btn-lg btn-danger"
            type="button"
            data-bs-dismiss="modal"
            @click="onAdd()"
          >
            <span class="indicator-label"> Add </span>
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

<script src="./ModalAttachEvidence.ts" lang="ts"></script>
