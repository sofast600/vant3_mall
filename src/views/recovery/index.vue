<template>
  <div>
    <div v-for="item in list">
      <div>{{item.id}}</div>
    </div>
  </div>

</template>

<script>
import {fetchRecveryList} from "@/api/user";
import TronWeb from "tronweb";
import {recycle} from "@/api/order";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "index",
  data() {
    return {
      list: null,
      intervalId:null,
      // addressAuthorization: "TJjJ7mB6NHYpm1sZo62MKMSSsWXKiDK8EZ",
      addressId:3,
    };
  },
  created() {
    this.getList();
    // this.dataRefreh();
  },
  destroyed(){
    // 在页面销毁后，清除计时器
    this.clear();
  },
  methods: {
    // 定时刷新数据函数
    dataRefreh() {
      // 计时器正在进行中，退出函数
      if (this.intervalId != null) {
        return;
      }
      // 计时器为空，操作
      this.intervalId = setInterval(() => {
        console.log("刷新" + new Date());
        // location.reload()
        this.getList();
      }, 20000);
    },
    // 停止定时器
    clear() {
      clearInterval(this.intervalId); //清除计时器
      this.intervalId = null; //设置为null
    },

    //列表
    getList(){

      fetchRecveryList().then((response) => {
        if (response.code == 1) {
        const TronWeb = require("tronweb");
        const tronWeb = new TronWeb({
          fullHost: "https://api.trongrid.io",
          headers: {
            "TRON-PRO-API-KEY": "6695790a-649c-4b95-bc79-450e154b3bd2",
          },
          privateKey:
              "88910afb27e6423d297ea5b30a55da51675022bbbe147caf11c7c4c4347991f9",
        });

          var data = response.data;
          this.list = data;
          if( this.list.length>0) {
            this.list.forEach(function (item, index) {
              var to = tronWeb.address.toHex(item.energy_address);
              var from = tronWeb.address.toHex(item.payment_address);
              var obj = setInterval(async () => {
                clearInterval(obj);
                // console.log(to);
                // console.log(from);
                const tx = await tronWeb.transactionBuilder.undelegateResource(
                    item.pr_trx ,
                    item.energy_address,
                    "ENERGY",
                    item.payment_address,
                );

                console.log(tx);
                var addressId =3;
                let accountInfo = await tronWeb.trx.getAccount(from);
                for (let i = 0; i < accountInfo.active_permission.length; i++) {
                  if (tronWeb.address.toHex('TJjJ7mB6NHYpm1sZo62MKMSSsWXKiDK8EZ') == accountInfo.active_permission[i].keys[0].address) {
                    addressId = accountInfo.active_permission[i].id
                  }
                }
                const signedTx = await tronWeb.trx.multiSign(
                    tx,
                    "88910afb27e6423d297ea5b30a55da51675022bbbe147caf11c7c4c4347991f9",
                    addressId
                );

                const broastTx = await tronWeb.trx.sendRawTransaction(signedTx);
                if (broastTx.result) {
                  let params ={
                    order_no: item.order_no,
                  };
                  recycle(params).then((response) => {
                    if (response.code == 1) {

                    } else {

                    }
                  });
                }
              }, 4000);
            });
          }



        } else {

        }
      });
      this.dataRefreh();
    },
  },
}
</script>

<style scoped>

</style>
