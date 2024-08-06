<template>
  <!-- begin::Main -->
  <section id="main" class="d-flex flex-column gap-3">
    <section id="form-create" class="rounded rounded-3 p-8 bg-white">
      <el-skeleton :loading="loading" :rows="6" animated>
        <template #default>
          <el-form
            :rules="productCatalogRules"
            :model="productCatalog1Details"
            ref="productCatalogFormRef"
            scroll-to-error
          >
            <div class="d-flex flex-column gap-3 w-100">
              <h5>Product Catalog</h5>

              <div class="d-flex flex-row gap-5">
                <!-- begin::Left -->
                <div class="flex-grow-1 d-flex flex-column gap-7">
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 my-auto required"
                    >
                      Company
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 my-auto"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="companyId">
                        <el-input
                          v-model="productCatalog1Details.companyId"
                          id="productCatalog1Details.companyId"
                          name="productCatalog1Details.companyId"
                          class="w-100"
                          placeholder="Search"
                          clearable
                        />
                      </el-form-item>
                    </div>
                  </div>

                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 my-auto required"
                      :class="isFieldEdit ? 'my-auto' : ''"
                    >
                      Product Category Tier 1
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 my-auto"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="prodCatTier1,">
                        <el-select
                          v-model="productCatalog1Details.prodCatTier1"
                          id="productCatalog1Details.prodCatTier1"
                          name="productCatalog1Details.prodCatTier1"
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
                            :value="lov.lovValue"
                          />
                        </el-select>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 my-auto required"
                    >
                      Product Category Tier 2
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 my-auto"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="prodCatTier2">
                        <el-select
                          v-model="productCatalog1Details.prodCatTier2"
                          id="productCatalog1Details.prodCatTier2"
                          name="productCatalog1Details.prodCatTier2"
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
                            :value="lov.lovValue"
                          />
                        </el-select>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 my-auto required"
                    >
                      Product Category Tier 3
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 my-auto"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="prodCatTier3">
                        <el-select
                          v-model="productCatalog1Details.prodCatTier3"
                          id="productCatalog1Details.prodCatTier3"
                          name="productCatalog1Details.prodCatTier3"
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
                            :value="lov.lovValue"
                          />
                        </el-select>
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
                          v-model="productCatalog1Details.modifiedBy"
                          placeholder="Input"
                          id="productCatalog1Details.modifiedBy"
                          name="productCatalog1Details.modifiedBy"
                          type="input"
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
                            v-model="productCatalog1Details.lastModifiedDate"
                            type="date"
                            placeholder="Pick a Date"
                            format="DD/MM/YYYY"
                            disabled
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
                      Product Name
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 my-auto"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="productName">
                        <el-input
                          v-model="productCatalog1Details.productName"
                          id="productCatalog1Details.productName"
                          name="productCatalog1Details.productName"
                          class="w-100"
                          placeholder="Search"
                          clearable
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 my-auto required"
                    >
                      Manufacturer
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 my-auto"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="manufacturer">
                        <el-input
                          v-model="productCatalog1Details.manufacturer"
                          id="productCatalog1Details.manufacturer"
                          name="productCatalog1Details.manufacturer"
                          class="w-100"
                          placeholder="Search"
                          clearable
                        />
                      </el-form-item>
                    </div>
                  </div>

                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 my-auto required"
                    >
                      Model/Version
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 my-auto"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="modelVersion">
                        <el-input
                          v-model="productCatalog1Details.modelVersion"
                          id="productCatalog1Details.modelVersion"
                          name="productCatalog1Details.modelVersion"
                          class="w-100"
                          placeholder="Search"
                          clearable
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      Additional Information
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="additionalInfo">
                        <el-input
                          size="default"
                          v-model="productCatalog1Details.additionalInfo"
                          placeholder="Input"
                          id="productCatalog1Details.additionalInfo"
                          name="productCatalog1Details.additionalInfo"
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
                      Association Status
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 my-auto"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="prodCatStatus">
                        <el-radio-group
                          v-model="productCatalog1Details.prodCatStatus"
                        >
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
                    {{
                      productCatalog1Details.productCatalogId
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
    <section id="product-catalog-list" class="rounded rounded-3 p-8 bg-white">
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
                    {{ productCatalogPageInfo.pageInfo?.recordsFiltered }}
                    of
                    {{ productCatalogPageInfo.pageInfo?.totalPages }} data</span
                  >
                </span>
              </span>
            </div>

            <Datatable
              :header="productCatalogHeader"
              :data="productCatalogList"
              :items-per-page="productCatalogPageInfo?.length"
              :items-per-page-dropdown-enabled="true"
              :loading="loadingFilter"
              :total-info-enabled="false"
              sortingEnabled
            >
              <template v-slot:productCatalogId="{ row: data }">
                <div
                  class="fs-5 text-primary cursor-pointer"
                  @click="onEdit(data)"
                >
                  {{ getValueFromList(data.productCatalogId, listOfSample) }}
                </div>
              </template>
              <template v-slot:companyId="{ row: data }">
                <div
                  class="fs-5 text-primary cursor-pointer"
                  @click="onEdit(data)"
                >
                  {{ getValueFromList(data.companyId, listOfSample) }}
                </div>
              </template>
              <template v-slot:prodCatTier1="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.prodCatTier1, listOfSample) }}
                </div>
              </template>
              <template v-slot:prodCatTier2="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.prodCatTier2, listOfSample) }}
                </div>
              </template>
              <template v-slot:prodCatTier3="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.prodCatTier3, listOfSample) }}
                </div>
              </template>
              <template v-slot:productName="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.productName, listOfSample) }}
                </div>
              </template>
              <template v-slot:manufacturer="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.manufacturer, listOfSample) }}
                </div>
              </template>
              <template v-slot:modelVersion="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.modelVersion, listOfSample) }}
                </div>
              </template>
              <template v-slot:additionalInfo="{ row: data }">
                <div class="fs-5">
                  {{ data.additionalInfo }}
                </div>
              </template>
              <template v-slot:productNumber="{ row: data }">
                <div class="fs-5">
                  {{ data.productNumber }}
                </div>
              </template>
              <template v-slot:prodCatStatus="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.prodCatStatus, listOfSample) }}
                </div>
              </template>
              <template v-slot:lastModifiedDate="{ row: data }">
                <div class="fs-5">
                  {{ formatDate(data.lastModifiedDate) }}
                </div>
              </template>
              <template v-slot:modifiedBy="{ row: data }">
                <div class="fs-5">
                  {{ data.modifiedBy }}
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

<script src="./ProductCatalog1.ts" lang="ts"></script>
