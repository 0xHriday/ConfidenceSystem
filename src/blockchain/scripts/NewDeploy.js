
const hre = require("hardhat");

async function main() {

    function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
      }
      
  


    const accounts = await hre.ethers.getSigners();   




    Interface = await hre.ethers.getContractFactory("InterfaceContract")
    const interface = await Interface.deploy(accounts[0].address);
    await interface.deployed();
    console.log("interface deployed to:", interface.address);

    SubmittedSystems1 = await hre.ethers.getContractFactory("SubmittedSystemsContract")
    const submittedsystems = await SubmittedSystems1.deploy(accounts[0].address);
    await submittedsystems.deployed();
    console.log("submittedsystems deployed to:", submittedsystems.address);

    Payouts = await hre.ethers.getContractFactory("PayoutsContract")
    const payouts = await Payouts.deploy(accounts[0].address);
    await payouts.deployed();
    console.log("payouts deployed to:", payouts.address);

    const NewUsers = await hre.ethers.getContractFactory("NewUsersContract");
    const users = await NewUsers.deploy(accounts[0].address);
    await users.deployed();
    console.log("users deployed to:", users.address);

    MockToken = await hre.ethers.getContractFactory("MockToken")
    const mocktoken = await MockToken.deploy(accounts[0].address);
    await mocktoken.deployed();
    console.log("mocktoken deployed to:", mocktoken.address);


    Triage = await hre.ethers.getContractFactory("TriageContract")
    const triage = await Triage.deploy(accounts[0].address);
    await triage.deployed();
    console.log("triage deployed to:", triage.address);


    await interface.SetAddress(mocktoken.address, payouts.address, users.address, submittedsystems.address, triage.address, interface.address);
    await submittedsystems.SetAddress(mocktoken.address, payouts.address, users.address, submittedsystems.address, triage.address, interface.address);
    await users.SetAddress(mocktoken.address, payouts.address, users.address, submittedsystems.address, triage.address, interface.address);
    await payouts.SetAddress(mocktoken.address, payouts.address, users.address, submittedsystems.address, triage.address, interface.address);
    await mocktoken.SetAddress(mocktoken.address, payouts.address, users.address, submittedsystems.address, triage.address, interface.address);
    await triage.SetAddress(mocktoken.address, payouts.address, users.address, submittedsystems.address, triage.address, interface.address);

  


    await mocktoken.SetBalance(accounts[0].address, 150);


    let account0bal = await mocktoken.GetBalancePublic(accounts[0].address);
    let account1bal = await mocktoken.GetBalancePublic(accounts[1].address);


   console.log("Submitter balance is:", account0bal);
   console.log("Auditor balance is:", account1bal);

    await interface.SubmitSystem('blah', 0, 100);
    await interface.connect(accounts[1]).Audit('blah');
    await interface.RequestAuditPayout('blah');

    account0bal = await mocktoken.GetBalancePublic(accounts[0].address);
    account1bal = await mocktoken.GetBalancePublic(accounts[1].address);


    console.log("Submitter balance is:", account0bal);
    console.log("Auditor balance is:", account1bal);
    


    
    
  




// const SystemDetails = await systemsubmitter.GetSystemDetails('blah');


 //  for (i=0; i<10; i++){
 //  console.log(SystemDetails[i],)
 //  }

}

main()