<template>
  <!-- begin::Main -->
  <section id="main" class="d-flex flex-column gap-3">
    <section id="form-create" class="rounded rounded-3 p-8 bg-white">
      <el-skeleton :loading="loading" :rows="6" animated>
        <template #default>
          <el-form
            :rules="peopleRules"
            :model="peopleDetails"
            ref="peopleTypeFormRef"
            scroll-to-error
          >
            <div class="d-flex flex-column gap-3 w-100">
              <h5>People</h5>

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
                          v-model="peopleDetails.company"
                          id="peopleDetails.company"
                          name="peopleDetails.company"
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
                      User ID
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 my-auto"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="userId">
                        <el-input
                          size="default"
                          v-model="peopleDetails.userId"
                          placeholder="Input "
                          id="peopleDetails.userId"
                          name="peopleDetails.userId"
                          type="Input "
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 my-auto required"
                      :class="isFieldEdit ? 'my-auto' : ''"
                    >
                      Employee Number
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 my-auto"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="empNum">
                        <el-input
                          size="default"
                          v-model="peopleDetails.empNum"
                          placeholder="Input "
                          id="peopleDetails.empNum"
                          name="peopleDetails.empNum"
                          type="Input "
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      Personal Number
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="persNo">
                        <el-input
                          size="default"
                          v-model="peopleDetails.persNo"
                          placeholder="Input "
                          id="peopleDetails.persNo"
                          name="peopleDetails.persNo"
                          type="Input "
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      User Name
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="userName">
                        <el-input
                          size="default"
                          v-model="peopleDetails.userName"
                          placeholder="Input "
                          id="peopleDetails.userName"
                          name="peopleDetails.userName"
                          type="Input "
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      Email
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="email">
                        <el-input
                          size="default"
                          v-model="peopleDetails.email"
                          placeholder="Input "
                          id="peopleDetails.email"
                          name="peopleDetails.email"
                          type="Input "
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      ID Type
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="idType">
                        <el-select
                          v-model="peopleDetails.idType"
                          id="peopleDetails.idType"
                          name="peopleDetails.idType"
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
                      ID Number
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="idNumber">
                        <el-input
                          size="default"
                          v-model="peopleDetails.idNumber"
                          placeholder="Input "
                          id="peopleDetails.idNumber"
                          name="peopleDetails.idNumber"
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
                      Sex
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="sex">
                        <el-input
                          size="default"
                          v-model="peopleDetails.sex"
                          placeholder="Input "
                          id="peopleDetails.sex"
                          name="peopleDetails.sex"
                          type="Input "
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      Assignment Type
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="assignmentType">
                        <el-select
                          v-model="peopleDetails.assignmentType"
                          id="peopleDetails.assignmentType"
                          name="peopleDetails.assignmentType"
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
                      Is Active
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="isActive">
                        <el-input
                          size="default"
                          v-model="peopleDetails.isActive"
                          placeholder="Input "
                          id="peopleDetails.isActive"
                          name="peopleDetails.isActive"
                          type="Input "
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      CCID
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="ccid">
                        <el-input
                          size="default"
                          v-model="peopleDetails.ccid"
                          placeholder="Input "
                          id="peopleDetails.ccid"
                          name="peopleDetails.ccid"
                          type="Input "
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      CC Name
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="ccName">
                        <el-input
                          size="default"
                          v-model="peopleDetails.ccName"
                          placeholder="Input "
                          id="peopleDetails.ccName"
                          name="peopleDetails.ccName"
                          type="Input "
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      KBO
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="kbo">
                        <el-input
                          size="default"
                          v-model="peopleDetails.kbo"
                          placeholder="Input "
                          id="peopleDetails.kbo"
                          name="peopleDetails.kbo"
                          type="Input "
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      KBO Name
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="kboName">
                        <el-input
                          size="default"
                          v-model="peopleDetails.kboName"
                          placeholder="Input "
                          id="peopleDetails.kboName"
                          name="peopleDetails.kboName"
                          type="Input "
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      Position ID
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="posId">
                        <el-input
                          size="default"
                          v-model="peopleDetails.posId"
                          placeholder="Input "
                          id="peopleDetails.posId"
                          name="peopleDetails.posId"
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
                      Position Name
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="posName">
                        <el-input
                          size="default"
                          v-model="peopleDetails.posName"
                          placeholder="Input "
                          id="peopleDetails.posName"
                          name="peopleDetails.posName"
                          type="Input "
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      Parent Position ID
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="parentPosId">
                        <el-input
                          size="default"
                          v-model="peopleDetails.parentPosId"
                          placeholder="Input "
                          id="peopleDetails.parentPosId"
                          name="peopleDetails.parentPosId"
                          type="Input "
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      Parent Position Name
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="parentPosName">
                        <el-input
                          size="default"
                          v-model="peopleDetails.parentPosName"
                          placeholder="Input "
                          id="peopleDetails.parentPosName"
                          name="peopleDetails.parentPosName"
                          type="Input "
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      Parent User ID
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="parentUserId">
                        <el-input
                          size="default"
                          v-model="peopleDetails.parentUserId"
                          placeholder="Input "
                          id="peopleDetails.parentUserId"
                          name="peopleDetails.parentUserId"
                          type="Input "
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      Function
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="function">
                        <el-input
                          size="default"
                          v-model="peopleDetails.function"
                          placeholder="Input "
                          id="peopleDetails.function"
                          name="peopleDetails.function"
                          type="Input "
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      SUB Function
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="subFunction">
                        <el-input
                          size="default"
                          v-model="peopleDetails.subFunction"
                          placeholder="Input "
                          id="peopleDetails.subFunction"
                          name="peopleDetails.subFunction"
                          type="Input "
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      Section ID
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="sectionId">
                        <el-input
                          size="default"
                          v-model="peopleDetails.sectionId"
                          placeholder="Input "
                          id="peopleDetails.sectionId"
                          name="peopleDetails.sectionId"
                          type="Input "
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      Section
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="section">
                        <el-input
                          size="default"
                          v-model="peopleDetails.section"
                          placeholder="Input "
                          id="peopleDetails.section"
                          name="peopleDetails.section"
                          type="Input "
                        />
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
                      Unit ID
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="unitId">
                        <el-input
                          size="default"
                          v-model="peopleDetails.unitId"
                          placeholder="Input "
                          id="peopleDetails.unitId"
                          name="peopleDetails.unitId"
                          type="Input "
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      Unit Name
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="unitName">
                        <el-input
                          size="default"
                          v-model="peopleDetails.unitName"
                          placeholder="Input "
                          id="peopleDetails.unitName"
                          name="peopleDetails.unitName"
                          type="Input "
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      Location Category
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="locCategory">
                        <el-select
                          v-model="peopleDetails.locCategory"
                          id="peopleDetails.locCategory"
                          name="peopleDetails.locCategory"
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
                      Location Group
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="locGroup">
                        <el-select
                          v-model="peopleDetails.locGroup"
                          id="peopleDetails.locGroup"
                          name="peopleDetails.locGroup"
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
                      Area ID
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="areaId">
                        <el-input
                          size="default"
                          v-model="peopleDetails.areaId"
                          placeholder="Input "
                          id="peopleDetails.areaId"
                          name="peopleDetails.areaId"
                          type="Input "
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      Area Name
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="areaName">
                        <el-input
                          size="default"
                          v-model="peopleDetails.areaName"
                          placeholder="Input "
                          id="peopleDetails.areaName"
                          name="peopleDetails.areaName"
                          type="Input "
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      SUB Area ID
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="subAreaId">
                        <el-input
                          size="default"
                          v-model="peopleDetails.subAreaId"
                          placeholder="Input "
                          id="peopleDetails.subAreaId"
                          name="peopleDetails.subAreaId"
                          type="Input "
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      class="fs-5 fw-normal col-sm-4 col-form-label pe-0 py-0 mt-1 required"
                    >
                      SUB Area Name
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="subAreaName">
                        <el-select
                          v-model="peopleDetails.subAreaName"
                          id="peopleDetails.subAreaName"
                          name="peopleDetails.subAreaName"
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
                      Back To Back
                    </label>
                    <label
                      class="col-1 col-form-label d-sm-block d-none text-end py-0 mt-1"
                      >:</label
                    >
                    <div class="col-sm-7 col-12 fs-5 fw-normal my-auto">
                      <el-form-item class="mb-n1" prop="backToBack">
                        <el-input
                          size="default"
                          v-model="peopleDetails.backToBack"
                          placeholder="Input "
                          id="peopleDetails.backToBack"
                          name="peopleDetails.backToBack"
                          type="Input "
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
                    {{ peopleDetails.userId ? "Update" : "Save" }}
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
    <section id="people_employee" class="rounded rounded-3 p-8 bg-white">
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
                    {{ peoplePageInfo.pageInfo?.recordsFiltered }}
                    of
                    {{ peoplePageInfo.pageInfo?.totalPages }} data</span
                  >
                </span>
              </span>
            </div>

            <Datatable
              :header="peopleHeader"
              :data="peopleList"
              :items-per-page="peoplePageInfo?.length"
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
              <template v-slot:userId="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.userId, listOfSample) }}
                </div>
              </template>
              <template v-slot:empNum="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.empNum, listOfSample) }}
                </div>
              </template>
              <template v-slot:persNo="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.persNo, listOfSample) }}
                </div>
              </template>
              <template v-slot:userName="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.userName, listOfSample) }}
                </div>
              </template>
              <template v-slot:email="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.email, listOfSample) }}
                </div>
              </template>
              <template v-slot:idType="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.idType, listOfSample) }}
                </div>
              </template>
              <template v-slot:idNumber="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.idNumber, listOfSample) }}
                </div>
              </template>
              <template v-slot:sex="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.sex, listOfSample) }}
                </div>
              </template>
              <template v-slot:assignmentType="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.assignmentType, listOfSample) }}
                </div>
              </template>
              <template v-slot:isActive="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.isActive, listOfSample) }}
                </div>
              </template>
              <template v-slot:ccid="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.ccid, listOfSample) }}
                </div>
              </template>
              <template v-slot:ccName="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.ccName, listOfSample) }}
                </div>
              </template>
              <template v-slot:kbo="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.kbo, listOfSample) }}
                </div>
              </template>
              <template v-slot:kboName="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.kboName, listOfSample) }}
                </div>
              </template>
              <template v-slot:posId="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.posId, listOfSample) }}
                </div>
              </template>
              <template v-slot:posName="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.posName, listOfSample) }}
                </div>
              </template>
              <template v-slot:parentPosId="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.parentPosId, listOfSample) }}
                </div>
              </template>
              <template v-slot:parentPosName="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.parentPosName, listOfSample) }}
                </div>
              </template>
              <template v-slot:parentUserId="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.parentUserId, listOfSample) }}
                </div>
              </template>
              <template v-slot:function="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.function, listOfSample) }}
                </div>
              </template>
              <template v-slot:subFunction="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.subFunction, listOfSample) }}
                </div>
              </template>
              <template v-slot:sectionId="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.sectionId, listOfSample) }}
                </div>
              </template>
              <template v-slot:section="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.section, listOfSample) }}
                </div>
              </template>
              <template v-slot:unitId="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.unitId, listOfSample) }}
                </div>
              </template>
              <template v-slot:unitName="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.unitName, listOfSample) }}
                </div>
              </template>
              <template v-slot:locCategory="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.locCategory, listOfSample) }}
                </div>
              </template>
              <template v-slot:locGroup="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.locGroup, listOfSample) }}
                </div>
              </template>
              <template v-slot:areaId="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.areaId, listOfSample) }}
                </div>
              </template>
              <template v-slot:areaName="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.areaName, listOfSample) }}
                </div>
              </template>
              <template v-slot:subAreaId="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.subAreaId, listOfSample) }}
                </div>
              </template>
              <template v-slot:subAreaName="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.subAreaName, listOfSample) }}
                </div>
              </template>
              <template v-slot:backToBack="{ row: data }">
                <div class="fs-5">
                  {{ getValueFromList(data.backToBack, listOfSample) }}
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

<script src="./People.ts" lang="ts"></script>
