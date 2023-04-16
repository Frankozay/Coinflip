// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CoinFlipGame {
    struct Room {
        uint256 id;
        address payable host;
        string hostUsername;
        address payable guest;
        string guestUsername;
        uint256 betAmount;
        bool hostReady;
        bool guestReady;
        uint8 hostGuess;
        uint8 guestGuess;
        bool isActive;
    }

    uint256 public roomCount = 0;
    mapping(uint256 => Room) public rooms;
    mapping(address => string) public usernameByAddress;

    event RoomCreated(uint256 roomId, address host, string hostUsername, uint256 betAmount);
    event RoomJoined(uint256 roomId, address guest, string guestUsername);
    event UserReady(uint256 roomId, address user);
    event CoinToss(uint256 indexed roomId, uint256 tossResult);
    event GameResult(uint256 roomId, bool hostWon, bool guestWon);
    event LogMessage(string message);

    function setUsername(string memory _username) external {
        usernameByAddress[msg.sender] = _username;
    }

    function createRoom(uint256 _betAmount) external payable {
        require(msg.value == _betAmount, "Incorrect bet amount");
        roomCount++;
        rooms[roomCount] = Room(
            roomCount,
            payable(msg.sender),
            usernameByAddress[msg.sender],
            payable(address(0)),
            "",
            _betAmount,
            false,
            false,
            0,
            0,
            true
        );
        emit RoomCreated(roomCount, msg.sender, usernameByAddress[msg.sender], _betAmount);
    }

    function joinRoom(uint256 _roomId) external payable {
        Room storage room = rooms[_roomId];
        require(room.isActive, "Room is not active");
        require(room.guest == address(0), "Room is full");
        require(msg.value == room.betAmount, "Incorrect bet amount");

        room.guest = payable(msg.sender);
        room.guestUsername = usernameByAddress[msg.sender];
        emit RoomJoined(_roomId, msg.sender, usernameByAddress[msg.sender]);
    }

    function setReady(uint256 _roomId, uint8 _guess) external {
        Room storage room = rooms[_roomId];
        require(room.isActive, "Room is not active");
        require(msg.sender == room.host || msg.sender == room.guest, "Not a participant");
        require(_guess == 0 || _guess == 1, "Invalid guess");

        if (msg.sender == room.host) {
            room.hostReady = true;
            room.hostGuess = _guess;
        } else {
            room.guestReady = true;
            room.guestGuess = _guess;
        }
        emit UserReady(_roomId, msg.sender);

        if (room.hostReady && room.guestReady) {
            uint256 tossResult = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao))) % 2;
            emit CoinToss(_roomId, tossResult);
        }
    }

    function handleCoinTossResult(uint256 _roomId, uint8 _tossResult) external {
        require(_tossResult == 0 || _tossResult == 1, "Invalid toss result");
        Room storage room = rooms[_roomId];
        require(room.hostReady && room.guestReady, "Both users must be ready");

        bool hostWon = (room.hostGuess == _tossResult);
        bool guestWon = (room.guestGuess == _tossResult);

        if (hostWon && guestWon) {
            room.host.transfer(room.betAmount);
            room.guest.transfer(room.betAmount);
        } else if (hostWon) {
            room.host.transfer(room.betAmount * 2 * 99 / 100); // 1% fee
        } else if (guestWon) {
            room.guest.transfer(room.betAmount * 2 * 99 / 100); // 1% fee
        } else {
            room.host.transfer(room.betAmount);
            room.guest.transfer(room.betAmount);
        }
        room.isActive = false;
        emit GameResult(_roomId, hostWon, guestWon);
    }

    function leaveRoom(uint256 _roomId) external {
        Room storage room = rooms[_roomId];
        require(!room.isActive, "Room is active");
        require(msg.sender == room.host || msg.sender == room.guest, "Not a participant");

        if (msg.sender == room.host) {
            if (room.guest != address(0)) {
                // Make guest the new host
                room.host = room.guest;
                room.hostUsername = room.guestUsername;
                room.hostGuess = room.guestGuess;
                room.hostReady = room.guestReady;

                room.guest = payable(address(0));
                room.guestUsername = "";
                room.guestReady = false;
                emit LogMessage('message:');
            } else {
                room.host = payable(address(0));
                room.hostUsername = "";
                room.hostReady = false;
            }
        } else {
            room.guest = payable(address(0));
            room.guestUsername = "";
            room.guestReady = false;
        }

        if (room.host == address(0) && room.guest == address(0)) {
            delete rooms[_roomId];
        }
    }
}
