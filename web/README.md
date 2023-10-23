# Peer Purse Protocol
An under-collateralized P2P credit delegation borrowing protocol with verifiable credibility using zkProofs

## Project Description
This project helps users to borrow money without any collateral and any intermediary protocols. Users sign in with our platform using their Gmail account to enter our dApp. One can choose to supply DAI/WETH/USDC to provide loans to borrowers. The user supplies funds to the pool and registers his account in PeerPurse. When a user who needs to borrow money wants to lend money from the person who supplied funds to the dApp, he initiates a chat with the user to release the funds. The lender can ask the borrower to provide zero knowledge proofs which can be verified in the chat using a zkVerifier and on successful verification, the lender would borrow funds to the user seamlessly and without any middle man protocol ensuring transparency and trust-free P2P experience.

## How it's Made
We use the Safe AA SDK + Stripe On Ramp to log-in using Gmail and create a crypto wallet instantly. Our entire dApp is deployed on Goerli Testnet. We use the Spark Protocol, Sismo and XMTP as the core protocols in our project. A user approves his wstETH tokens to the SparkLend pool and supplies the tokens to receive spwstETH tokens which gives borrowing power to the supplier. This P2P application uses XMTP as the core for the communication between lenders and borrowers. A borrower initiates a conversation with a lender who has good borrowing power requesting funds to be provided as loan. The lender verifies his credibility by requesting zkProofs in the XMTP chat. The borrower should verify the requested zkProof using Sismo Connect and return the proof which on verified will intimate the lender that the proof is verified. And then the lender can approve delegation to the borrower to borrow the funds.


Deployed on Goerli: https://goerli.etherscan.io/address/0x8A49Da0f4d2c92e9a6726617634B14eE80A584da