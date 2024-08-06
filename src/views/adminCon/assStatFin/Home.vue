<template>
  <section id="main">

    <el-table :data="tableData" style="width: 100%" max-height="400">
      <el-table-column prop="operatingComp" label="Operating Company" min-width="130" sortable />

      <el-table-column prop="assStatFinId" label="Asset Status Finance ID" min-width="150" sortable />

      <el-table-column prop="assStatFin" label="Asset Status Finance" min-width="150" sortable />

      <el-table-column prop="assStat" label="Asset Status" min-width="140" sortable />

      <el-table-column prop="lastMod" label="Last Modified" min-width="150" sortable />

      <el-table-column prop="modBy" label="Modified by" min-width="170" sortable />

      <el-table-column fixed="right" label="Operations" min-width="180">
        <template #default="scope">
          <el-button size="small" type="primary" @click="handleDetail(scope.$index, scope.row)">Detail</el-button>
          <el-button size="small" type="success" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <!-- <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <div class="demo-pagination-block">
      <el-pagination v-model:current-page="currentPage2" v-model:page-size="pageSize2" :page-sizes="[100, 200, 300, 400]"
        :small="small" :disabled="disabled" :background="background" layout="sizes, prev, pager, next" :total="1000"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>

  </section>
</template>

<script src="./Home.ts" lang="ts"></script>