import Vue from 'vue'
import Vuetable from './components/Vuetable.vue'
import VuetablePagination from './components/VuetablePagination.vue'
import VuetablePaginationDropdown from './components/VuetablePaginationDropdown.vue'
import VuetablePaginationInfo from './components/VuetablePaginationInfo.vue'
import axios from 'axios'

let E_SERVER_ERROR = 'Error communicating with the server'

Vue.component('custom-actions', {
  template: [
    '<div>',
      // '<button class="ui red button" @click="onClick(\'Card\', rowData)"><i class="zoom icon"></i></button>',
      '<button class="ui blue button" @click="onClick(\'edit-item\', rowData)"><i class="edit icon"></i></button>',
      '<button class="ui green button" @click="onClick(\'delete-item\', rowData)"><i class="delete icon"></i></button>',
    '</div>'
  ].join(''),
  props: {
    rowData: {
      type: Object,
      required: true
    }
  },
  methods: {
    onClick (action, data) {
      var options = {
        title: '',
        text: '<img src="./static/'+data.ImgUrl+'">',
        html: true
      };
      sweetAlert(options)
    },
  }
})

Vue.component('ImgShow', {
  template: [
    '<div>',
      '<button class="ui red button" @click="onClick(rowData)"><i class="zoom icon"></i></button>',
    '</div>'
  ].join(''),
  props: {
    rowData: {
      type: Object,
      required: true
    }
  },
  methods: {
    onClick (data) {
      var options = {
        title: '',
        text: '<img src="./static/'+data.ImgUrl+'">',
        html: true
      };
      sweetAlert(options)
    },
  }
})

Vue.component('my-detail-row', {
  template: [
    '<div @click="onClick">',
      '<div class="inline field">',
      //   '<label>球員名稱: </label>',
      //   '<span>{{rowData.球員名稱}}</span>',
      // '</div>',
      // '<div class="inline field">',
      //   '<label>年度月份: </label>',
      //   '<span>{{rowData.年度月份}}</span>',
      // '</div>',
      // '<div class="ui card">',
      //   '<div class="image">',
      //     '<img src="http://img.ltn.com.tw/Upload/sports/page/800/2017/09/30/phpbW0JNN.jpg">',
      //   '</div>',
      //   '<div class="content">',
      //     '<a class="header">{{rowData.球員名稱}}</a>',
      //     '<div class="meta">',
      //       '<span class="date">{{rowData.年度月份}}</span>',
      //     '</div>',
      //     '<div class="description">',
      //       'Kristy is an art director living in New York.',
      //     '</div>',
      //   '</div>',
      //   '<div class="extra content">',
      //     '<a>',
      //       '<i class="user icon"></i>',
      //       '22 Friends',
      //     '</a>',
          '<div class="ui items">',
            '<div class="item">',
              '<div class="image">',
                   // '<img src="./static/'+{{rowData.ImgUrl}}+'">',
                '<img src=./static/{rowData.ImgUrl}>',
                  // '{{rowData.ImgUrl}}',
              '</div>',
              '<div class="content">',
                '<a class="header">{{rowData.球員名稱}}</a>',
                '<div class="meta">',
                  '<a class="ui teal label">打擊L /R',
                    '<div class="detail">{{rowData.打擊L}} / {{rowData.打擊R}}</div>',
                  '</a>',
                '</div>',
                '<div class="meta">',
                  '<a class="ui red label">力量',
                    '<div class="detail">{{rowData.力量}}</div>',
                  '</a>',
                '</div>',
                '<div class="meta">',
                  '<a class="ui brown label">選球',
                    '<div class="detail">{{rowData.選球}}</div>',
                  '</a>',
                '</div>',
                '<div class="meta">',
                  '<a class="ui blue label">跑壘',
                    '<div class="detail">{{rowData.跑壘}}</div>',
                  '</a>',
                '</div>',
                '<div class="meta">',
                  '<a class="ui yellow label">守備',
                    '<div class="detail">{{rowData.守備}}</div>',
                  '</a>',
                '</div>',
                '<div class="meta">',
                  '<a class="ui green label">傳球',
                    '<div class="detail">{{rowData.傳球}}</div>',
                  '</a>',
                '</div>',
                // '<div class="meta">',
                //   '<span>Description</span>',
                // '</div>',
                // '<div class="description">',
                //   '<p></p>',
                // '</div>',
                // '<div class="extra">',
                //   'Additional Details',
                // '</div>',
              '</div>',
            '</div>',
          '</div>',
        '</div>',
    '</div>'
  ].join(''),
  props: {
    rowData: {
      type: Object,
      required: true
    }
  },
  methods: {
    onClick (event) {
      console.log('my-detail-row: on-click', event.target)
    }
  },
})

