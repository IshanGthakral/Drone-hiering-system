Here’s the GitHub `README.md` file in a single code block:

```markdown
# Drone Delivery System

This is a Solidity-based smart contract for managing a Drone Delivery System. The contract provides functionalities to add drones, rent drones, return drones, and check drone availability. It ensures drone state consistency using internal checks and emits events for key activities.

## Features

- Add new drones to the system.
- Rent drones for delivery operations.
- Return drones after usage.
- Check drone availability and model details.
- Internal checks for ensuring drone state consistency.
- Events to track drone-related activities.

## Contract Details

- **License:** MIT
- **Solidity Version:** 0.8.17

## Prerequisites

- [Node.js](https://nodejs.org/) installed.
- [Hardhat](https://hardhat.org/) or [Truffle](https://trufflesuite.com/) for deployment and testing.
- A wallet like [MetaMask](https://metamask.io/).
- A test Ethereum network like [Ganache](https://trufflesuite.com/ganache/) or a public testnet (e.g., Goerli).

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/drone-delivery-system.git
   cd drone-delivery-system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Compile the smart contract:

   ```bash
   npx hardhat compile
   ```

4. Deploy the contract:

   ```bash
   npx hardhat run scripts/deploy.js --network <network-name>
   ```

   Replace `<network-name>` with your desired network.

## Smart Contract Methods

### 1. `addDrone(string memory droneModel)`
Adds a new drone to the system.
- **Parameters:** 
  - `droneModel`: The model of the drone (e.g., Quadcopter, Hexacopter).
- **Emits:** 
  - `DroneAdded(uint droneId, string droneModel)`

### 2. `rentDrone(uint droneId)`
Rents a drone to the caller.
- **Parameters:** 
  - `droneId`: The ID of the drone to rent.
- **Emits:** 
  - `DroneRented(address user, uint droneId)`
- **Reverts:** 
  - If the drone does not exist.
  - If the drone is already rented.
  - If the user has already rented the drone.

### 3. `returnDrone(uint droneId)`
Returns a rented drone.
- **Parameters:** 
  - `droneId`: The ID of the drone to return.
- **Emits:** 
  - `DroneReturned(address user, uint droneId)`
- **Reverts:** 
  - If the drone does not exist.
  - If the drone was not rented by the caller.

### 4. `checkDroneAvailability(uint droneId)`
Checks the availability and model details of a drone.
- **Parameters:** 
  - `droneId`: The ID of the drone to check.
- **Returns:** 
  - `droneModel`: The model of the drone.
  - `isRented`: The rental status of the drone.
- **Reverts:** 
  - If the drone does not exist.

### 5. `attemptRentDrone(uint droneId)`
Attempts to rent a drone and reverts with specific errors for failure conditions.
- **Parameters:** 
  - `droneId`: The ID of the drone to rent.
- **Emits:** 
  - `DroneRented(address user, uint droneId)`
- **Reverts:** 
  - If the drone does not exist.
  - If the drone is already rented.
  - If the user has already rented the drone.

## Events

- `DroneAdded(uint droneId, string droneModel)`
- `DroneRented(address user, uint droneId)`
- `DroneReturned(address user, uint droneId)`

## Example Usage

### Add a Drone
```javascript
await droneDeliverySystem.addDrone("Quadcopter");
```

### Rent a Drone
```javascript
await droneDeliverySystem.rentDrone(1);
```

### Return a Drone
```javascript
await droneDeliverySystem.returnDrone(1);
```

### Check Drone Availability
```javascript
const [droneModel, isRented] = await droneDeliverySystem.checkDroneAvailability(1);
console.log(`Model: ${droneModel}, Available: ${!isRented}`);
```

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
```

You can copy and save this content as `README.md` in your GitHub repository. Let me know if you need further edits!
Write the code and create .sol, deploy.js, and index.js file.

Inside the project directory, in the terminal type:
```npm i```

Open two additional terminals in your VS code

In the second terminal type: ```npx hardhat node```

now in  third terminal, type: ```npx hardhat run --network localhost scripts/deploy.js```

Again in the first terminal, type ```npm run dev``` , this will launch it in the front-end.

Now click on localhost link shown in the terminal 
Typically at http://localhost:3000/
connect metamask wallet and perform the tasks.

This was all about this project.
