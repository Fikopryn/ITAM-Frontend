<template>
  <section id="main">
    <el-table :data="filterTableData" style="width: 100%">
      <!-- <el-table-column prop="comp" label="Company" min-width="130" header-align="center" sortable column-key="comp" /> -->
      <el-table-column
        prop="prodName"
        label="Product Name"
        min-width="170"
        header-align="center"
        sortable
        column-key="prodName"
      />

      <el-table-column
        prop="prodCat"
        label="Product Category"
        header-align="center"
      />
        <el-table-column
          prop="tier1"
          label="Tier 1"
          min-width="70"
          align="center"
          sortable
          column-key="tier1"
          :filters="[
            { text: 'EUS', value: 'EUS' },
            { text: 'INF', value: 'INF' },
            { text: 'TEL', value: 'TEL' },
          ]"
          :filter-method="filterTag"
        >
          <template #default="scope">
            <el-tag
              :type="scope.row.tag === 'Enable' ? '' : 'info'"
              disable-transitions
              >{{ scope.row.tier1 }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="tier2"
          label="Tier 2"
          min-width="100"
          header-align="center"
          sortable
          column-key="tier2"
        />
        <el-table-column
          prop="tier3"
          label="Tier 3"
          min-width="100"
          header-align="center"
          sortable
          column-key="tier3"
        />
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
              :type="scope.row.tag === 'Enable' ? 'success' : 'danger'"
              disable-transitions
              >{{ scope.row.tag }}</el-tag
            >
          </template>
        </el-table-column>
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
              <el-input disabled :placeholder="tableData['']" class="m-2">
                <template #prepend>Company</template>
              </el-input>
            </div>
            <div>
              <el-input disabled :placeholder="scope.row.tier1" class="m-2">
                <template #prepend>Tier 1</template>
              </el-input>
            </div>
            <div>
              <el-input disabled :placeholder="scope.row.tier2" class="m-2">
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

<script lang="ts" setup>