Vue.component('edit-modal', {
  template: `
      <form class="ui large modal" id="editModal">
        <h4 class="ui dividing header">新增
            <button class="ui primary button" type="submit">新增</button>
            <button class="ui cancel button" type="cancel">取消</button>
        </h4>
        <div class="four fields">
          <div class="field">
            <div class="ui left icon input">
              <input type="text" placeholder="輸入球員名稱" ref="playerName">
            </div>
            <div class="ui search selection dropdown" >
              <div class="default text">卡片類型</div>
                <div class="menu">
                  <div class="item" v-for="playerlevel in playerlevelList" :data-value="playerlevel.ID" >
                    {{playerlevel.LevelNameCN}}
                  </div>
                </div>
              </div>
            <div class="ui left icon input">
              <select class="ui fluid dropdown">
                  <option value="">年度</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                  <option value="2013">2013</option>
              </select>
            </div>
            <div class="ui left icon input" id="month" >
              <select class="ui fluid dropdown">
                  <option value="">月份</option>
                  <option :value="n"   v-for= "n in 12">{{n}}</option>
              </select>
            </div>
            <label for="file" class="ui icon button" v-if="!image">
              <i class="file icon"></i>
              Load Picture</label>
              <input type="file" id="file" @change="onFileChange" style="display:none" v-if="!image">
              <div class="ui left" v-else>
                <button class="ui icon button" @click="removeImage" ><i class="remove icon"></i></button>
                <img class="ui medium right floated image" :src="image" />
              </div>
            </div>
          </div>
        </div>
        <div class="fields">
          <div class="field">
            <div class="ui labeled input" >
              <div class="ui label" >L打擊</div>
              <input type="text" placeholder="輸入L打擊數值" ref="HitL">
            </div>
            <div class="ui labeled input">
              <div class="ui label">R打擊</div>
              <input type="text" placeholder="輸入R打擊數值" ref="HitR">
            </div>
          </div>
          <div class="field">
            <div class="ui labeled input">
              <div class="ui label">力量</div>
              <input type="text" placeholder="輸入力量數值" ref="Pow">
            </div>
            <div class="ui labeled input">
              <div class="ui label">選球</div>
              <input type="text" placeholder="輸入選球數值" ref="Eye">
            </div>
          </div>
          <div class="field">
            <div class="ui labeled input">
              <div class="ui label">跑壘</div>
              <input type="text" placeholder="輸入跑壘數值" ref="Agi">
            </div>
            <div class="ui labeled input">
              <div class="ui label">守備</div>
              <input type="text" placeholder="輸入守備數值" ref="Def">
            </div>
          </div>
          <div class="field">
            <div class="ui labeled input">
              <div class="ui label">傳球</div>
              <input type="text" placeholder="輸入傳球數值" ref="Pass">
            </div>
            <div class="ui labeled input">
              <div class="ui label">總評</div>
              <input type="text" placeholder="總評試算" ref="Ev" disabled="true" >
              <div class="ui corner label">
                <i class="asterisk icon"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="ui checkbox">
            <input type="checkbox" tabindex="0" class="hidden">
            <label>I agree to the Terms and Conditions</label>
          </div>
        </div>
      </form>
  `,
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.image = '';
    }
  },
  mounted() {
    //get postion list
    axios.get("/api/dposition?Type=F")
      .then(response => {this.postionList = response.data.data})
    //get playerlevel list
    axios.get("/api/playerlevel")
      .then(response => {this.playerlevelList = response.data.data})
    //get team list
    axios.get("/api/team")
      .then(response => {this.teamList = response.data.data})
    // start dropdown 
    $('.ui .dropdown')
      .dropdown()
    },
  data : function () {
  return {
    postionList: [],
    playerlevelList: [],
    teamList: [],
    searchData: [],
    selectteam: [],
    image: ''
  }
}
})

