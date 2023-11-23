# Parse API Answer

## First deploy your own dapp

Set Parms of `dapp_callContract` correctly, such as your dapp packageID

## Request zCloak API fetch the api_answer

Run the bash below, and fetch the api answer, paste the answer into the `api_answer.json`:

```bash
curl --location --request GET 'https://card-service.zkid.xyz/api/kyc/ccip/record?chainCode=bfc&onChainAddress=0x8fb8eff69462aad4c20884c2cd4b7df33e6eb7cb5eba96319f17ea90ece45ded' \
--header 'User-Agent: Apifox/1.0.0 (https://apifox.com)'
```

API Answer Example:
```json
{
    "code":200,
    "msg":"success",
    "data":{
        "publicVc":{
            "@context":["https://www.w3.org/2018/credentials/v1"], 
            "version":"2",
            "ctype":"0x2c4d3f094cc8d89a6ef86a42b69741fbcf913fb4bdffa2f0c4b0d69ce293a411",
            "issuanceDate":1700723613647,
            "credentialSubject":{
                "kyc_status":1,
                "chain_code":"bfc",
                "on_chain_address":"0x8fb8eff69462aad4c20884c2cd4b7df33e6eb7cb5eba96319f17ea90ece45ded"},
            "issuer":["did:zk:0x8c2973F5A2ed37E010c5AC19D677938fd364d2c9"],
            "holder":"did:zk:0x11f8b77F34FCF14B7095BF5228Ac0606324E82D1",
            "hasher":["Keccak256","Keccak256"],
            "digest":"0x0786fc365a6b3e26c10a7d840fdbb8adb5df17c9074c13bdffd404631c483468",
            "proof":[{
                "type":"EcdsaSecp256k1SignatureEip191",
                "created":1700723613660,
                "verificationMethod":"did:zk:0x8c2973F5A2ed37E010c5AC19D677938fd364d2c9#key-0",
                "proofPurpose":"assertionMethod",
                "proofValue":"z8w1ieEt86jn3CqCUtWWGCTSQm1YAE4m18fJYbxTB9xQeuyuJJ7DLbGHF2jD17WN5gjFNhnk1iJ6E5TkNP6RSsesNp"}]},
   "signature":"0x3c106c27dc137bc8a5f1ac83846e6e670d7ac7ddb9d6c5ebcc4ebba6d054bfc898a09e04524f51fb74d95e948b49c710013c64ec592223e4040f17558ceda808",
   "timestamp":1700729907418
   }}
```

## Run `dapp_callContract.ts`
Run the ts-file to send the verify request, which must be done in 5 minutes since the API answer is received.