<template>
  <section id="main">
    <el-table :data="filterTableData" style="width: 100%">
      <!-- <el-table-column prop="comp" label="Company" min-width="130" header-align="center" sortable column-key="comp" /> -->
      <el-table-column
        prop="company"
        label="Company"
        min-width="170"
        header-align="center"
        sortable
        column-key="company"
      />

      <el-table-column prop="people" label="People" header-align="center">
        <el-table-column
          prop="userId"
          label="user ID"
          min-width="100"
          header-align="center"
          sortable
          column-key="userId"
        />
        <el-table-column
          prop="username"
          label="Username"
          min-width="100"
          header-align="center"
          sortable
          column-key="username"
        />
        <el-table-column
          prop="email"
          label="Email"
          min-width="100"
          header-align="center"
          sortable
          column-key="email"
        />
        <el-table-column
          prop="fungsi"
          label="Fungsi"
          min-width="100"
          align="center"
          sortable
          column-key="fungsi"
        />
        <el-table-column
          prop="subFunction"
          label="Sub Function"
          min-width="100"
          align="center"
          sortable
          column-key="subFunction"
        />
        <el-table-column
          prop="section"
          label="section"
          min-width="100"
          align="center"
          sortable
          column-key="section"
        />
      </el-table-column>
      <el-table-column fixed="right" align="center">
        <template #header>
          <el-input
            v-model="search"
            size="medium"
            placeholder="Type to search"
          />
        </template>
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            @click="dialogDetailVisible = true"
            >Detail</el-button
          >
          <el-button size="small" type="success">Edit</el-button>

          <el-dialog
            v-model="dialogDetailVisible"
            title="Notice"
            width="30%"
            destroy-on-close
            style="margin-top: 25vh"
          >
            <div>
              <el-input disabled :placeholder="filterTableData['']" class="m-2">
                <template #prepend>Company</template>
              </el-input>
            </div>
            <div>
              <el-input disabled :placeholder="scope.row.tier1" class="m-2">
                <template #prepend>Tier 1</template>
              </el-input>
            </div>
            <div>
              <el-input disabled :placeholder="scope.row.userId" class="m-2">
                <template #prepend>Tier 2</template>
              </el-input>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 15]"
      :small="small"
      :Disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="filterTableData.length"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </section>
</template>

<script src="./Home.ts" lang="ts"></script>
