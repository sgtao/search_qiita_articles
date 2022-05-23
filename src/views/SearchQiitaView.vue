<template>
  <div class="search-qiita">
    <h1>SearchQiita</h1>
    <div id="app">
      <p>検索ワード：
        <input type="text" v-model="keyword">
      </p>
      <hr>
      <div>
        <p>{{ message }}</p>
        <ul class="searched-items">
          <li v-for="(item, key) in items" :key="key">
            <a v-bind:href="item.url" target="_blank">
              {{ item.title }}
            </a>
            likes: {{ item.likes_count }}
          </li>
        </ul>
      </div>
      <hr>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import axios from 'axios';
// @ is an alias to /src
export default {
  name: 'SearchQiitaView',
  data: () => ({ // define binded data
    items: null,
    keyword: '',
    message: ''
  }),
  watch: { // define watched data
    keyword: function (newKeyword) {
      console.log(newKeyword)
      this.message = 'Waiting for you to stop typing...'
      // 入力の遅延
      this.debouncedGetAnswer()
    }
  },
  mounted: function () { // define first process at mount
    this.keyword = 'Vue3'
    this.getAnswer()
    // 
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 2000)
  },
  methods: { // define methods 
    // APIからデータを取得する
    getAnswer: function () {
      // 検索キーワードが空だと終了、短すぎても
      if (this.keyword === '') {
        console.log('blank keyword')
        this.item = null
        return
      } else if (this.keyword.length < 3) {
        console.log('too short')
        this.item = null
        return
      }
      // 入力されていたら、メッセージを設定し、APIを実行
      // refer to Qiita : https://qiita.com/api/v2/docs
      // データ取得は、`GET /api/v2/items?page=1&per_page=20 HTTP/1.1`
      this.message = 'Loading...'
      const vm = this
      const params = { page: 1, per_page: 20, query: this.keyword }
      const acc_url = 'https://qiita.com/api/v2/items?'
      axios.get(acc_url, { params })
        .then(function (res) { // レスポンスが返ったとき
          console.log(res) 
          vm.items = res.data
        })
        .catch(function (error) { // エラー発生時、
          vm.message = 'Error! ' + error // 
        })
        .finally(function () { // 全処理終了時、
          vm.message = '' // メッセージを空にする
        })
    },
  },
}
</script>
<style scoped>
.search-qiita {
  margin: 0 auto;
  width: 90%;
  max-width: 60rem;
}
.searched-items li {
  list-style: none;
}
</style>