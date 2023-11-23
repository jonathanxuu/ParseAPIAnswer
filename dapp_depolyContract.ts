import { requestSuiFromFaucetV0, getFaucetHost } from '@benfen/bfc.js/faucet';
import { SuiClient, getFullnodeUrl } from '@benfen/bfc.js/client';
import { Ed25519Keypair } from '@benfen/bfc.js/keypairs/ed25519';
import { TransactionBlock } from '@benfen/bfc.js/transactions';


async function main() {

const { execSync } = require('child_process');
// Generate a new Ed25519 Keypair
const keypair = new Ed25519Keypair();


// Get faucet
const address = await keypair.getPublicKey().toSuiAddress()
	await requestSuiFromFaucetV0({
		host: getFaucetHost('testnet'),
		recipient: address,
	});
console.log(`The address is :`, address);
const client = new SuiClient({
	url: 'https://obcrpc.openblock.vip/',
});


// generate the modules, and pad them into the following two param `modules` & `dependencies`
const modules = ["oRzrCwYAAAAJAQAMAgwUAyAaBDoCBTxGB4IBoQEIowJgCoMDCgyNAzQABwEGAQwBDwEQAgoAAggAAQEIAAIEBAAEAwIABQAIAAAFAAEAAQ4FAgACCwYHAAMPCQEBCAURAwQAAwgMDwUKAgoCCgIKAgoCAwoCBggBBggEBwgDAAEDCw8FCgIKAgoCCgIKAgMKAgYIAQYIBAEPAQYIAQEHCAMBCAIBCAACCQAFEUF0dGVzdGVyV2hpdGVMaXN0BUNsb2NrCUtZQ1JlY29yZAlUeENvbnRleHQDVUlEBWNhbGx6BWNsb2NrC2RhcHBfbW9kdWxlAmlkCWt5Y1N0YXR1cwpreWNfdmVyaWZ5A25ldwZvYmplY3QJdGltZXN0YW1wDHRpbWVzdGFtcF9tcwh0cmFuc2Zlcgp0eF9jb250ZXh0CnZlcmlmeV9LWUMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACOrgykDZY5HlvwlFYNGR3IMq1ZGAKYLOk2qcqMzy8MLcAAgMICAIJDw0DAAEEAAIYCgAKAQsCCwMLBAsFCwYLBwsICgkLChEEAQsJEQEMDAsLEQILAAsMEgALATgAAgA="]
const dependencies = ["0x0000000000000000000000000000000000000000000000000000000000000001","0x0000000000000000000000000000000000000000000000000000000000000002","0x3ab832903658e4796fc2515834647720cab564600a60b3a4daa72a333cbc30b7"];


// const { modules, dependencies } = JSON.parse(
// 	execSync(`sui move build --dump-bytecode-as-base64 --path ${packagePath}`, {
// 		encoding: 'utf-8',
// 	}),
// );
const tx = new TransactionBlock();
const [upgradeCap] = tx.publish({
	modules,
	dependencies,
});
tx.transferObjects([upgradeCap], tx.pure(address));

// console.log(await client.getBalance())
const result = await client.signAndExecuteTransactionBlock({
	signer: keypair,
	transactionBlock: tx,
});
console.log({ result });
   
}

main();


// get coins owned by an address
