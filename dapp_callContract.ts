import { requestSuiFromFaucetV0, getFaucetHost } from '@benfen/bfc.js/faucet';
import { SuiClient, getFullnodeUrl, SuiTransactionBlockResponse } from '@benfen/bfc.js/client';
import { Ed25519Keypair } from '@benfen/bfc.js/keypairs/ed25519';
import { TransactionBlock } from '@benfen/bfc.js/transactions';
import { base58Decode } from '@zcloak/crypto';

var apiAnswer = require('./api_answer.json');
async function main() {

const { execSync } = require('child_process');
// Generate a new Ed25519 Keypair
const keypair = new Ed25519Keypair();
// console.log(export_key);


// Get faucet
const address = await keypair.getPublicKey().toSuiAddress()
	await requestSuiFromFaucetV0({
		host: getFaucetHost('testnet'),
		recipient: address,
	});



let holder = apiAnswer.data.publicVc.holder.substring(9);


let expirationDate = apiAnswer.data.publicVc.expirationDate === undefined ?
    new Uint8Array([0]) :
    convertHexStringToU8a(apiAnswer.data.publicVc.expirationDate.toString(16));

let ctype = apiAnswer.data.publicVc.ctype.substring(2);

let attester_sig = apiAnswer.data.publicVc.proof[0].proofValue;

// Set Client
const client = new SuiClient({
	url: 'https://obcrpc.openblock.vip/',
});

// Set Package
const packageObjectId = 'BFCb38409db92d2ed610e7bc17b4601469423aac2afcb64da60f33deb47b5cf2539ebde';
const tx = new TransactionBlock();

console.log(`Ready to compose tx ===============`);

// console.log(apiAnswer.data.publicVc.credentialSubject.kyc_status);
// console.log(apiAnswer.data.publicVc.credentialSubject.on_chain_address);
// console.log(Array.from(convertHexStringToU8a(holder))),
// console.log(Array.from(convertHexStringToU8a(apiAnswer.data.publicVc.issuanceDate.toString(16))))
// console.log(Array.from(expirationDate))
// console.log(Array.from(convertHexStringToU8a(ctype)))
// console.log(Array.from(base58Decode(attester_sig)))
// console.log(apiAnswer.data.timestamp)
// console.log(Array.from(convertHexStringToU8a(apiAnswer.data.signature.substring(2))))


tx.moveCall({
	target: `${packageObjectId}::dapp_module::callz`,
	arguments: [
		tx.pure(apiAnswer.data.publicVc.credentialSubject.kyc_status),
		tx.pure(apiAnswer.data.publicVc.credentialSubject.on_chain_address),
		tx.pure(Array.from(convertHexStringToU8a(holder))),
		tx.pure(Array.from(convertHexStringToU8a(apiAnswer.data.publicVc.issuanceDate.toString(16)))),
		tx.pure(Array.from(expirationDate)),
		tx.pure(Array.from(convertHexStringToU8a(ctype))),
		tx.pure(Array.from(base58Decode(attester_sig))),
		tx.pure(apiAnswer.data.timestamp),
		tx.pure(Array.from(convertHexStringToU8a(apiAnswer.data.signature.substring(2)))),
		tx.pure("0x6")]
});


// // tx.moveCall({
// // 	target: `${packageObjectId}::my_module::checkAddr`,
// // 	arguments: []
// // 		});


console.log(`Already to compose tx`);

const result:SuiTransactionBlockResponse = await client.signAndExecuteTransactionBlock({
	signer: keypair,
	transactionBlock: tx,
	options: {
        showEffects: true,
        showObjectChanges: true,
		showBalanceChanges: true
    }
});
console.log( result );
}

main();


// get coins owned by an address


function convertHexStringToU8a(
    hex_string: string
): Uint8Array {
    let to_pad = hex_string;
    if (hex_string.length % 2 !== 0){
        to_pad = to_pad.padStart(to_pad.length + 1, '0');
    }
    const hex = Uint8Array.from(Buffer.from(to_pad, 'hex'));
    return hex
}