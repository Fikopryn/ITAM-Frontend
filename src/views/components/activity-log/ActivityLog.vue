<template>
  <!-- begin::Main -->
  <section id="main">
    <div class="d-flex flex-column flex-md-row gap-3">
      <!-- begin::Activity log -->
      <div
        id="activity-log"
        class="card card-body rounded-3 p-8 d-flex flex-column gap-5 w-md-75 w-100 h-100 shadow"
      >
        <el-skeleton :loading="loadingData" :rows="7" animated>
          <template #default>
            <h5>Activity Log</h5>
            <!--begin::Stepper-->
            <div
              v-if="logActivity.length > 0"
              class="stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid"
              id="kt_modal_create_app_stepper"
              ref="createAppRef"
            >
              <div
                class="d-flex justify-content-start flex-column w-100 gap-10"
              >
                <!--begin::Nav-->
                <div class="stepper-nav w-100">
                  <!--begin::Step 1-->
                  <div
                    v-for="(element, index) in logActivity"
                    :key="index"
                    class="stepper-item w-100"
                    data-kt-stepper-element="nav"
                  >
                    <div class="stepper-wrapper">
                      <!--begin::Icon-->
                      <div class="stepper-icon w-40px h-40px">
                        <img
                          :src="getMediaPath('icons/main/ic-notes.svg')"
                          alt="ic-notes"
                        />
                      </div>
                      <!--end::Icon-->

                      <!--begin::Label-->
                      <div class="stepper-label my-auto">
                        <div class="fs-5 fw-semibold">
                          {{ element.userName }} ({{ element.userId }})
                        </div>
                        <div class="fs-6 text-gray-500 mt-1">
                          {{ formatDatetime(element.timestamp) }}
                        </div>
                      </div>
                      <!--end::Label-->

                      <!--begin::Status-->
                      <div
                        class="ms-auto d-md-block d-none mb-auto"
                        v-html="logColor(element.action ?? '-')"
                      ></div>
                      <!--end::Status-->
                    </div>

                    <!--begin::Line-->
                    <div
                      class="stepper-line d-flex flex-row align-self-start w-100"
                      :class="[
                        element.remarks ||
                        (element.details && element.details?.length > 0)
                          ? 'h-100'
                          : 'h-30p',
                        logActivity.length - 1 > index ? '' : 'border-0',
                      ]"
                      :style="{
                        paddingLeft: '2.2px',
                        borderLeftWidth: '1.5px',
                        borderLeftStyle: 'dashed',
                        borderLeftColor: '#D1D5EC',
                      }"
                    >
                      <!-- begin::Comment -->
                      <template v-if="logType == 'COMMENT'">
                        <div v-if="element.remarks" class="my-auto ms-12">
                          <img
                            :src="getMediaPath('icons/main/ic-comment.svg')"
                            alt="ic-comment"
                          />
                        </div>

                        <div
                          v-if="element.remarks"
                          class="fs-6 ms-2 text-gray-500 my-6"
                        >
                          {{ element.remarks }}
                        </div>
                      </template>
                      <!-- end::Comment -->

                      <!-- begin::Details -->
                      <template v-else>
                        <div
                          v-if="element.details && element.details?.length > 0"
                          class="my-auto ms-12 w-100 me-8"
                        >
                          <Datatable
                            :loading="false"
                            :header="activityDetailsHeader"
                            :data="element.details ?? []"
                            :items-per-page="element.details?.length"
                            :items-per-page-dropdown-enabled="false"
                            :currentPage="1"
                            :total="element.details?.length"
                            :total-info-enabled="false"
                          >
                            <template v-slot:revision="{ row: data }">
                              <div>{{ data.revision }}</div>
                            </template>
                            <template v-slot:column="{ row: data }">
                              <div>{{ data.column }}</div>
                            </template>
                            <template v-slot:before="{ row: data }">
                              <div>{{ data.before }}</div>
                            </template>
                            <template v-slot:after="{ row: data }">
                              <div>{{ data.after }}</div>
                            </template>
                          </Datatable>
                        </div>
                        <div v-else class="h-30px"></div>
                      </template>
                      <!-- end::Details -->
                    </div>
                    <!--end::Line-->
                  </div>
                  <!--end::Step 1-->
                </div>
                <!--end::Nav-->
              </div>
            </div>

            <div v-else>
              <EmptyData
                title="No Data"
                desc="There is no activity log"
                icon-link="illustrations/main/empty-state/img-no-data-general.svg"
              />
            </div>
            <!--end::Stepper-->
          </template>
        </el-skeleton>
      </div>
      <!-- end::Activity log -->

      <!-- begin::Current assignment -->
      <div
        id="current-assignment"
        class="card card-body rounded-3 py-5 w-50 h-100 shadow"
      >
        <el-skeleton :loading="loadingData" :rows="3" animated>
          <template #default>
            <div
              class="d-flex flex-column gap-3"
              v-if="currentAssignment.length > 0"
            >
              <h5>
                Current Assignment
                <span
                  class="badge px-2"
                  :style="{ backgroundColor: '#ffe9eb', color: '#cb2131' }"
                  >{{ currentAssignment.length }}</span
                >
              </h5>

              <div
                class="d-flex flex-wrap flex-md-row gap-3"
                :class="
                  currentAssignment.length <= 2 ? 'align-items-center' : ''
                "
              >
                <div :class="currentAssignment.length > 2 ? 'mt-3' : ''">
                  <img
                    :src="getMediaPath('icons/main/ic-user-circle-blank.svg')"
                    alt="ic-user-assignment"
                  />
                </div>

                <div class="d-flex flex-column gap-1">
                  <div
                    class="fs-6 fw-semibold"
                    v-for="(element, index) in previewCurrentAssignment"
                    :key="index"
                  >
                    {{ element.USERNAME }}
                  </div>
                  <div
                    v-if="isShowAll && currentAssignment.length > 2"
                    class="fs-6 fw-semibold text-primary cursor-pointer"
                    @click="showAll(isShowAll)"
                  >
                    See More
                  </div>
                  <div
                    v-else-if="!isShowAll && currentAssignment.length > 2"
                    class="fs-6 fw-semibold text-primary cursor-pointer"
                    @click="showAll(isShowAll)"
                  >
                    See Less
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="d-flex flex-row flex-grow-1 gap-10">
              <img
                :src="
                  getMediaPath(
                    'illustrations/main/empty-state/img-no-current-assignment.svg'
                  )
                "
                width="150"
                class="img-fluid my-auto"
                alt=""
                srcset=""
              />
              <div class="my-auto">
                <div class="fs-5 fw-bold">No Assignment Yet</div>
                <div class="fs-5 mt-2" style="color: #757a90">
                  There is no current assignment
                </div>
              </div>
            </div>
          </template>
        </el-skeleton>
      </div>
      <!-- end::Current assignment -->
    </div>
  </section>
  <!-- end::Main -->
</template>

<script src="./ActivityLog.ts" lang="ts"></script>
