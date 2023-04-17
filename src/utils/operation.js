import { tezos } from "./tezos"

export const claimOwnerFundsOperation = async () => {
    try {
        const contract = await tezos.wallet.at("KT1H7wt2TJaMPFVmXuQRhJiCiuQ7KXHmNtuf");
        const op = await contract.methods.claimOwner().send()
       await op.confirmation(1);
    }
    catch(err) {
        throw err;
    }
}

export const claimCounterpartyFundsOperation = async (secretKey) => {
    try {
        const contract = await tezos.wallet.at("KT1H7wt2TJaMPFVmXuQRhJiCiuQ7KXHmNtuf");
        const op = await contract.methods.claimCounterparty(secretKey).send()
       await op.confirmation(1);
    }
    catch(err) {
        throw err;
    }
}

export const addBalanceOwnerOperation = async (amount) => {
    console.log("Owner trying to add balance (escrow method).");
    console.log(amount);
    try {
        const contract = await tezos.wallet.at("KT1H7wt2TJaMPFVmXuQRhJiCiuQ7KXHmNtuf");
        const op = await contract.methods.addBalanceOwner().send({
            amount: amount,
            mutez: false,
        })
       await op.confirmation(1);
    }
    catch(err) {
        throw err;
    }
}

export const addBalanceCounterpartyOperation = async (amount) => {
    console.log("Counterparty trying to add balance (escrow method).");
    console.log(amount);
    try {
        const contract = await tezos.wallet.at("KT1H7wt2TJaMPFVmXuQRhJiCiuQ7KXHmNtuf");
        const op = await contract.methods.addBalanceCounterparty().send({
            amount: amount,
            mutez: false,
        })
       await op.confirmation(1);
    }
    catch(err) {
        throw err;
    }
}

export const revertFundsOperation = async () => {
    console.log("Admin trying to revert funds (escrow method).");
    try {
        const contract = await tezos.wallet.at("KT1H7wt2TJaMPFVmXuQRhJiCiuQ7KXHmNtuf");
        const op = await contract.methods.revertFunds().send()
       await op.confirmation(1);
    }
    catch(err) {
        throw err;
    }
}
