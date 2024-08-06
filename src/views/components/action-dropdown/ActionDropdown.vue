<template>
  <div class="fs-6 cursor-pointer">
    <el-dropdown
      v-if="showObsoleteBtn || showDestroyBtn"
      id="dropdown.actionId"
    >
      <span class="el-dropdown-link">
        <i
          :id="'dropdown.actionId_' + index"
          class="bi bi-three-dots-vertical me-2"
        ></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-if="showObsoleteBtn">
            <span
              class="svg-icon svg-icon-2tx svg-icon-primary text-gray-700 fs-5"
              @click="showModalById('modal-obsolete-' + index)"
              :id="'dropdown.action.obsolete_' + index"
            >
              <inline-svg
                class="me-4"
                :src="getMediaPath('icons/main/ic_obsolete.svg')"
              />
              Obsolete
            </span>
          </el-dropdown-item>
          <el-dropdown-item v-if="showDestroyBtn">
            <span
              class="svg-icon svg-icon-2tx svg-icon-primary text-gray-700 fs-5"
              @click="onDestroy()"
              :id="'dropdown.action.destroy' + index"
            >
              <inline-svg
                class="me-4"
                :src="getMediaPath('icons/main/ic_destroy.svg')"
              />
              Destroy
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>

  <ModalObsolete
    :modal-id="'modal-obsolete-' + index"
    :module-number="moduleNumber"
    @submit-action="onObsolete"
  />
</template>

<script src="./ActionDropdown.ts" lang="ts"></script>