Vue.component('filter-modal', {
  template: `
    <div class="ui small modal" id="filterModal">
      <h4 class="ui dividing header">篩選</h4>
      <div class="field">
        <label class="ui large label">
          <i class="filter icon"></i>
          球員姓名
        </label>
        <div class="ui left icon input">
          <input type="text" placeholder="輸入欲尋找的球員名稱" ref="playerName">
          <i class="users icon"></i>
        </div>
      </div>
      <div class="field">
        <label class="ui large label">
          <i class="filter icon"></i>
          守備位置
        </label>
        <div  class="ui search multiple selection dropdown" id="selectedPostion" ref="selectedPostion">
          <div class="default text">全部守備位置</div>
            <div class="menu">
              <div class="item" v-for="postion in postionList" :data-value="postion.ID" >
                {{postion.PositionNameCN}}
              </div>
            </div>
        </div >
      </div>
      <div class="field"> 
        <label class="ui large label">
          <i class="filter icon"></i>
          隊伍
        </label>
        <div class="ui search multiple selection dropdown" id="selectedTeam" ref="selectedTeam">
          <div class="default text">全部隊伍</div>
            <div class="menu" >
              <div class="item" v-for="team in teamList" :data-value="team.ID" >
                {{team.TeamNameCN}}
              </div>
            </div>
        </div>
      </div>
      <div class="field"> 
        <label class="ui large label">
          <i class="filter icon"></i>
          卡片類型
        </label>
        <div  class="ui search multiple selection dropdown" id="selectedLevel" ref="selectedLevel">
          <div class="default text">全部類型</div>
            <div class="menu">
              <div class="item" v-for="playerlevel in playerlevelList" :data-value="playerlevel.ID" >
                {{playerlevel.LevelNameCN}}
              </div>
            </div>
        </div>
      </div>
      <div class="field">
        <label class="ui large label">
            <i class="filter icon"></i>
            姿勢
        </label>
        <div class="ui slider checkbox" id="selectedStyle" ref="selectedStyle">
          <input type="checkbox">
        </div>
      </div>

      <div class="actions">
        <div class="ui cancel button" @click="filterSearch"><i class="search icon"></i>Search</div>
        <div class="ui cancel button"><i class="cancel icon"></i>Close</div>
      </div>
    </div>
  `,
  // <div class="ui form">
  //       <div class="inline fields">
  //         <label class="ui large label">
  //           <i class="filter icon"></i>
  //           姿勢
  //         </label>
  //         <div class="field">
  //           <div class="ui radio checkbox">
  //             <input type="radio" name="frequency" checked="checked" val="all">
  //             <label>兩者皆可</label>
  //           </div>
  //         </div>
  //         <div class="field">
  //           <div class="ui radio checkbox">
  //             <input type="radio" name="frequency" val="Y">
  //             <label>有</label>
  //           </div>
  //         </div>
  //         <div class="field">
  //           <div class="ui radio checkbox">
  //             <input type="radio" name="frequency" val="N">
  //             <label>無</label>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  methods: {
    filterSearch(){
      var playerName = this.$refs.playerName.value;
      var selectedStyle = $('#selectedStyle').checkbox('is checked');
      console.log('selectedStyle',selectedStyle);
      var selectedPosition = $('#selectedPostion')
        .dropdown('get value')
      ;
      var selectedTeam = $('#selectedTeam')
        .dropdown('get value')
      ;
      var selectedLevel = $('#selectedLevel')
        .dropdown('get value')
      ;
        vm.moreParams.player = playerName;
        vm.moreParams.team = selectedTeam;
        vm.moreParams.position = selectedPosition;
        vm.moreParams.playerlevel = selectedLevel;
        vm.moreParams.style=selectedStyle;
        vm.$refs.vuetable.refresh();
    }
  },
  mounted() {
    //get postion list
    axios.get("/api/dposition?Type=F")
      .then(response => {this.postionList = response.data.data})
    //get playerlevel list
    axios.get("/api/playerlevel")
      .then(response => {this.playerlevelList = response.data.data})
    //get team list
    axios.get("/api/team")
      .then(response => {this.teamList = response.data.data})
    // start dropdown 
    $('.ui .dropdown')
      .dropdown()
    },
  data : function () {
  return {
    postionList: [],
    playerlevelList: [],
    teamList: [],
    searchData: [],
    selectteam: []
  }
}
})

