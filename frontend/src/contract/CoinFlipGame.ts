export const CoinFlipGameABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "roomId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tossResult",
        type: "uint256",
      },
    ],
    name: "CoinToss",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "roomId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "hostWon",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "guestWon",
        type: "bool",
      },
    ],
    name: "GameResult",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "LogMessage",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "roomId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "host",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "hostUsername",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "betAmount",
        type: "uint256",
      },
    ],
    name: "RoomCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "roomId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "guest",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "guestUsername",
        type: "string",
      },
    ],
    name: "RoomJoined",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "roomId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "UserReady",
    type: "event",
  },
  {
    inputs: [],
    name: "roomCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "rooms",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "host",
        type: "address",
      },
      {
        internalType: "string",
        name: "hostUsername",
        type: "string",
      },
      {
        internalType: "address payable",
        name: "guest",
        type: "address",
      },
      {
        internalType: "string",
        name: "guestUsername",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "betAmount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "hostReady",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "guestReady",
        type: "bool",
      },
      {
        internalType: "uint8",
        name: "hostGuess",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "guestGuess",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "usernameByAddress",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_username",
        type: "string",
      },
    ],
    name: "setUsername",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_betAmount",
        type: "uint256",
      },
    ],
    name: "createRoom",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_roomId",
        type: "uint256",
      },
    ],
    name: "joinRoom",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_roomId",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "_guess",
        type: "uint8",
      },
    ],
    name: "setReady",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_roomId",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "_tossResult",
        type: "uint8",
      },
    ],
    name: "handleCoinTossResult",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_roomId",
        type: "uint256",
      },
    ],
    name: "leaveRoom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const CoinFlipGameAddress = "0x39ccDD407Cac3E07970a8D7557316Fe6699e9Bb2"; // 将实际的合约部署地址替换为这个占位符
