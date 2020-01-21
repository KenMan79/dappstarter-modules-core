class contractaccess {

///(functions



    static async isContractAuthorized(data) {

        let result = await Blockchain.get(
                            { config: config, contract: DappLib.DAPP_STATE_CONTRACT, params : { from: null } },
                            'isContractAuthorized', 
                            data.account
        );
        return {
            type: DappLib.DAPP_RESULT_BOOLEAN,
            label: 'Is Contract Authorized',
            result: result.callData,
            hint: null
        }
    }

    static async authorizeContract(data) {

        let result = await Blockchain.post(
                                    { config: config, contract: DappLib.DAPP_STATE_CONTRACT, params : { from: null } },
                                    'authorizeContract', 
                                    data.account
                        );
        return {
            type: DappLib.DAPP_RESULT_TX_HASH,
            label: 'Transaction Hash',
            result: result.callData.transactionHash,
            hint: `Verify ${DappLib.formatAccount(data.account)} is authorized by using "Is Contract Authorized."`
        }                        
    }

    static async deauthorizeContract(data) {

        let result = await Blockchain.post(
                                    { config: config, contract: DappLib.DAPP_STATE_CONTRACT, params : { from: null } },
                                    'deauthorizeContract', 
                                    data.account
                        );
        return {
            type: DappLib.DAPP_RESULT_TX_HASH,
            label: 'Transaction Hash',
            result: result.callData.transactionHash,
            hint: `Verify ${DappLib.formatAccount(data.account)} is no longer authorized by using "Is Contract Authorized."`
        }                        
    }


///)

}