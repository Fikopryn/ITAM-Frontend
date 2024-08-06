<template>
  <!-- begin::Main -->
  <section id="main" class="d-flex flex-column gap-3">
    <section id="form-create" class="rounded rounded-3 p-8 bg-white">
      <el-skeleton :loading="loading" :rows="6" animated>
        <template #default>
          <el-form
            :rules="contractRegistrationRules"
            :model="contractRegistrationDetails"
            ref="contractRegistrationFormref"
            scroll-to-error
          >
            <div class="d-flex flex-column gap-3 w-100">
              <h5>Contract Registration Console</h5>

              <div class="d-flex flex-row gap-5">
                <!-- begin::Left -->
                <div class="flex-grow-1 d-flex flex-column gap-7">
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 my-auto required"
                    >
                      Company ID
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 my-auto"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="companyId">
                        <el-select
                          v-model="contractRegistrationDetails.companyId"
                          id="contractRegistrationDetails.companyId"
                          name="contractRegistrationDetails.companyId"
                          class="w-100"
                          placeholder="Search "
                          clearable
                          filterable
                          allow-create
                        >
                          <el-option
                            v-for="(lov, index) in listOfSample1"
                            :key="index"
                            :label="lov.lovValue"
                            :value="lov.lovKey"
                          />
                        </el-select>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 my-auto required"
                    >
                      Contract Owner
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 my-auto"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="contractOwner">
                        <el-select
                          v-model="contractRegistrationDetails.contractOwner"
                          id="contractRegistrationDetails.contractOwner"
                          name="contractRegistrationDetails.contractOwner"
                          class="w-100"
                          placeholder="Search "
                          clearable
                          filterable
                          allow-create
                        >
                          <el-option
                            v-for="(lov, index) in listOfSample"
                            :key="index"
                            :label="lov.lovValue"
                            :value="lov.lovKey"
                          />
                        </el-select>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 my-auto required"
                    >
                      Contract Nomor
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 my-auto"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="contractNomor">
                        <el-input
                          size="default"
                          v-model="contractRegistrationDetails.contractNomor"
                          placeholder="Input "
                          id="contractRegistrationDetails.contractNomor"
                          name="contractRegistrationDetails.contractNomor"
                          type="Input "
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 my-auto required"
                    >
                      Subject
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 my-auto"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="subject">
                        <el-input
                          size="default"
                          v-model="contractRegistrationDetails.subject"
                          placeholder="Input "
                          id="contractRegistrationDetails.subject"
                          name="contractRegistrationDetails.subject"
                          type="Input "
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 my-auto required"
                    >
                      Supplier ID
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 my-auto"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="supplierId">
                        <el-select
                          v-model="contractRegistrationDetails.supplierId"
                          id="contractRegistrationDetails.supplierId"
                          name="contractRegistrationDetails.supplierId"
                          class="w-100"
                          placeholder="Search "
                          clearable
                          filterable
                          allow-create
                        >
                          <el-option
                            v-for="(lov, index) in listOfSample2"
                            :key="index"
                            :label="lov.lovValue"
                            :value="lov.lovKey"
                          />
                        </el-select>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 my-auto required"
                    >
                      Start Contract
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 my-auto"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <div class="demo-date-picker">
                        <div class="block">
                          <div class="demonstration"></div>
                          <el-date-picker
                            v-model="contractRegistrationDetails.startContract"
                            type="date"
                            placeholder="Pick a Date"
                            format="DD/MM/YYYY"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 my-auto required"
                    >
                      End Contract
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 my-auto"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <div class="demo-date-picker">
                        <div class="block">
                          <div class="demonstration"></div>
                          <el-date-picker
                            v-model="contractRegistrationDetails.endContract"
                            type="date"
                            placeholder="Pick a Date"
                            format="DD/MM/YYYY"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 my-auto required"
                    >
                      Contract Value (IDR)
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 my-auto"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="contractValue">
                        <el-input
                          size="default"
                          v-model="contractRegistrationDetails.contractValue"
                          placeholder="Input IDR "
                          id="contractRegistrationDetails.contractValue"
                          name="contractRegistrationDetails.contractValue"
                          type="Input IDR"
                          :formatter="
                            (value) =>
                              `IDR ${value}`.replace(
                                /\B(?=(\d{3})+(?!\d))/g,
                                ','
                              )
                          "
                          :parser="
                            (value) => value.replace(/\IDR\s?|(,*)/g, '')
                          "
                        />
                      </el-form-item>
                    </div>
                  </div>
                </div>
                <!-- end::Left -->

                <!-- begin::Right -->
                <div class="flex-grow-1 d-flex flex-column gap-7">
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 my-auto required"
                      :class="isFieldEdit ? 'my-auto' : ''"
                    >
                      Contract Document
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 my-auto"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-upload
                        class="upload"
                        drag
                        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                        multiple
                        :auto-upload="false"
                      >
                        <el-icon class="el-icon--upload"
                          ><upload-filled
                        /></el-icon>
                        <div class="el-upload__text">
                          Drop file here or <em>click to upload</em>
                        </div>
                        <template #tip>
                          <div class="el-upload__tip">
                            pdf/word files with a size less than 2MB
                          </div>
                        </template>
                      </el-upload>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 my-auto"
                    >
                      Last Modified Date
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 my-auto"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="lastModifiedDate">
                        <el-input
                          size="default"
                          v-model="contractRegistrationDetails.lastModifiedDate"
                          placeholder="Search "
                          id="contractRegistrationDetails.lastModifiedDate"
                          name="contractRegistrationDetails.lastModifiedDate"
                          type=" "
                          disabled
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 my-auto"
                    >
                      Modified by
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 my-auto"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="modifiedBy">
                        <el-input
                          size="default"
                          v-model="contractRegistrationDetails.modifiedBy"
                          placeholder="Search "
                          id="contractRegistrationDetails.modifiedBy"
                          name="contractRegistrationDetails.modifiedBy"
                          type=" "
                          disabled
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 my-auto required"
                    >
                      Association Status
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 my-auto"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="associationStatus">
                        <el-radio-group
                          v-model="
                            contractRegistrationDetails.associationStatus
                          "
                        >
                          <el-radio label="1"
                            ><div class="fs-5">Enabled</div></el-radio
                          >
                          <el-radio label="0"
                            ><div class="fs-5">Disabled</div></el-radio
                          >
                        </el-radio-group>
                      </el-form-item>
                    </div>
                  </div>
                </div>
                <!-- end::Right -->
              </div>

              <!-- begin::Action -->
              <div
                id="actions"
                class="d-flex flex-wrap flex-md-row gap-3 h-100 mt-5"
              >
                <button
                  tabindex="3"
                  type="button"
                  ref="cancelButtonRef"
                  id="cancelButtonRef"
                  class="btn btn-sm btn-secondary"
                  @click="onSearch()"
                >
                  <span class="indicator-label fs-6"> Search </span>

                  <span class="indicator-progress">
                    Please wait...
                    <span
                      class="spinner-border spinner-border-sm align-middle ms-2"
                    ></span>
                  </span>
                </button>

                <button
                  tabindex="3"
                  type="button"
                  ref="saveButtonRef"
                  id="saveButtonRef"
                  class="btn btn-sm btn-secondary"
                  @click="onSave()"
                >
                  <span class="indicator-label fs-6">
                    {{
                      contractRegistrationDetails.contractDocument
                        ? "Update"
                        : "Save"
                    }}
                  </span>

                  <span class="indicator-progress">
                    Please wait...
                    <span
                      class="spinner-border spinner-border-sm align-middle ms-2"
                    ></span>
                  </span>
                </button>

                <button
                  type="button"
                  ref="editButtonRef"
                  id="editButtonRef"
                  class="btn btn-sm btn-primary"
                  @click="onClear()"
                >
                  <span class="indicator-label"> Clear </span>

                  <span class="indicator-progress">
                    Please wait...
                    <span
                      class="spinner-border spinner-border-sm align-middle ms-2"
                    ></span>
                  </span>
                </button>
              </div>
              <!-- end::Action -->
            </div>
          </el-form>
        </template>
      </el-skeleton>
    </section>
    <section
      id="contract-registration-list"
      class="rounded rounded-3 p-8 bg-white"
    >
      <el-skeleton :loading="loading" :rows="10" animated>
        <template #default>
          <div class="d-flex flex-column">
            <div
              class="d-flex flex-md-row flex-column justify-content-between mb-3"
            >
              <span class="my-1">
                <h4 class="my-auto">List</h4>

                <span>
                  <span class="h6 fw-normal text-muted">Show</span>
                  <span class="h6 fw-normal text-primary ms-1">
                    {{ contractRegistrationPageInfo.pageInfo?.recordsFiltered }}
                    of
                    {{ contractRegistrationPageInfo.pageInfo?.totalPages }}
                    data</span
                  >
                </span>
              </span>
            </div>

            <Datatable
              :header="contractRegistrationHeader"
              :data="contractRegistrationList"
              :items-per-page="contractRegistrationPageInfo?.length"
              :items-per-page-dropdown-enabled="true"
              :loading="loadingFilter"
              :total-info-enabled="false"
              sortingEnabled
            >
              <template v-slot:companyId="{ row: data }">
                <div
                  class="fs-5 text-primary cursor-pointer"
                  @click="onEdit(data)"
                >
                  {{ getValueFromList(data.companyId, listOfSample) }}
                </div>
              </template>
              <template v-slot:contractOwner="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.contractOwner, listOfSample) }}
                </div>
              </template>
              <template v-slot:contractNomor="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.contractNomor, listOfSample) }}
                </div>
              </template>
              <template v-slot:subject="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.subject, listOfSample) }}
                </div>
              </template>
              <template v-slot:supplierId="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.supplierId, listOfSample) }}
                </div>
              </template>
              <template v-slot:startContract="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.startContract, listOfSample) }}
                </div>
              </template>
              <template v-slot:endContract="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.endContract, listOfSample) }}
                </div>
              </template>
              <template v-slot:contractValue="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.contractValue, listOfSample) }}
                </div>
              </template>
              <template v-slot:contractDocument="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.contractDocument, listOfSample) }}
                </div>
              </template>
              <template v-slot:lastModifiedDate="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.lastModifiedDate, listOfSample) }}
                </div>
              </template>
              <template v-slot:modifiedBy="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.modifiedBy, listOfSample) }}
                </div>
              </template>
              <template v-slot:associationStatus="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.associationStatus, listOfSample) }}
                </div>
              </template>
            </Datatable>
          </div>
        </template>
      </el-skeleton>
    </section>
  </section>
  <!-- end::Main -->
</template>

<script src="./ContractRegistration.ts" lang="ts"></script>
