<template>
  <section id="main">
    <el-row> </el-row>
    <el-row>
      <el-col :span="12">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          current-page="currentPage"
          page-size="pageSize"
          :page-sizes="[5, 10, 15]"
          :small="small"
          :Disabled="disabled"
          :background="background"
          :total="filterTableData.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-col>

      <el-col :span="12">
        <el-input v-model="search" size="medium" placeholder="Type to search">
          <template #prepend>Search</template>
          <template #append>
            <!-- <el-button :icon="Search" /> -->
          </template>
        </el-input>
      </el-col>
    </el-row>

    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column prop="company" label="Company" header-align="center">
        <el-table-column
          prop="companyId"
          label="Company ID"
          min-width="100"
          header-align="center"
          sortable
          column-key="companyId"
        />

        <el-table-column
          prop="companyName"
          label="Company Name"
          min-width="100"
          header-align="center"
          sortable
          column-key="companyName"
          :filters="[
            {
              text: 'PT PERTAMINA HULU MAHAKAM',
              value: 'PT PERTAMINA HULU MAHAKAM',
            },
            {
              text: 'PT PERTAMINA HULU KALIMANTAN TIMUR',
              value: 'PT PERTAMINA HULU KALIMANTAN TIMUR',
            },
            {
              text: 'PT PERTAMINA HULU SANGA SANGA',
              value: 'PT PERTAMINA HULU SANGA SANGA',
            },
          ]"
        />

        <el-table-column
          prop="companyType"
          label="Company Type"
          min-width="70"
          align="center"
          sortable
          column-key="companyType"
          :filters="[
            { text: 'ICT SUPLIER', value: 'ICT SUPLIER' },
            { text: 'CUSTOMER', value: 'CUSTOMER' },
          ]"
          :filter-method="filterHandler"
        >
        </el-table-column>

        <el-table-column
          prop="status"
          label="Status"
          min-width="100"
          align="center"
          sortable
          column-key="status"
          :filters="[
            { text: 'Enable', value: 'Enable' },
            { text: 'Disable', value: 'Disable' },
          ]"
          :filter-method="filterTag"
        >
          <template #default="scope">
            <el-tag
              :type="scope.row.tag === 'Enable' ? '' : 'danger'"
              disable-transitions
              >{{ scope.row.tag }}</el-tag
            >
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column fixed="right" align="center">
        <template #header>
          <el-button size="medium" type="primary" plain @click="" align="center"
            >Add Company</el-button
          >
        </template>
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            @click="dialogDetailVisible = true"
            >Detail</el-button
          >
          <el-button
            size="small"
            type="success"
            @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >

          <!-- <el-popconfirm title="Are you sure to delete this?">
            <template #reference>
              <el-button size="small" type="danger" @click=" ">Delete</el-button>
            </template>
          </el-popconfirm> -->

          <el-dialog
            v-model="dialogDetailVisible"
            title="Detail"
            width="70%"
            destroy-on-close
            style="margin-top: 30vh"
          >
            <el-row :gutter="20">
              <el-col :span="8">
                <el-input disabled class="m-2" size="medium" placeholder="">
                  <template #prepend>Company ID</template>
                </el-input>
              </el-col>
              <el-col :span="16">
                <el-input disabled class="m-2" size="medium" placeholder="">
                  <template #prepend>Company Name</template>
                </el-input>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-input disabled class="m-2" size="medium" placeholder="">
                  <template #prepend>Company type</template>
                </el-input>
              </el-col>

              <el-col :span="8">
                <el-input disabled class="m-2" size="medium" placeholder="">
                  <template #prepend>Address</template>
                </el-input></el-col
              >

              <el-col :span="8">
                <el-input disabled class="m-2" size="medium" placeholder="">
                  <template #prepend>Google Map Address</template>
                </el-input></el-col
              >
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-input disabled class="m-2" size="medium" placeholder="">
                  <template #prepend>Website</template>
                </el-input>
              </el-col>

              <el-col :span="12">
                <el-input disabled class="m-2" size="medium" placeholder="">
                  <template #prepend>Office Phone</template>
                </el-input>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-input disabled class="m-2" size="medium" placeholder="">
                  <template #prepend>Contact Person</template>
                </el-input>
              </el-col>

              <el-col :span="12">
                <el-input disabled class="m-2" size="medium" placeholder="">
                  <template #prepend>Contact Phone</template>
                </el-input>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="6">
                <el-input disabled class="m-2" size="medium" placeholder="">
                  <template #prepend>Status</template>
                </el-input>
              </el-col>

              <el-col :span="8">
                <el-input disabled class="m-2" size="medium" placeholder="">
                  <template #prepend>Last Modified</template>
                </el-input>
              </el-col>

              <el-col :span="10">
                <el-input disabled class="m-2" size="medium" placeholder="">
                  <template #prepend>Modified by</template>
                </el-input>
              </el-col>
            </el-row>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script src="./Home.ts" lang="ts"></script>
