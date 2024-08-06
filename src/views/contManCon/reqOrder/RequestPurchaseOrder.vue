<template>
  <!-- begin::Main -->
  <section id="main" class="d-flex flex-column gap-3">
    <section id="form-create" class="rounded rounded-3 p-8 bg-white">
      <el-skeleton :loading="loading" :rows="6" animated>
        <template #default>
          <el-form
            :rules="requestPurchaseOrderRules"
            :model="requestPurchaseOrderDetails"
            ref="requestPurchaseOrderFormRef"
            scroll-to-error
          >
            <div class="d-flex flex-column gap-3 w-100">
              <h5>Request Purchase Order</h5>

              <div class="d-flex flex-row gap-5">
                <!-- begin::Left -->
                <div class="flex-grow-1 d-flex flex-column gap-7">
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
                      <el-form-item class="mb-n1" prop="contractNo">
                        <el-input
                          size="default"
                          v-model="requestPurchaseOrderDetails.contractNo"
                          placeholder="Input"
                          id="requestPurchaseOrderDetails.contractNo"
                          name="requestPurchaseOrderDetails.contractNo"
                          type="Input"
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 my-auto required"
                    >
                      RPO Nomor
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 my-auto"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="rpono">
                        <el-input
                          size="default"
                          v-model="requestPurchaseOrderDetails.rpono"
                          placeholder="Input "
                          id="requestPurchaseOrderDetails.rpono"
                          name="requestPurchaseOrderDetails.rpono"
                          type="Input "
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      RPO Subject
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="rpoSubject">
                        <el-input
                          size="default"
                          v-model="requestPurchaseOrderDetails.rpoSubject"
                          placeholder="Input"
                          id="requestPurchaseOrderDetails.rpoSubject"
                          name="requestPurchaseOrderDetails.rpoSubject"
                          :rows="3"
                          type="textarea"
                          clearable
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 my-auto required"
                    >
                      Additional Info
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 my-auto"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="additionalInfo">
                        <el-input
                          size="default"
                          v-model="requestPurchaseOrderDetails.additionalInfo"
                          placeholder="Input "
                          id="requestPurchaseOrderDetails.additionalInfo"
                          name="requestPurchaseOrderDetails.additionalInfo"
                          type="Input "
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 my-auto required"
                    >
                      RO Start
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
                            v-model="requestPurchaseOrderDetails.rostart"
                            type="date"
                            placeholder="Pick a Date"
                            format="DD/MM/YYYY"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end::Left -->

                <!-- begin::Right -->
                <div class="flex-grow-1 d-flex flex-column gap-7">
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 my-auto required"
                    >
                      RO End
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
                            v-model="requestPurchaseOrderDetails.roend"
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
                      Total RPO
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 my-auto"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="totalRpo">
                        <el-input
                          size="default"
                          v-model="requestPurchaseOrderDetails.totalRpo"
                          placeholder="Input IDR "
                          id="requestPurchaseOrderDetails.totalRpo"
                          name="requestPurchaseOrderDetails.totalRpo"
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
                      <div class="demo-date-picker">
                        <div class="block">
                          <div class="demonstration"></div>
                          <el-date-picker
                            v-model="
                              requestPurchaseOrderDetails.lastModifiedDate
                            "
                            type="date"
                            placeholder="Pick a Date"
                            format="DD/MM/YYYY"
                            disabled
                          />
                        </div>
                      </div>
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
                          v-model="requestPurchaseOrderDetails.modifiedBy"
                          placeholder=" "
                          id="requestPurchaseOrderDetails.modifiedBy"
                          name="requestPurchaseOrderDetails.modifiedBy"
                          type=" "
                          disabled
                        />
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
                      requestPurchaseOrderDetails.contractNo ? "Update" : "Save"
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
      id="request-purchase-order-list"
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
                    {{ requestPurchaseOrderPageInfo.pageInfo?.recordsFiltered }}
                    of
                    {{ requestPurchaseOrderPageInfo.pageInfo?.totalPages }}
                    data</span
                  >
                </span>
              </span>
            </div>

            <Datatable
              :header="requestPurchaseOrderHeader"
              :data="requestPurchaseOrderList"
              :items-per-page="requestPurchaseOrderPageInfo?.length"
              :items-per-page-dropdown-enabled="true"
              :loading="loadingFilter"
              :total-info-enabled="false"
              sortingEnabled
            >
              <template v-slot:contractNo="{ row: data }">
                <div
                  class="fs-5 text-primary cursor-pointer"
                  @click="onEdit(data)"
                >
                  {{ getValueFromList(data.contractNo, listOfSample) }}
                </div>
              </template>
              <template v-slot:rpono="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.rpono, listOfSample) }}
                </div>
              </template>
              <template v-slot:rpoSubject="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.rpoSubject, listOfSample) }}
                </div>
              </template>
              <template v-slot:additionalInfo="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.additionalInfo, listOfSample) }}
                </div>
              </template>
              <template v-slot:rostart="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.rostart, listOfSample) }}
                </div>
              </template>
              <template v-slot:roend="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.roend, listOfSample) }}
                </div>
              </template>
              <template v-slot:totalRpo="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.totalRpo, listOfSample) }}
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
            </Datatable>
          </div>
        </template>
      </el-skeleton>
    </section>
  </section>
  <!-- end::Main -->
</template>

<script src="./RequestPurchaseOrder.ts" lang="ts"></script>
