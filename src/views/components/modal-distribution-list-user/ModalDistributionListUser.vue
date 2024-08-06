<template>
  <!--begin::Modal - Create App-->
  <div
    class="modal fade"
    id="modal_distribution_list_user"
    ref="modalDistributionListUser"
    data-bs-keyboard="false"
    data-bs-backdrop="static"
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
          <h2>Distribution List User</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
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
          <div class="d-flex flex-md-row flex-column justify-content-between">
            <span class="my-1">
              <h4 class="my-auto">List</h4>

              <span>
                <span class="h6 fw-normal text-muted">Show</span>
                <span class="h6 fw-normal text-primary ms-1">
                  {{ dataToDisplay ?? 0 }} of
                  {{ userList?.length ?? 0 }}
                  data</span
                >
              </span>
            </span>

            <div class="-h-100 w-md-300px my-auto ms-auto">
              <el-input
                size="default"
                class="w-100"
                v-model="filter.searchValue"
                placeholder="Search"
                id="search_user"
                name="search_user"
                :prefix-icon="Search"
                @input="onFilter()"
                clearable
              />
            </div>
          </div>

          <div class="">
            <el-skeleton :loading="loading">
              <template #template>
                <el-skeleton :rows="10" />
              </template>
              <template #default>
                <Datatable
                  :loading="loadingFilter"
                  :header="distributionListDepartmentHeader"
                  :data="userList"
                  :items-per-page="filter.itemPerPage"
                  :items-per-page-dropdown-enabled="true"
                  checkbox-label="USERID"
                  checkbox-type="multiple"
                  checkboxEnabled
                  sortingEnabled
                  :checkbox-selected="[...selectedUser]"
                  @on-items-select="selectedValue = $event"
                  @onItemsPerPageChange="filter.itemPerPage = $event"
                  @data-to-display="dataToDisplay = $event"
                >
                  <template v-slot:USERNAME="{ row: data }">
                    <div class="fs-5">
                      {{ data.USERNAME }}
                    </div>
                  </template>
                  <template v-slot:EMAIL="{ row: data }">
                    <div class="fs-5">
                      {{ data.EMAIL }}
                    </div>
                  </template>
                  <template v-slot:SYSROLE="{ row: data }">
                    <div class="fs-5">{{ data.SYSROLE }}</div>
                  </template>
                </Datatable>
              </template>
            </el-skeleton>
          </div>
        </div>
        <!--begin::Modal body-->

        <!-- being::Modal footer -->
        <div class="modal-footer">
          <button
            class="btn btn-lg btn-secondary"
            type="button"
            data-bs-dismiss="modal"
            @click="onCancel()"
          >
            <span class="indicator-label"> Cancel </span>
            <span class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
          <button
            class="btn btn-lg btn-danger"
            type="button"
            data-bs-dismiss="modal"
            @click="onAdd()"
            :disabled="userList.length == 0 ? true : false"
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

<script src="./ModalDistributionListUser.ts" lang="ts"></script>
