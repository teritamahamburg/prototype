<template>
  <div class="home">
    <v-layout justify-end>
      <v-btn flat>
        <v-icon left>sort</v-icon>
        Sort
      </v-btn>
      <v-btn flat @click="viewList = !viewList">
        <v-icon left>{{!viewList ? 'view_list' : 'view_comfy'}}</v-icon>
        {{!viewList ? 'List' : 'Grid'}}
      </v-btn>
    </v-layout>

    <div v-if="viewList && showItems">
      <v-data-table hide-actions :headers="headers" :items="items">
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.number }}</td>
          <td>{{ props.item.acquisitionAt }}</td>
          <td>{{ props.item.belongs }}</td>
          <td>{{ props.item.buyer }}</td>
          <td>{{ props.item.checkedAt }}</td>
          <td>{{ props.item.place }}</td>
          <td>
            <v-btn icon @click="removeItem(props.index)">
              <v-icon>delete</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </div>
    <div v-else-if="items.length > 0 && showItems">
      <v-card v-for="(item, index) in items" :key="index" max-width="350" class="card">
        <v-img :src="item.src" height="150px" contain v-if="item.src && item.src.length > 0">
          <v-layout fill-height align-end>
            <v-card-title>
              <div style="background-color: rgba(0, 0, 0, 0.6);padding:4px;border-radius:5px">
                <span class="title white--text">{{item.name}}</span>
                <span class="grey--text text--lighten-3" style="margin-left: 16px">{{item.number}}</span>
              </div>
            </v-card-title>
          </v-layout>
        </v-img>
        <v-card-title v-else>
          <div>
            <span class="title">{{item.name}}</span>
            <span class="grey--text" style="margin-left: 16px">{{item.number}}</span>
          </div>
        </v-card-title>

        <v-list>
          <v-list-tile>
            <v-list-tile-title>取得年月日</v-list-tile-title>
            <v-list-tile-sub-title>{{item.acquisitionAt}}</v-list-tile-sub-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>所属</v-list-tile-title>
            <v-list-tile-sub-title>{{item.belongs}}</v-list-tile-sub-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>購入者</v-list-tile-title>
            <v-list-tile-sub-title>{{item.buyer}}</v-list-tile-sub-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>最終チェック日</v-list-tile-title>
            <v-list-tile-sub-title>{{item.checkedAt}}</v-list-tile-sub-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>場所</v-list-tile-title>
            <v-list-tile-sub-title>{{item.place}}</v-list-tile-sub-title>
          </v-list-tile>
        </v-list>

        <v-card-actions>
          <v-spacer />
          <v-btn outline @click="removeItem(index)">
            <v-icon>delete</v-icon>
            Remove
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <v-layout v-else fill-height justify-center align-center>
      <div class="headline">No data</div>
    </v-layout>

    <v-btn fab color="pink" dark fixed bottom right
           @click="addDialog.open = true" v-if="allowAdd">
      <v-icon>add</v-icon>
    </v-btn>

    <v-dialog v-model="addDialog.open">
      <v-card>
        <v-card-title>
          <div class="title">Add</div>
        </v-card-title>

        <v-card-text>
          <v-layout align-end justify-center>
            <v-avatar size="85" tile>
              <img src="" alt="avatar" />
            </v-avatar>
            <v-btn icon><v-icon>edit</v-icon></v-btn>
          </v-layout>
          <v-text-field v-model="addDialog.form.name" label="名前"/>
          <v-text-field v-model="addDialog.form.number" label="番号"/>
          <v-text-field v-model="addDialog.form.acquisitionAt" label="取得年月日"/>
          <v-text-field v-model="addDialog.form.belongs" label="所属"/>
          <v-text-field v-model="addDialog.form.buyer" label="購入者"/>
          <v-text-field v-model="addDialog.form.checkedAt" label="最終チェック日"/>
          <v-text-field v-model="addDialog.form.place" label="場所"/>
        </v-card-text>

        <v-card-actions>
          <v-spacer/>
          <v-btn flat @click="addDialog.open = false">Close</v-btn>
          <v-btn color="green darken-1" flat @click="clickFormAdd">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    'allow-add': {
      type: Boolean,
      default: true,
    },
    'show-items': {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      viewList: false,
      items: [
        {
          src: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/image/AppleInc/aos/published/images/m/ac/macbook/air/macbook-air-space-gray-select-201810?wid=892&hei=820&&qlt=80&.v=1541713862468',

          number: '98EF 8',
          name: 'Mac book',
          acquisitionAt: '2016/99/99',
          belongs: '基礎教育科',

          buyer: '山田 花子',
          checkedAt: '2018/12/30',
          place: '306',
        },
      ],
      addDialog: {
        open: false,
        form: {
          src: '',
          name: '',
          number: '',
          acquisitionAt: '',
          belongs: '',
          buyer: '',
          checkedAt: '',
          place: '',
        },
      },
    };
  },
  computed: {
    headers() {
      return [
        { text: '名前', value: 'name' },
        { text: '番号', value: 'number' },
        { text: '取得年月日', value: 'date' },
        { text: '所属', value: 'belongs' },
        { text: '購入者', value: 'buyer' },
        { text: '最終チェック日', value: 'checked' },
        { text: '場所', value: 'place' },
        { text: 'Actions', sortable: false, value: 'actions' },
      ];
    }
  },
  methods: {
    clickFormAdd() {
      this.addDialog.open = false;
      this.items.push({...this.addDialog.form});
      Object.keys(this.addDialog.form)
        .forEach(k => this.addDialog.form[k] = '');
    },
    removeItem(index) {
      this.items.splice(index, 1);
    },
  },
};
</script>

<style scoped>
  .home {
    width: 100%;
    height: 100%;
    padding-bottom: 72px; /* FBAボタン分 */
  }

  .card {
    margin: 8px;
  }
</style>
