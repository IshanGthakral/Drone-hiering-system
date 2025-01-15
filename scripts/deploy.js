const { ethers } = require("hardhat");

async function main() {
  // Get the contract factory for DroneDeliverySystem
  const DroneDeliverySystem = await ethers.getContractFactory("DroneDeliverySystem");
  
  // Deploy the contract
  const droneDeliverySystem = await DroneDeliverySystem.deploy();  
  await droneDeliverySystem.deployed();  // Wait for the deployment to be mined

  // Output the deployed contract address
  console.log(`DroneDeliverySystem deployed to: ${droneDeliverySystem.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
