async function main() {
    const billion = await hre.ethers.getContractFactory("BillionaireBattles");
    const battles = await billion.deploy(
        ['Adam Neumann', 'Nikil Viswanathan'],
        ['Co-Founder of WeWork', 'Co-Founder and CEO of Alchemy'],
        ['https://i.imgur.com/Zmh5ZFQ.jpg', 'https://i.imgur.com/kgFwxcX.jpg'],
        [100, 200],
        [100, 200],
        ['punch', 'punch'],
        ['kick', 'lawsuit'],
        ['uppercut', 'stab with a fork'],
        [25, 23],
        [32, 43],
        [49, 55]
    );
    await battles.deployed();

    console.log('Deployed Contract to: ', battles.address);
    await battles.mintItemById(0);
    await battles.mintItemById(1);

    await battles.createMarketListing(1, 10);
    let array = await battles.getMarketItems();
    console.log(array);
}


const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();