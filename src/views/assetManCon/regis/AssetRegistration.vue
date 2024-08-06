<template>
  <!-- begin::Main -->
  <section id="main" class="d-flex flex-column gap-3">
    <section id="form-create" class="rounded rounded-3 p-8 bg-white">
      <el-skeleton :loading="loading" :rows="6" animated>
        <template #default>
          <el-form
            :rules="assetRegistrationRules"
            :model="assetRegistrationDetails"
            ref="assetRegistrationTypeFormRef"
            scroll-to-error
          >
            <div class="d-flex flex-column gap-3 w-100">
              <h5>Asset Registration</h5>

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
                      <el-form-item class="mb-n1" prop="company">
                        <el-select
                          v-model="assetRegistrationDetails.company"
                          id="assetRegistrationDetails.company"
                          name="assetRegistrationDetails.company"
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
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 my-auto required"
                      :class="isFieldEdit ? 'my-auto' : ''"
                    >
                      Delivery Order
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 my-auto"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="deliveryOrder">
                        <el-input
                          size="default"
                          v-model="assetRegistrationDetails.deliveryOrder"
                          placeholder="Input "
                          id="assetRegistrationDetails.deliveryOrder"
                          name="assetRegistrationDetails.deliveryOrder"
                          type="Input "
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 my-auto required"
                    >
                      Delivery Order Date
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
                            v-model="assetRegistrationDetails.deliveryOrderDate"
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
                      Received Date
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
                            v-model="assetRegistrationDetails.receivedDate"
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
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      Supplier Name
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="supplierName">
                        <el-select
                          v-model="assetRegistrationDetails.supplierName"
                          id="assetRegistrationDetails.supplierName"
                          name="assetRegistrationDetails.supplierName"
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
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      Contract
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="contract">
                        <el-select
                          v-model="assetRegistrationDetails.contract"
                          id="assetRegistrationDetails.supplcontractierId"
                          name="assetRegistrationDetails.contract"
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
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      Purchase Order
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="purchaseOrder">
                        <el-select
                          v-model="assetRegistrationDetails.purchaseOrder"
                          id="assetRegistrationDetails.purchaseOrder"
                          name="assetRegistrationDetails.purchaseOrder"
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
                      Invoice
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="invoice">
                        <el-input
                          size="default"
                          v-model="assetRegistrationDetails.invoice"
                          placeholder="Input "
                          id="assetRegistrationDetails.invoice"
                          name="assetRegistrationDetails.invoice"
                          type="Input "
                        />
                      </el-form-item>
                    </div>
                  </div>
                </div>
                <!-- end::Left -->

                <!-- begin:: mid1-->
                <div class="flex-grow-1 d-flex flex-column gap-7">
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      Purchase Type
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="purchaseType">
                        <el-select
                          v-model="assetRegistrationDetails.purchaseType"
                          id="assetRegistrationDetails.purchaseType"
                          name="assetRegistrationDetails.purchaseType"
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
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      Acquistion Price
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="acquistionPrice">
                        <el-input
                          size="default"
                          v-model="assetRegistrationDetails.acquistionPrice"
                          placeholder="Input IDR "
                          id="assetRegistrationDetails.acquistionPrice"
                          name="assetRegistrationDetails.acquistionPrice"
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
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      Lease Price
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="leasePrice">
                        <el-input
                          size="default"
                          v-model="assetRegistrationDetails.leasePrice"
                          placeholder="Input IDR "
                          id="assetRegistrationDetails.leasePrice"
                          name="assetRegistrationDetails.leasePrice"
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
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      lastModifiedDate
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <div class="demo-date-picker">
                        <div class="block">
                          <div class="demonstration"></div>
                          <el-date-picker
                            v-model="assetRegistrationDetails.lastModifiedDate"
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
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      modifiedBy
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="modifiedBy">
                        <el-input
                          size="default"
                          v-model="assetRegistrationDetails.modifiedBy"
                          placeholder="Input "
                          id="assetRegistrationDetails.modifiedBy"
                          name="assetRegistrationDetails.modifiedBy"
                          type="Input "
                          disabled
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      ProductName
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="productName">
                        <el-select
                          v-model="assetRegistrationDetails.productName"
                          id="assetRegistrationDetails.productName"
                          name="assetRegistrationDetails.productName"
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
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      QTY
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="qty">
                        <el-input
                          size="default"
                          v-model="assetRegistrationDetails.qty"
                          placeholder="Input "
                          id="assetRegistrationDetails.qty"
                          name="assetRegistrationDetails.qty"
                          type="Input "
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      Unit
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="unit">
                        <el-input
                          size="default"
                          v-model="assetRegistrationDetails.unit"
                          placeholder="Input "
                          id="assetRegistrationDetails.unit"
                          name="assetRegistrationDetails.unit"
                          type="Input "
                        />
                      </el-form-item>
                    </div>
                  </div>
                </div>
                <!--end::mid1-->

                <!-- begin:: mid2-->
                <div class="flex-grow-1 d-flex flex-column gap-7">
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      Additional Info
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="additionalInformation">
                        <el-input
                          size="default"
                          v-model="
                            assetRegistrationDetails.additionalInformation
                          "
                          placeholder="Input"
                          id="assetRegistrationDetails.additionalInformation"
                          name="assetRegistrationDetails.additionalInformation"
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
                      :class="isFieldEdit ? 'my-auto' : ''"
                    >
                      Document
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
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      Asset Site
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="assetSite">
                        <el-select
                          v-model="assetRegistrationDetails.assetSite"
                          id="assetRegistrationDetails.assetSite"
                          name="assetRegistrationDetails.assetSite"
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
                </div>
                <!--end::mid-->

                <!-- begin::Right -->
                <div class="flex-grow-1 d-flex flex-column gap-7">
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      Building
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="building">
                        <el-input
                          size="default"
                          v-model="assetRegistrationDetails.building"
                          placeholder="Input "
                          id="assetRegistrationDetails.building"
                          name="assetRegistrationDetails.building"
                          type="Input "
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      Floor / Room
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="floorRoom">
                        <el-input
                          size="default"
                          v-model="assetRegistrationDetails.floorRoom"
                          placeholder="Input "
                          id="assetRegistrationDetails.floorRoom"
                          name="assetRegistrationDetails.floorRoom"
                          type="Input "
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      Asset Status
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="assetStatus">
                        <el-select
                          v-model="assetRegistrationDetails.assetStatus"
                          id="assetRegistrationDetails.assetStatus"
                          name="assetRegistrationDetails.assetStatus"
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
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      Asset Status Finance
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="assetStatusFinance">
                        <el-select
                          v-model="assetRegistrationDetails.assetStatusFinance"
                          id="assetRegistrationDetails.assetStatusFinance"
                          name="assetRegistrationDetails.assetStatusFinance"
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
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      Asset Knowledgement
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="assetKnowledgement">
                        <el-select
                          v-model="assetRegistrationDetails.assetKnowledgement"
                          id="assetRegistrationDetails.assetKnowledgement"
                          name="assetRegistrationDetails.assetKnowledgement"
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
                      Association Status
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 my-auto"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="associationStatus">
                        <el-radio-group
                          v-model="assetRegistrationDetails.associationStatus"
                        >
                          <el-radio label="Enabled"
                            ><div class="fs-5">Enabled</div></el-radio
                          >
                          <el-radio label="Disabled"
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
                    {{ assetRegistrationDetails.company ? "Update" : "Save" }}
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
    <section id="asset-registration" class="rounded rounded-3 p-8 bg-white">
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
                    {{ assetRegistrationPageInfo.pageInfo?.recordsFiltered }}
                    of
                    {{ assetRegistrationPageInfo.pageInfo?.totalPages }}
                    data</span
                  >
                </span>
              </span>
            </div>

            <Datatable
              :header="assetRegistrationHeader"
              :data="assetRegistrationList"
              :items-per-page="assetRegistrationPageInfo?.length"
              :items-per-page-dropdown-enabled="true"
              :loading="loadingFilter"
              :total-info-enabled="false"
              sortingEnabled
            >
              <template v-slot:company="{ row: data }">
                <div
                  class="fs-5 text-primary cursor-pointer"
                  @click="onEdit(data)"
                >
                  {{ getValueFromList(data.company, listOfSample) }}
                </div>
              </template>
              <template v-slot:deliveryOrder="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.deliveryOrder, listOfSample) }}
                </div>
              </template>
              <template v-slot:deliveryOrderDate="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.deliveryOrderDate, listOfSample) }}
                </div>
              </template>
              <template v-slot:receivedDate="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.receivedDate, listOfSample) }}
                </div>
              </template>
              <template v-slot:supplierName="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.supplierName, listOfSample) }}
                </div>
              </template>
              <template v-slot:contract="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.contract, listOfSample) }}
                </div>
              </template>
              <template v-slot:purchaseOrder="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.purchaseOrder, listOfSample) }}
                </div>
              </template>
              <template v-slot:invoice="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.invoice, listOfSample) }}
                </div>
              </template>
              <template v-slot:purchaseType="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.purchaseType, listOfSample) }}
                </div>
              </template>
              <template v-slot:acquistionPrice="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.acquistionPrice, listOfSample) }}
                </div>
              </template>
              <template v-slot:leasePrice="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.leasePrice, listOfSample) }}
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
              <template v-slot:productName="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.productName, listOfSample) }}
                </div>
              </template>
              <template v-slot:qty="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.qty, listOfSample) }}
                </div>
              </template>
              <template v-slot:unit="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.unit, listOfSample) }}
                </div>
              </template>
              <template v-slot:additionalInfo="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.additionalInfo, listOfSample) }}
                </div>
              </template>
              <template v-slot:document="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.document, listOfSample) }}
                </div>
              </template>
              <template v-slot:assetSite="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.assetSite, listOfSample) }}
                </div>
              </template>
              <template v-slot:building="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.building, listOfSample) }}
                </div>
              </template>
              <template v-slot:floorRoom="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.floorRoom, listOfSample) }}
                </div>
              </template>
              <template v-slot:assetStatus="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.assetStatus, listOfSample) }}
                </div>
              </template>
              <template v-slot:assetStatusFinance="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.assetStatusFinance, listOfSample) }}
                </div>
              </template>
              <template v-slot:assetKnowledgement="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.assetKnowledgement, listOfSample) }}
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

<script src="./AssetRegistration.ts" lang="ts"></script>