Vue.component('settings-modal', {
  template: `
    <div class="ui small modal" id="settingsModal">
      <div class="header">Settings</div>
      <div class="content ui form">
        <div class="field">
          <label>每頁顯示筆數:</label>
          <select class="ui simple dropdown" v-model="$parent.perPage">
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="30">20</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
          </select>
        </div>
        <div class="ui fluid card">
          <div class="content">
            <div class="header">顯示欄位</div>
          </div>
          <div v-if="vuetableFields" class="content">
            <div v-for="(field, idx) in vuetableFields" class="field">
              <div class="ui checkbox">
                <input type="checkbox" :checked="field.visible" @change="toggleField(idx, $event)">
                <label>{{ getFieldTitle(field) }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="actions">
        <div class="ui cancel button">Close</div>
      </div>
    </div>
  `,
  props: ['vuetableFields'],
  data () {
    return {
    }
  },
  methods: {
    getFieldTitle (field) {
      if (typeof(field.title) === 'function') return field.title(true)

      let title = field.title
      if (title !== '') return this.stripHTML(title)

      title = ''
      if (field.name.slice(0, 2) === '__') {
        title = field.name.indexOf(':') >= 0
          ? field.name.split(':')[1]
          : field.name.replace('__', '')
      }

      return title
    },
    stripHTML (str) {
      return str ? str.replace(/(<([^>]+)>)/ig,"") : ''
    },
    toggleField (index, event) {
      console.log('toggleField: ', index, event.target.checked)
      this.$parent.$refs.vuetable.toggleField(index)
    },
    setTableHeight (event) {
      if (event.target.checked) {
        this.$parent.tableHeight = '600px'
        return
      }

      this.$parent.tableHeight = null
    }
  }
})

let lang = {
  'nickname': 'Nickname',
  'birthdate': 'Birthdate',
}

let tableColumns = [
  // { name: '__handle',
  //   width: '50px'
  // },
  {
    name: '__sequence',
    title: 'No.',
    titleClass: 'right aligned',
    dataClass: 'right aligned',
    width: '50px'
  },
  // {
  //   name: '__checkbox',
  //   width: '30px',
  //   title: 'checkbox',
  //   titleClass: 'center aligned',
  //   dataClass: 'center aligned'
  // },
  // {
  //   name: 'id',
  //   title: '<i class="unordered list icon"></i> 詳細',
  //   dataClass: 'center aligned',
  //   width: '100px',
  //   callback: 'showDetailRow'

  // },
  {
    name: '球員名稱',
    title: ' 球員名稱',
    sortField: 'PlayerName',
    titleClass: 'center aligned',
    dataClass: 'center aligned',
    width: '100px',
    callback: 'mouseMove'
  },
  // {
  //   name: '__component:ImgShow',
  //   title: '照片',
  //   titleClass: 'center aligned',
  //   dataClass: 'center aligned',
  //   width: '62px'
  // },
  // {
  //   name: '__component:custom-actions',
  //   title: 'Actions',
  //   titleClass: 'center aligned',
  //   dataClass: 'center aligned',
  //   width: '150px'
  // },
  {
    name: '卡片等級',
    title: ' 卡片等級',
    sortField: 'LevelName',
    callback: 'cardLevel',
    titleClass: 'center aligned',
    dataClass: 'center aligned',
    width: '120px',
  },
  {
    name: '評價',
    title: ' 評價',
    sortField: 'Ev',
    titleClass: 'center aligned',
    dataClass: 'center aligned',
    callback: 'evFormat', 
    width: '62px'
  },
  {
    name: '年度月份',
    title: ' 年度月份',
    sortField: 'YearMonth',
    titleClass: 'center aligned',
    dataClass: 'center aligned',
    width: '90px'
  },
  {
    name: '打擊L',
    title: ' 打擊L',
    sortField: 'HitL',
    titleClass: 'center aligned',
    dataClass: 'center aligned',
    width: '62px'
  },
  {
    name: '打擊R',
    title: ' 打擊R',
    sortField: 'HitR',
    titleClass: 'center aligned',
    dataClass: 'center aligned',
    width: '62px'
  },
  {
    name: '力量',
    title: ' 力量',
    sortField: 'Pow',
    titleClass: 'center aligned',
    dataClass: 'center aligned',
    width: '62px'
  },
  {
    name: '選球',
    title: ' 選球',
    sortField: 'Eye',
    titleClass: 'center aligned',
    dataClass: 'center aligned',
    width: '62px'
  },
  {
    name: '跑壘',
    title: ' 跑壘',
    sortField: 'Agi',
    titleClass: 'center aligned',
    dataClass: 'center aligned',
    width: '62px'
  },
  {
    name: '守備',
    title: ' 守備',
    sortField: 'Def',
    titleClass: 'center aligned',
    dataClass: 'center aligned',
    width: '62px'
  },
  {
    name: '傳球',
    title: ' 傳球',
    sortField: 'Pass',
    titleClass: 'center aligned',
    dataClass: 'center aligned',
    width: '62px'
  },
  {
    name: '隊伍',
    title: ' 隊伍',
    sortField: 'Team',
    callback: 'teamColor',
    titleClass: 'center aligned',
    dataClass: 'center aligned',
    width: '90px',
  },
  // {
  //   name: '守位',
  //   title: ' 守位',
  //   sortField: '守位',
  //   width: '90px',
  // },
  {
    name: '守備適性',
    title: ' 守備適性',
    sortField: 'Dpv',
    callback: 'formateDefValue',
    titleClass: 'center aligned',
    dataClass: 'center aligned',
    width: '90px',
  },
  {
    name: '姿勢',
    title: ' 姿勢',
    sortField: 'Style',
    titleClass: 'center aligned',
    dataClass: 'center aligned',
    callback: 'styleFormat',
    width: '62px'
  }

  // {
  //   name: 'name',
  //   title: '<i class="book icon"></i> name',
  //   sortField: 'name',
  //   width: '150px'
  // },
  // {
  //   name: 'email',
  //   title: '<i class="mail outline icon"></i> Email',
  //   sortField: 'email',
  //   width: '200px',
  //   dataClass: "vuetable-clip-text",
  //   visible: true
  // },
  // {
  //   name: 'nickname',
  //   title: (nameOnly = false) => {
  //     return nameOnly
  //       ? lang['nickname']
  //       : `<i class="paw icon"></i> ${lang['nickname']}`
  //   },
  //   sortField: 'nickname',
  //   callback: 'allCap',
  //   width: '120px'
  // },
  // {
  //   name: 'birthdate',
  //   title: (nameOnly = false) => {
  //     return nameOnly
  //       ? lang['birthdate']
  //       : `<i class="orange birthday icon"></i> ${lang['birthdate']}`
  //   },
  //   sortField: 'birthdate',
  //   width: '100px',
  //   callback: 'formatDate|D/MM/Y'
  // },
  // {
  //   name: 'gender',
  //   title: 'Gender',
  //   sortField: 'gender',
  //   titleClass: 'center aligned',
  //   dataClass: 'center aligned',
  //   callback: 'gender',
  //   width: '100px',
  // },
]

