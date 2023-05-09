<template>
  <div @click="getTronweb">欢迎到来</div>

</template>

<script>
import { getSublet,updateState } from "@/api/sublet";
// import TronWeb from "tronweb";
export default {
  name: "index",
  data() {
    return {
      list: null,
      orderItem: null,
    }
  },
  created() {
    // this.getList();
  },
  methods: {
    updateState() {
      updateState(this.orderItem).then((response) => {
          if (response.code == 1) {
            this.$message({
              message: "更新成功",
              type: "success",
              duration: 3000,
            });

          }
      });
    },
    //列表
    getList() {
      getSublet().then((response) => {
        if (response.code == 1) {

          const data = response.data;
          this.list = data.orderList;

            var obj = setInterval(async ()=>{
              clearInterval(obj)
              const TronWeb = require('tronweb')
              const tronweb =   new TronWeb({
                fullHost: 'https://api.trongrid.io',
                headers: { "TRON-PRO-API-KEY": '6695790a-649c-4b95-bc79-450e154b3bd2' },
                privateKey: '007d9e342be974180d655d227e724e24091797520483094811c833037739583b'
              })
              for (let i = 0; i <  this.list.length; i++) {
              var to = this.list[i].order_address
              console.log(to)
              var from =tronweb.address.toHex("TKfvwD5iPj5Z7PkH32fXxzM7FwzonDTiGd")
              const  tx= await  tronweb.transactionBuilder.delegateResource(this.list[i].number,to,'ENERGY',from)
              const signedTx = await tronweb.trx.multiSign(tx,'007d9e342be974180d655d227e724e24091797520483094811c833037739583b',3)
              console.log(signedTx)
              var broastTx = await tronweb.trx.sendRawTransaction(signedTx)
              console.log(broastTx)
              if(broastTx.result){
                this.orderItem=this.list[i]
                this.updateState()
              }
              }
            //
            }, 1000)



        } else {
          this.$message({
            message: response.info,
            type: "error",
            duration: 3000,
          });
        }
      });
    },
    getTronweb() {
      const TronWeb = require('tronweb')
      const tronweb = new TronWeb({
        fullHost: 'https://api.trongrid.io',
        headers: {"TRON-PRO-API-KEY": '6695790a-649c-4b95-bc79-450e154b3bd2'},
        privateKey: '007d9e342be974180d655d227e724e24091797520483094811c833037739583b'
      })

      // const mainOptions = new TronWeb({
      //       fullNode: 'https://api.trongrid.io',
      //   solidityNode: 'https://api.trongrid.io',
      //   eventServer: 'https://api.trongrid.io',
      //   privateKey: '6695790a-649c-4b95-bc79-450e154b3bd2'
      //     }
      // )
      // window.tronWeb= new TronWeb(mainOptions.fullNode, mainOptions.solidityNode, mainOptions.eventServer, mainOptions.privateKey);
      // window.tronWeb= tronWeb;
      // console.log('111')
      var obj = setInterval(async () => {
        //     // this.defaultAddress = window.tronWeb.defaultAddress.base58?window.tronWeb.defaultAddress.base58 : ''
        //     console.log(window.tronWeb.defaultAddress.base58)
        //     if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        clearInterval(obj)
        // document.write("Yes, catch it:",window.tronWeb.defaultAddress.base58)
        // var tronweb = window.tronWeb
        var to = tronweb.address.toHex("TKh6t1eRcShc1fgZvdpv382GTBgkGKX8qx")
        var from = tronweb.address.toHex("TKfvwD5iPj5Z7PkH32fXxzM7FwzonDTiGd")
        console.log(to)
        console.log(from)
        // const  address=await  tronweb.address.fromPrivateKey("007d9e342be974180d655d227e724e24091797520483094811c833037739583b")
        // console.log(address)
        const tx = await tronweb.transactionBuilder.delegateResource(1000000, to, 'ENERGY', from)
        console.log(tx)
        tronweb.setPrivateKey("007d9e342be974180d655d227e724e24091797520483094811c833037739583b")
        console.log(tronweb.defaultPrivateKey)
        // let privateKey='';
        const signedTx = await tronweb.trx.multiSign(tx, '007d9e342be974180d655d227e724e24091797520483094811c833037739583b', 3)
        console.log(tronweb.defaultPrivateKey)
        console.log(signedTx)


        var broastTx = await tronweb.trx.sendRawTransaction(signedTx)
        console.log(broastTx)

        // }
      }, 1000)

      // const res: requestAccountsResponse = await tronLink.request({method: 'tron_requestAccounts'})
    }
  }
}
</script>

<style scoped>

</style>
