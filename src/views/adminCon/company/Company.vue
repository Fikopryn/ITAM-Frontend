<template>
  <!-- begin::Main -->
  <section id="main" class="d-flex flex-column gap-3">
    <section id="form-create" class="rounded rounded-3 p-8 bg-white">
      <el-skeleton :loading="loading" :rows="6" animated>
        <template #default>
          <el-form
            :rules="companyRules"
            :model="companyDetails"
            ref="companyFormRef"
            scroll-to-error
          >
            <div class="d-flex flex-column gap-3 w-100">
              <h5>Company</h5>

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
                        <el-input
                          size="default"
                          v-model="companyDetails.companyId"
                          placeholder="Input"
                          id="companyDetails.companyId"
                          name="companyDetails.companyId"
                          type="Input"
                        />
                      </el-form-item>
                    </div>
                  </div>

                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 my-auto required"
                      :class="isFieldEdit ? 'my-auto' : ''"
                    >
                      Company Name
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 my-auto"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="companyName">
                        <el-select
                          v-model="companyDetails.companyName"
                          id="companyDetails.companyName"
                          name="companyDetails.companyName"
                          class="w-100"
                          placeholder="Input"
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
                      Company Type
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 my-auto"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="companyType">
                        <el-select
                          v-model="companyDetails.companyType"
                          id="companyDetails.companyType"
                          name="companyDetails.companyType"
                          class="w-100"
                          placeholder="Input"
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
                      Website
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 my-auto"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="website">
                        <el-input
                          size="default"
                          v-model="companyDetails.website"
                          placeholder="Input"
                          id="companyDetails.website"
                          name="companyDetails.website"
                          type="Input"
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
                    >
                      Abbreviation
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 my-auto"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="abbreviation">
                        <el-input
                          size="default"
                          v-model="companyDetails.abbreviation"
                          placeholder="Input"
                          id="companyDetails.abbreviation"
                          name="companyDetails.abbreviation"
                          type="Input"
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
                          v-model="companyDetails.modifiedBy"
                          placeholder="Input"
                          id="companyDetails.modifiedBy"
                          name="companyDetails.modifiedBy"
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
                            v-model="companyDetails.lastModifiedDate"
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
                      Company Status
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 my-auto"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="companyStatus">
                        <el-radio-group v-model="companyDetails.companyStatus">
                          <el-radio :label="true"
                            ><div class="fs-5">Enabled</div></el-radio
                          >
                          <el-radio :label="false"
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
                    {{ companyDetails.companyId ? "Update" : "Save" }}
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
    <section id="company-list" class="rounded rounded-3 p-8 bg-white">
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
                    {{ companyPageInfo.pageInfo?.recordsFiltered }}
                    of
                    {{ companyPageInfo.pageInfo?.totalPages }} data</span
                  >
                </span>
              </span>
            </div>

            <Datatable
              :header="companyHeader"
              :data="companyList"
              :items-per-page="companyPageInfo?.length"
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
              <template v-slot:companyName="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.companyName, listOfSample) }}
                </div>
              </template>
              <template v-slot:companyType="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.companyType, listOfSample) }}
                </div>
              </template>
              <template v-slot:website="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.website, listOfSample) }}
                </div>
              </template>
              <template v-slot:abbreviation="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.abbreviation, listOfSample) }}
                </div>
              </template>
              <template v-slot:companyStatus="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.companyStatus, listOfSample) }}
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

<script src="./Company.ts" lang="ts"></script>
