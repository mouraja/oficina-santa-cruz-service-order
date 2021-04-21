
biddings: [];
owners: [];

function findBidding(id) {
  return findBiddingKey(id);
};

function findBiddingKey(id) {
  return (this.biddings.find(key => key.id === id));
};

function findItem(id, list) {
  return (list.find(key => key.id === id));
};

const BiddingService = {
  base_url: 'http://localhost:8080/api/manager/bidding/',
  base_client: 'http://localhost:8080/api/manager/client/public/',

  findAll(fn) {
    axios
            .get(this.base_url, {
              'headers': {
                "Content-type": "application/json"
              }
            })
            .then(response => fn(response))
            .catch(error => console.log(error));
  },

  findById(id, fn) {
    axios
            .get(this.base_url + id, {
              'headers': {
                "Content-type": "application/json"
              }
            })
            .then(response => fn(response))
            .catch(error => console.log(error));
  },

  create(bidding, fn) {
    axios
            .post(this.base_url, bidding)
            .then(response => fn(response))
            .catch(error => console.log(error));
  },

  update(id, bidding, fn) {
    axios
            .put(this.base_url + id, bidding)
            .then(response => fn(response))
            .catch(error => console.log(error));
  },

  delete(id, fn) {
    axios
            .delete(this.base_url + id)
            .then(response => fn(response))
            .catch(error => console.log(error));
  },

  findClients(fn) {
    axios
            .get(this.base_client, {
              'headers': {
                'Content-type': 'application/json'
              }
            })
            .then(response => fn(response))
            .catch(error => console.log(error));
  }

};

const BiddingList = Vue.extend({
  template: '#bidding-list',
  data: function () {
    return {biddings: [], searchKey: ''};
  },
  computed: {
    filteredBiddings() {
      return this.biddings.filter((bidding) => {
        return  bidding.status && (
                    bidding.alias.indexOf(this.searchKey) > -1 ||
                    bidding.description.indexOf(this.searchKey) > -1
                );
      });
    }
  },
  mounted() {
    this.$data.subtitle = "Biddings List";
    BiddingService.findAll(r => {
      this.biddings = r.data;
      biddings = r.data;
    });
  }
});

const BiddingView = Vue.extend({
  template: '#bidding-view',
  data: function () {
    return {bidding: findBidding(this.$route.params.bidding_id)};
  },
  mounted() {
    this.$data.subtitle = "Bidding View";
  }
});

const BiddingEdit = Vue.extend({
  template: '#bidding-edit',
  data: function () {
    return {
      bidding: findBidding(this.$route.params.bidding_id),
      owners: []
    };
  },
  methods: {
    updateBidding: function () {
        BiddingService.update(this.bidding.id, this.bidding, r => router.push('/'));
    },
    async listClients() {
      await BiddingService.findClients(r => {
        this.owners = r.data;
        owners = r.data;
      });
    }
  },
  mounted() {
    this.$data.subtitle = "Bidding Edit";
  },
  created() {
    this.listClients();
  }
});

const BiddingDelete = Vue.extend({
  template: '#bidding-delete',
  data: function () {
    return {bidding: findBidding(this.$route.params.bidding_id)};
  },
  methods: {
    deleteBidding: function () {
      BiddingService.delete(this.bidding.id, r => router.push('/'));
    }
  },
  mounted() {
    this.$data.subtitle = "Bidding Delete";
  }
});

const BiddingAdd = Vue.extend({
  template: '#bidding-add',
  data() {
    return {
      bidding: {
        alias: '',
        description: '',
        initialDate: '',
        expirateDate: null,
        observations: null,
        status: false
/*
        clientOwner: {
            id: 0,
            publicName: '',
            fantasyName: '',
            observations: '',
            status: ''
        },
*/
      },
      owners: []
    };
  },
  methods: {
    createBidding() {
      BiddingService.create(this.bidding, r => router.push('/'));
    }
    /*
    ,
    async listClients() {
      await BiddingService.findClients(r => {
        this.owners = r.data;
        owners = r.data;
      });
    }
    */
  },
  /*
  created() {
    this.listClients();
  },
*/
  mounted() {
    this.$data.subtitle = "Add Bidding";
  }
});

const router = new VueRouter({
  routes: [
    {path: '/', component: BiddingList},
    {path: '/bidding/view/:bidding_id', component: BiddingView, name: 'bidding-view'},
    {path: '/bidding/add', component: BiddingAdd, name: 'bidding-add'},
    {path: '/bidding/edit/:bidding_id', component: BiddingEdit, name: 'bidding-edit'},
    {path: '/bidding/edit/:bidding_id', component: BiddingDelete, name: 'bidding-delete'}
  ]
});

/*
 const ClientList = new Vue({
 el: 'add-client-owner',
 data: () => ({
 clients: []
 }),
 methods: {
 async getClients() {
 await BiddingService.listClients(r => {
 this.clients = r.data;
 clients = r.data;
 });
 }
 },
 created() {
 this.getClients;
 }
 });
 */

new Vue({
  el: '#app',
  data: {
    company: "Oficina Santa Cruz",
    title: "Bidding Managment",
    subtitle: ""
  },
  router: router
});
