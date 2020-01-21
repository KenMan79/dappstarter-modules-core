class contractrunstate {

///(functions



    static async isContractRunStateActive(data) {

        let result = await Blockchain.get(
                            { config: config, contract: DappLib.DAPP_STATE_CONTRACT, params : { from: null } },
                            'isContractRunStateActive'
        );
        return {
            type: DappLib.DAPP_RESULT_BOOLEAN,
            label: 'Is Contract Run State Active',
            result: result.callData,
            hint: null
        }
    }

    static async setContractRunState(data) {
        let result = await Blockchain.post(
                                    { config: config, contract: DappLib.DAPP_STATE_CONTRACT, params : { from: null } },
                                    'setContractRunState', 
                                    data.mode
                        );
        return {
            type: DappLib.DAPP_RESULT_TX_HASH,
            label: 'Transaction Hash',
            result: result.callData.transactionHash,
            hint: `Verify contract run state is ${data.mode ? 'active' : 'inactive'} by calling contract functions that use requireContractRunStateActive().`
        }                        
    }


///)

}