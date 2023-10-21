task("deploy-peer-purse", "Deploys PeerPurse contract").setAction(
  async (taskArgs, hre) => {
    console.log(`Deploying PeerPurse contract to ${network.name}`);

    if (network.name === "hardhat") {
      throw Error(
        'This command cannot be used on a local development chain.  Specify a valid network or simulate an Functions request locally with "npx hardhat functions-simulate".'
      );
    }
    const peerPurse = await ethers.getContractFactory("PeerPurse");
    const peerPurseContract = await peerPurse.deploy();
    console.log(
      `\nWaiting 3 blocks for transaction ${peerPurseContract.deployTransaction.hash} to be confirmed...`
    );

    await peerPurseContract.deployTransaction.wait(3);

    console.log(
      `PeerPurse deployed to ${peerPurseContract.address} on ${network.name}`
    );

    console.log("\nVerifying contract...");
    try {
      await run("verify:verify", {
        address: peerPurseContract.address,
        constructorArguments: [],
      });
      console.log("Contract verified");
    } catch (error) {
      if (!error.message.includes("Already Verified")) {
        console.log(
          "Error verifying contract.  Delete the build folder and try again."
        );
        console.log(error);
      } else {
        console.log("Contract already verified");
      }
    }
  }
);
