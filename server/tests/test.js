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

    await battles.mintNewBoss("Steve Jobs", "Cofounder of Apple, creator of Pixar, NeXT and Disney", 70, "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTY2MzU3OTcxMTUwODQxNTM1/steve-jobs--david-paul-morrisbloomberg-via-getty-images.jpg", 1000, "iPhone Throw");
    await battles.mintNewBoss("Peter Thiel", "Cofounder of Paypal and Palantier, and writer of Zero to One", 78, "https://image.cnbcfm.com/api/v1/image/106723915-1601485640846-gettyimages-1183198454-JAPAN_THIEL.jpeg?v=1627491962", 900, "Another long lecture");
    const third = await battles.getBossIds();
    console.log(third);
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