// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract DroneDeliverySystem {
    struct Drone {
        uint droneId;
        string droneModel;  // E.g., Quadcopter, Hexacopter
        bool isRented;
    }

    mapping(uint => Drone) public drones;
    mapping(address => mapping(uint => bool)) public rentedDrones;
    uint public droneCount;

    event DroneAdded(uint droneId, string droneModel);
    event DroneRented(address user, uint droneId);
    event DroneReturned(address user, uint droneId);

    function addDrone(string memory droneModel) public {
        require(bytes(droneModel).length > 0, "Drone model cannot be empty");

        droneCount++;
        drones[droneCount] = Drone(droneCount, droneModel, false);

        emit DroneAdded(droneCount, droneModel);
    }

    function rentDrone(uint droneId) public {
        Drone storage drone = drones[droneId];

        // Ensure that the drone exists
        require(drone.droneId != 0, "Drone does not exist");

        // Ensure that the drone is not already rented
        require(!drone.isRented, "Drone is already rented");

        // Ensure that the user has not already rented this drone
        require(!rentedDrones[msg.sender][droneId], "Drone already rented by you");

        // Mark the drone as rented and record the rental
        drone.isRented = true;
        rentedDrones[msg.sender][droneId] = true;

        emit DroneRented(msg.sender, droneId);
    }

    function returnDrone(uint droneId) public {
        Drone storage drone = drones[droneId];

        // Ensure that the drone exists
        require(drone.droneId != 0, "Drone does not exist");

        // Ensure that the user has rented this drone
        require(rentedDrones[msg.sender][droneId], "Drone was not rented by you");

        // Mark the drone as available and remove the rental record
        drone.isRented = false;
        rentedDrones[msg.sender][droneId] = false;

        emit DroneReturned(msg.sender, droneId);
    }

    function checkDroneAvailability(uint droneId) public view returns (string memory droneModel, bool isRented) {
        Drone storage drone = drones[droneId];

        // Ensure that the drone exists
        require(drone.droneId != 0, "Drone does not exist");

        // Return the drone details
        return (drone.droneModel, drone.isRented);
    }

    function attemptRentDrone(uint droneId) public {
        Drone storage drone = drones[droneId];

        // Check if the drone exists
        if (drone.droneId == 0) {
            revert("Drone does not exist");
        }

        // Check if the drone is already rented
        if (drone.isRented) {
            revert("Drone is already rented");
        }

        // Check if the user has already rented this drone
        if (rentedDrones[msg.sender][droneId]) {
            revert("Drone already rented by you");
        }

        // Mark the drone as rented and record the rental
        drone.isRented = true;
        rentedDrones[msg.sender][droneId] = true;

        emit DroneRented(msg.sender, droneId);
    }

    // Internal function to ensure drone state consistency
    function internalCheck(uint droneId) internal view {
        Drone storage drone = drones[droneId];
        assert(drone.droneId > 0);  // Assert the drone ID should always be positive
        assert(drone.isRented == false || drone.isRented == true);  // Assert that isRented is either true or false
    }
}
