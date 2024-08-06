<template>
  <section id="main">
    <el-text class="mx-1" size="large">Large</el-text>
    <el-form :model="adminCon" label-width="120px">
      <el-form-item label="ProdCat1ID">
        <el-input v-model="adminCon.prodCat1ID" disabled />
      </el-form-item>

      <el-form-item label="Product Category Tier 1">
        <el-input v-model="adminCon.productCategoryTier1" />
      </el-form-item>

      <el-form-item label="Association Status">
        <el-input v-model="adminCon.associationStatus" />
      </el-form-item>

      <el-form-item label="Operating Company">
        <el-select
          v-model="adminCon.operatingCompany"
          placeholder="please select your zone"
        >
          <el-option
            v-for="(item, index) in listOfOperatingCompany"
            :key="index"
            :label="item.lovValue"
            :value="item.lovKey"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </section>
</template>

<script src="./Home.ts" lang="ts"></script>