/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationDropdown,
    VuetablePaginationInfo,
  },
  data: {
    loading: '',
    searchFor: '',
    moreParams: { team: 'all' ,position: 'all',playerlevel: 'all', player:'all' , style : 'false'},
    fields: tableColumns,
    tableHeight: '600px',
    vuetableFields: false,
    sortOrder: [{
        field: 'ev',
        direction: 'desc',
    }],
    multiSort: true,
    paginationComponent: 'vuetable-pagination',
    perPage: 10,
    // position: 10,
    // team: '1,2',
    paginationInfoTemplate: 'Showing record: {from} to {to} from {total} item(s)',
    lang: lang,
  },
  watch: {
    'perPage' (val, oldVal) {
      this.$nextTick(function() {
        this.$refs.vuetable.refresh()
      })
    },
    'paginationComponent' (val, oldVal) {
      this.$nextTick(function() {
        this.$refs.pagination.setPaginationData(this.$refs.vuetable.tablePagination)
      })
    }
  },
  methods: {
    transform (data) {
      console.log("transform data=>",data);
      let transformed = {}
      transformed.pagination = {
        total: data.total,
        per_page: data.per_page,
        current_page: data.current_page,
        last_page: data.last_page,
        next_page_url: data.next_page_url,
        prev_page_url: data.prev_page_url,
        from: data.from,
        to: data.to
      }
      // transformed.pagination = {
      //   total: 1,
      //   per_page: 15,
      //   current_page: 1,
      //   last_page: 20,
      //   next_page_url: null,
      //   prev_page_url: null,
      //   from: 1,
      //   to: 10
      // }

      transformed.data = []
      data = data.data
      // console.log('data###########=>',data)
      // for (let i = 0; i < data.length; i++) {
      //   transformed['data'].push({
      //     id: data[i].id,
      //     name: data[i].name,
      //     nickname: data[i].nickname,
      //     email: data[i].email,
      //     age: data[i].age,
      //     birthdate: data[i].birthdate,
      //     gender: data[i].gender,
      //     address: data[i].address.line1 + ' ' + data[i].address.line2 + ' ' + data[i].address.zipcode
      //   })
      // }
      for (let i = 0; i < data.length; i++) {
        transformed['data'].push({
          id: data[i].id,
          球員名稱: data[i].球員名稱,
          年度月份: data[i].年度月份,
          打擊L: data[i].打擊L,
          打擊R: data[i].打擊R,
          力量: data[i].力量,
          選球: data[i].選球,
          跑壘: data[i].跑壘,
          守備: data[i].守備,
          傳球: data[i].傳球,
          評價: data[i].評價,
          卡片等級: data[i].卡片等級,
          隊伍: data[i].隊伍,
          // 守位: data[i].守位,
          守備適性: data[i].守備適性,
          姿勢: data[i].姿勢,
          ImgUrl: data[i].ImgUrl
        })
      }
      // console.log('transformed=>',transformed);
      return transformed
    },
    showSettingsModal () {
      let self = this
      $('#settingsModal').modal({
        detachable: true,
        onVisible () {
          $('.ui.checkbox').checkbox()
        }
      }).modal('show')
    },
    showFilterModal () {
      let self = this
      $('#filterModal').modal({
        detachable: true,
        onVisible () {
          $('.ui.checkbox').checkbox()
        }
      }).modal('show')
    },
    showEditModal () {
      let self = this
      $('#editModal').modal({
        detachable: true,
        onVisible () {
          $('.ui.checkbox').checkbox()
        }
      }).modal('show')
    },
    showLoader () {
      this.loading = 'loading'
    },
    hideLoader () {
      this.loading = ''
    },
    allCap (value) {
      return value.toUpperCase()
    },
    formatDate (value, fmt) {
      if (value === null) return ''
      fmt = (typeof(fmt) === 'undefined') ? 'D MMM YYYY' : fmt
      return moment(value, 'YYYY-MM-DD').format(fmt)
    },
    mouseMove(value){
      //@click="onClick(\'view-item\', rowData)"
      return '<span @click="clickEvent">'+value+'</span>'
    },
    styleFormat(value){
      if(value == 'Y' ){
        return '<i class="checkmark icon"></i>'
      }else{
        return '<i class="remove icon"></i>'
      }
    },
    evFormat(value){
      if(value < 60 ){
        return '<span class="ui teal label">'+value+'</span>'
      }else if(value > 60 && value <70){
        return '<span class="ui green label">'+value+'</span>'
      }else if(value > 70 && value <80){
        return '<span class="ui yellow label">'+value+'</span>'
      }else if(value > 80 && value <90){
        return '<span class="ui red label">'+value+'</span>'
      }else if(value > 90 ){
        return '<span class="ui purple label">'+value+'</span>'
      }
    },
    teamColor (value) {
      switch(value){
        case 'Brother':
            return '<span class="ui yellow label">'+value+'</span>'
        case 'Fubon Guardians':
            return '<span class="ui blue label">'+value+'</span>'
        case 'Lamigo Monkeys':
            return '<span class="ui teal label">'+value+'</span>'
        case 'Uni Lion':
            return '<span class="ui orange label">'+value+'</span>'
        case 'B':
            return '<span class="ui yellow label">'+value+'</span>'
        case 'FG':
            return '<span class="ui blue label">'+value+'</span>'
        case 'LM':
            return '<span class="ui teal label">'+value+'</span>'
        case 'UL':
            return '<span class="ui orange label">'+value+'</span>'
        default:
            return value
          break;
      }
    },
    cardLevel (value) {
      switch(value){
        case 'Basic Player':
            return '<span class="ui black label">Basic Player</span>'
        case 'Star':
            return '<span class="ui white label">Star</span>'
        case 'Season Best':
            return '<span class="ui blue label">Season Best</span>'
        case 'MVP Award':
            return '<span class="ui red label">MVP Award</span>'
        case 'All Star':
            return '<span class="ui purple label">All Star</span>'
        case 'TOP':
            return '<span class="ui black label">TOP</span>'
        case 'TW-APBC':
            return '<a class="ui label"><i class="tw flag"></i>APBC</a>'
          break;
      }
    },
    formateDefValue (value) {
      var detValue = '';
      var valueLevel = ['S','A','B','C','D','E','F'];
      var values = value.split(",");
      for(let level of valueLevel){
        for(let val of values){
        var ability = val.split("-")[1];
          if(level == ability){
            switch(ability){
            case 'S':
                detValue +='<span class="ui purple label">'+val+'</span>'
              break;
            case 'A':
                detValue += '<span class="ui red label">'+val+'</span>'
              break;
            case 'B':
                detValue += '<span class="ui orange label">'+val+'</span>'
              break;
            case 'C':
                detValue += '<span class="ui yellow label">'+val+'</span>'
              break;
            case 'D':
                detValue += '<span class="ui brown label">'+val+'</span>'
              break;
            case 'E':
                detValue += '<span class="ui grey label">'+val+'</span>'
              break;
            case 'F':
                detValue += '<span class="ui black label">'+val+'</span>'
              break;
            default:
                detValue += '<span >'+val+'</span>'
              break;
          }
        }
          
      }
    }
      return detValue;
    },
    showDetailRow (value) {
      console.log('showDetailRow value=>',value);
      let icon = this.$refs.vuetable.isVisibleDetailRow(value) ? 'down' : 'right'
      console.log('icon=>',icon);
      return [
        '<a class="show-detail-row">',
            '<i class="chevron circle ' + icon + ' icon"></i>',
        '</a>'
      ].join('')
    },
    setFilter () {
      console.log('setFilter');
      this.moreParams['filter'] = this.searchFor
      this.$nextTick(function() {
        this.$refs.vuetable.refresh()
      })
    },
    resetFilter () {
      console.log('resetFilter');
      this.searchFor = ''
      this.setFilter()
    },
    preg_quote ( str ) {
      // http://kevin.vanzonneveld.net
      // +   original by: booeyOH
      // +   improved by: Ates Goral (http://magnetiq.com)
      // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
      // +   bugfixed by: Onno Marsman
      // *     example 1: preg_quote("$40");
      // *     returns 1: '\$40'
      // *     example 2: preg_quote("*RRRING* Hello?");
      // *     returns 2: '\*RRRING\* Hello\?'
      // *     example 3: preg_quote("\\.+*?[^]$(){}=!<>|:");
      // *     returns 3: '\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:'

      return (str+'').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
    },
    highlight (needle, haystack) {
      return haystack.replace(
        new RegExp('(' + this.preg_quote(needle) + ')', 'ig'),
        '<span class="highlight">$1</span>'
      )
    },
    rowClassCB (data, index) {
      return (index % 2) === 0 ? 'odd' : 'even'
    },
    queryParams (sortOrder, currentPage, perPage, team) {
      console.log(sortOrder, currentPage, perPage ,team);
      return {
        'sort': sortOrder[0].field + '|' + sortOrder[0].direction,
        'page': currentPage,
        'per_page': perPage
      }
    },
    onCellClicked (data, field, event) {
      console.log('cellClicked', field.name)
      if (field.name !== '__actions') {
        this.$refs.vuetable.toggleDetailRow(data.id)
      }
    },
    onCellDoubleClicked (data, field, event) {
      console.log('cellDoubleClicked:', field.name)
    },
    onCellRightClicked (data, field, event) {
      console.log('cellRightClicked:', field.name)
    },
    onLoadSuccess (response) {
      // set pagination data to pagination-info component
      this.$refs.paginationInfo.setPaginationData(response.data)
      let data = response.data;
      console.log('onLoadSuccess data=>',response.data);
      // console.log('data=>',data);
      if (this.searchFor !== '') {
        for (let n in data) {
          data[n].球員名稱 = this.highlight(this.searchFor, data[n].球員名稱)
        }
      }
    },
    onLoadError (response) {
      if (response.status == 400) {
        sweetAlert('Something\'s Wrong!', response.data.message, 'error')
      } else {
        sweetAlert('Oops', E_SERVER_ERROR, 'error')
      }
    },
    onPaginationData (tablePagination) {
      console.log('onPaginationData tablePagination',tablePagination);
      this.$refs.paginationInfo.setPaginationData(tablePagination)
      this.$refs.pagination.setPaginationData(tablePagination)
    },
    onChangePage (page) {
      console.log('onChangePage page=>',page);
      this.$refs.vuetable.changePage(page)
    },
    onInitialized (fields) {
      console.log('onInitialized', fields)
      this.vuetableFields = fields
    },
    onDataReset () {
      console.log('onDataReset')
      this.$refs.paginationInfo.resetData()
      this.$refs.pagination.resetData()
    },
  },
})
