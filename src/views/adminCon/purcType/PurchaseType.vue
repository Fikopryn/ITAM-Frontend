<template>
  <!-- begin::Main -->
  <section id="main" class="d-flex flex-column gap-3">
    <section id="form-create" class="rounded rounded-3 p-8 bg-white">
      <el-skeleton :loading="loading" :rows="6" animated>
        <template #default>
          <el-form
            :rules="purchaseTypeRules"
            :model="purchaseTypeDetails"
            ref="purchaseTypeFormRef"
            scroll-to-error
          >
            <div class="d-flex flex-column gap-3 w-100">
              <h5>Purchase Type</h5>

              <div class="d-flex flex-row gap-5">
                <!-- begin::Left -->
                <div class="flex-grow-1 d-flex flex-column gap-7">
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 my-auto required"
                    >
                      Purchasing Type ID
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 my-auto"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="purchasingTypeId">
                        <el-input
                          size="default"
                          v-model="purchaseTypeDetails.purchasingTypeId"
                          placeholder="Input"
                          id="purchaseTypeDetails.purchasingTypeId"
                          name="purchaseTypeDetails.purchasingTypeId"
                          type="Input"
                          disabled
                        />
                      </el-form-item>
                    </div>
                  </div>

                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 my-auto required"
                      :class="isFieldEdit ? 'my-auto' : ''"
                    >
                      Purchasing Type Name
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 my-auto"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="purchasingTypeName">
                        <el-select
                          v-model="purchaseTypeDetails.purchasingTypeName"
                          id="purchaseTypeDetails.purchasingTypeName"
                          name="purchaseTypeDetails.purchasingTypeName"
                          class="w-100"
                          placeholder="Search"
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
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      Purchasing Type Description
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item
                        class="mb-n1"
                        prop="purchasingTypeDescription"
                      >
                        <el-input
                          size="default"
                          v-model="
                            purchaseTypeDetails.purchasingTypeDescription
                          "
                          placeholder="Input"
                          id="purchaseTypeDetails.purchasingTypeDescription"
                          name="purchaseTypeDetails.purchasingTypeDescription"
                          :rows="3"
                          type="textarea"
                          clearable
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
                          v-model="purchaseTypeDetails.modifiedBy"
                          placeholder="Input"
                          id="purchaseTypeDetails.modifiedBy"
                          name="purchaseTypeDetails.modifiedBy"
                          type="Input"
                          disabled
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
                            v-model="purchaseTypeDetails.lastModifiedDate"
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
                          v-model="purchaseTypeDetails.associationStatus"
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
                      purchaseTypeDetails.purchasingTypeId ? "Update" : "Save"
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
    <section id="purchase-type-list" class="rounded rounded-3 p-8 bg-white">
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
                    {{ purchaseTypePageInfo.pageInfo?.recordsFiltered }}
                    of
                    {{ purchaseTypePageInfo.pageInfo?.totalPages }} data</span
                  >
                </span>
              </span>
            </div>

            <Datatable
              :header="purchaseTypeHeader"
              :data="purchaseTypeList"
              :items-per-page="purchaseTypePageInfo?.length"
              :items-per-page-dropdown-enabled="true"
              :loading="loadingFilter"
              :total-info-enabled="false"
              sortingEnabled
            >
              <template v-slot:purchasingTypeId="{ row: data }">
                <div
                  class="fs-5 text-primary cursor-pointer"
                  @click="onEdit(data)"
                >
                  {{ getValueFromList(data.purchasingTypeId, listOfSample) }}
                </div>
              </template>
              <template v-slot:purchasingTypeName="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.purchasingTypeName, listOfSample) }}
                </div>
              </template>
              <template v-slot:purchasingTypeDescription="{ row: data }">
                <div class="fs-5">
                  {{
                    getValueFromList(
                      data.purchasingTypeDescription,
                      listOfSample
                    )
                  }}
                </div>
              </template>
              <template v-slot:associationStatus="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.associationStatus, listOfSample) }}
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

<script src="./PurchaseType.ts" lang="ts"></script>
