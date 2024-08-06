# BR3WOK (Busol R3 Framework) Frontend Template

## Intro

Template Frontend Busol R3 Framework (BR3WOK) digunakan sebagai template awal pengembangan aplikasi. Template ini menyediakan beberapa komponen user interface (UI) yang dapat dipergunakan ulang (reuse) sehingga dapat menjadi standarisasi dari sisi UI dan juga dapat mempercepat proses pengembangan aplikasi. Template ini dibangun menggunakan framework Javascript yang terdiri dari **[Vue.js](https://vuejs.org/)**, **[ElementPlus](https://element-plus.org/en-US/)**, **[Highcharts](https://www.highcharts.com/)** dan juga **[Bootstrap CSS](https://getbootstrap.com/)**.

## Prasyarat (Pre-Requisites)

- [Visual Studio Code](https://code.visualstudio.com/download) version 1.75 (latest updates on January 2023)
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) add-on for VS Code
- [Gitlens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) add-on for VS Code
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) add-on for VS Code
- [Git](https://git-scm.com/downloads) for source code management
- [Node.js](https://nodejs.org/en/download/) minimal menggunakan v16.19.0 atau menggunakan tools seperti _[Node Version Manager (NVM)](https://github.com/nvm-sh/nvm)_.
  > Perintah `nvm` berguna agar developer dapat lebih mudah berpindah-pindah node version apabila terdapat legacy projects yang masih menggunakan versi node sebelumnya.


**Contoh:**

```sh
$ nvm use 16
Now using node v16.9.1 (npm v7.21.1)
$ node -v
v16.9.1
$ nvm use 14
Now using node v14.18.0 (npm v6.14.15)
$ node -v
v14.18.0
$ nvm install 12
Now using node v12.22.6 (npm v6.14.5)
$ node -v
v12.22.6
```

## Panduan Penggunaan

### Create New Project From Template

1. Buka Powershell/Command Prompt kemudian arahkan ke folder tempat kita menyimpan project ini.
   `cd ~/workspace/playground`
2. Clone Frontend Template project
   `git clone http://10.18.0.57:8081/region3/br3wok/frontend.git`
   > Cloning into 'frontend'...
   > remote: Enumerating objects: 3102, done.
   > remote: Counting objects: 100% (322/322), done.
   > remote: Compressing objects: 100% (252/252), done.
   > remote: Total 3102 (delta 166), reused 128 (delta 65), pack-reused 2780
   > Receiving objects: 100% (3102/3102), 100.61 MiB | 91.25 MiB/s, done.
   > Resolving deltas: 100% (342/342), done.
3. Rename nama folder frontend menjadi nama project yang hendak dibuat
   `mv frontend new-project-name`
4. Masuk ke dalam folder hasil clone
   `cd new-project`
5. Hapus repository git remote lama dengan menhapus folder .git yang ada di dalam project hasil clone
6. Initialize git project baru dengan command berikut
   >`git init --initial-branch=main`

7. Tambahkan remote repository baru ke dalam project, jika belum ada silahkan buat project baru (blank project) melalui internal gitlab
   >`git remote add origin http://10.18.0.57:8081/region3/new-project.git`

8. Tambahkan seluruh file untuk initial commit 
   >`git add .`
   
   >`git commit -m "Initial commit"`

9. Push source code ke remote repository
   >`git push -u origin main`

### Menjalankan Project di Local Env

1. Jalankan perintah berikut untuk melakukan instalasi packages ataupun packages lainnya yang dibutuhkan oleh project template.
   `npm install`
   > added 400 packages from 365 contributors and audited 421 packages in 25.587s
   > 93 packages are looking for funding
   > run `npm fund` for details
   > found 1 moderate severity vulnerability
   > run `npm audit fix` to fix them, or `npm audit` for details
2. Jalankan perintah berikut untuk menjalankan project frontend di local computer
   `npm run dev`
   > VITE v3.2.3 ready in 551 ms
   > ➜ Local: http://127.0.0.1:8090/
   > ➜ Network: use --host to expose
3. Silahkan akses url yang diberikan menggunakan browser. Login menggunakan akun ptm anda jika diperlukan.

### Development Project

1. Untuk melakukan development, dapat menggunakan tools VS Code dengan tambahan beberapa addon yang telah disebutkan sebelumnya di [Prasyarat].
   > **Notes**: Add-on atau extension yang dipergunakan bertujuan untuk menjadi control standarisasi dalam melakukan coding. Developer dapat mengaktifkan auto-format on save untuk mempermudah hal tersebut.
2. Design Pattern **[MVVM](https://012.vuejs.org/guide/)** yaitu design pattern yang secara default diakomodir oleh Vue.JS. MVVM berfokus pada pemisahan antara kode untuk logika bisnis dan tampilan aplikasi. Dalam penerapannya, MVVM terbagi atas beberapa layer, yaitu Model, View, dan ViewModel. Sebagai contoh pada template [Example Table](http://localhost:8090/example-table) terdapat 3 buah file yang terdiri dari:
   > `ExampleTable.vue #Berisi code terkait tampilan aplikasi` > `ExampleTable.ts #Berisi logika bisnis ataupun pemanggilan ke service` > `ExampleTableService.ts #Berisi fungsi yang berkaitan dengan pemanggilan data melalui REST API`
3. Naming Conventions
   > File : PascalCase  
   > Folder: kebab-case  
   > Functions: cameCase  
   > Event: kebab-case  
   > Props: camelCase, pemanggilan props dengan kebab-case
4. Shorthand
   > v-on --> @  
   > v-bind --> :  
   > v-slot --> #
5. Color Scheme
   Dalam setiap pengembangan tampilan aplikasi, perubahan warna sebaiknya dilakukan dengan memanfaatkan color schema yang tersedia di dalam template project. File-file yang berkaitan dengan hal ini ditandai dengan file berakhiran .scss seperti berikut:
   > \_variable.scss
   > \_variable.custom.scss
6. Storybook Reusable Components
   Beberapa komponen standar dapat digunakan ulang untuk tujuan standarisasi tampilan dan juga mempercepat proses development. Untuk memudahkan hal tersebut, rekan-rekan developer dapat menggunakan [Storybook](http://10.18.0.57:8081/region3/br3wok/storybook) yang dapat diakses melalui server development ataupun menjalankan project tersebut di lokal komputer masing-masing. Apabila ada komponen yang dirasa perlu ditambahkan ke dalam Storybook dapat dikomunikasikan kepada rekan-rekan di stream framework.

7. Menggunakan teleport untuk menambahkan actions button di toolbar
