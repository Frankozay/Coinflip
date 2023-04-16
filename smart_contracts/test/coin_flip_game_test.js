const CoinFlipGame = artifacts.require("CoinFlipGame");

contract("CoinFlipGame", (accounts) => {
  let coinFlipGame;
  const host = accounts[0];
  const guest = accounts[1];
  const nonParticipant = accounts[2];
  const betAmount = web3.utils.toWei("1", "ether");

  beforeEach(async () => {
    coinFlipGame = await CoinFlipGame.new();
  });

  it("should set a username for an account", async () => {
    await coinFlipGame.setUsername("Host", { from: host });
    const username = await coinFlipGame.usernameByAddress(host);
    assert.equal(username, "Host", "Username is not set correctly");
  });

  it("should create a new room", async () => {
    await coinFlipGame.setUsername("Host", { from: host });
    const tx = await coinFlipGame.createRoom(betAmount, { from: host, value: betAmount });
    const room = await coinFlipGame.rooms(1);

    assert.equal(room.host, host, "Host is not set correctly");
    assert.equal(room.betAmount.toString(), betAmount, "Bet amount is not set correctly");
    assert.equal(room.isActive, true, "Room should be active");

    const event = tx.logs.find(log => log.event === "RoomCreated");
    assert.exists(event, "RoomCreated event not emitted");
  });

  it("should join a room as a guest", async () => {
    await coinFlipGame.setUsername("Host", { from: host });
    await coinFlipGame.setUsername("Guest", { from: guest });
    await coinFlipGame.createRoom(betAmount, { from: host, value: betAmount });

    const tx = await coinFlipGame.joinRoom(1, { from: guest, value: betAmount });
    const room = await coinFlipGame.rooms(1);

    assert.equal(room.guest, guest, "Guest is not set correctly");
    assert.equal(room.isActive, true, "Room should be active");

    const event = tx.logs.find(log => log.event === "RoomJoined");
    assert.exists(event, "RoomJoined event not emitted");
  });

  it("should set user ready and submit their guess", async () => {
    await coinFlipGame.setUsername("Host", { from: host });
    await coinFlipGame.setUsername("Guest", { from: guest });
    await coinFlipGame.createRoom(betAmount, { from: host, value: betAmount });
    await coinFlipGame.joinRoom(1, { from: guest, value: betAmount });

    let tx = await coinFlipGame.setReady(1, 1, { from: host });
    let room = await coinFlipGame.rooms(1);

    assert.isTrue(room.hostReady, "Host should be ready");
    assert.equal(room.hostGuess, 1, "Host guess should be 1");

    let event = tx.logs.find(log => log.event === "UserReady");
    assert.exists(event, "UserReady event not emitted");

    tx = await coinFlipGame.setReady(1, 0, { from: guest });
    room = await coinFlipGame.rooms(1);

    assert.isTrue(room.guestReady, "Guest should be ready");
    assert.equal(room.guestGuess, 0, "Guest guess should be 0");

    event = tx.logs.find(log => log.event === "UserReady");
    assert.exists(event, "UserReady event not emitted");
  })
  it("should resolve game and distribute winnings", async () => {
    await coinFlipGame.setUsername("Host", { from: host });
    await coinFlipGame.setUsername("Guest", { from: guest });
    await coinFlipGame.createRoom(betAmount, { from: host, value: betAmount });
    await coinFlipGame.joinRoom(1, { from: guest, value: betAmount });
    await coinFlipGame.setReady(1, 1, { from: host });
    await coinFlipGame.setReady(1, 0, { from: guest });
    const tx = await coinFlipGame.handleCoinTossResult(1, 1, { from: host });

    const room = await coinFlipGame.rooms(1);
    assert.isFalse(room.isActive, "Room should not be active");

    const event = tx.logs.find(log => log.event === "GameResult");
    assert.exists(event, "GameResult event not emitted");
  });
  it("should allow users to leave the room", async () => {
    await coinFlipGame.setUsername("Host", { from: host });
    await coinFlipGame.setUsername("Guest", { from: guest });
    await coinFlipGame.createRoom(betAmount, { from: host, value: betAmount });
    await coinFlipGame.joinRoom(1, { from: guest, value: betAmount });
    await coinFlipGame.setReady(1, 1, { from: host });
    await coinFlipGame.setReady(1, 0, { from: guest });
    await coinFlipGame.handleCoinTossResult(1, 1, { from: host });
    await coinFlipGame.leaveRoom(1, { from: host });
    let room = await coinFlipGame.rooms(1);
    assert.equal(room.host, guest, "Host should be guest");

    await coinFlipGame.leaveRoom(1, { from: guest });
    room = await coinFlipGame.rooms(1);
    assert.equal(room.guest, "0x0000000000000000000000000000000000000000", "Guest should be empty");
  });
  it("should not allow non-participants to leave the room", async () => {
    await coinFlipGame.setUsername("Host", { from: host });
    await coinFlipGame.setUsername("Guest", { from: guest });
    await coinFlipGame.createRoom(betAmount, { from: host, value: betAmount });
    await coinFlipGame.joinRoom(1, { from: guest, value: betAmount });
    await coinFlipGame.setReady(1, 1, { from: host });
    await coinFlipGame.setReady(1, 0, { from: guest });
    await coinFlipGame.handleCoinTossResult(1, 1, { from: host });
    try {
        await coinFlipGame.leaveRoom(1, { from: nonParticipant });
        assert.fail("Should not allow non-participants to leave the room");
      } catch (error) {
        assert.isTrue(error.message.includes("Not a participant"), "Expected 'Not a participant' error");
      }
  });
});
