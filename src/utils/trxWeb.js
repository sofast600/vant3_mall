

export function trxWeb() {
    const TronWeb = require('tronweb')
    const tronweb =   new TronWeb({
        fullHost: 'https://api.trongrid.io',
        headers: { "TRON-PRO-API-KEY": '6695790a-649c-4b95-bc79-450e154b3bd2' },
        privateKey: '007d9e342be974180d655d227e724e24091797520483094811c833037739583b'
    })
    return tronweb
}
