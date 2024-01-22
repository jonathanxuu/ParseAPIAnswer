import { requestSuiFromFaucetV0, getFaucetHost } from '@benfen/bfc.js/faucet';
import { SuiClient, getFullnodeUrl, SuiTransactionBlockResponse } from '@benfen/bfc.js/client';
import { Ed25519Keypair } from '@benfen/bfc.js/keypairs/ed25519';
import { TransactionBlock } from '@benfen/bfc.js/transactions';
import { base58Decode } from '@zcloak/crypto';

var apiAnswer = require('./api_answer.json');
async function main() {

const { execSync } = require('child_process');
// Generate a new Ed25519 Keypair
const keypair = Ed25519Keypair.fromSecretKey(new Uint8Array(32));
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
const packageObjectId = 'BFCaa897749dbc76f383218a9594538f429422ad1f008655413ae23d08f776d7cc5de07';
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


// tx.moveCall({
// 	target: `${packageObjectId}::kyc_verify::set_whitelist`,
// 	arguments: [
// 		tx.pure("BFC143c796002eeae9f8ca8941db21a922944953c8f267f320ab2d58857c2e58cfb3879"),
// 		tx.pure(Array.from(convertHexStringToU8a("02252feE64a45827E4C09Ae2312F09Ce15B0Cb89"))),
// 	]
// });


tx.moveCall({
	target: `${packageObjectId}::kyc_verify::modify_add_whitelist`,
	arguments: [
		tx.pure("BFC143c796002eeae9f8ca8941db21a922944953c8f267f320ab2d58857c2e58cfb3879"),
		tx.pure("BFC4ddb2545973a9ba630bf37717b620fdf01a67f62dd52658b200c4a7b80bab705cf46"),
		tx.pure(Array.from(convertHexStringToU8a("01252feE64a45827E4C09Ae2312F09Ce15B0Cb89"))),

	]
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