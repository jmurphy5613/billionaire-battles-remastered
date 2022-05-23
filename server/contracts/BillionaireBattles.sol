// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BillionaireBattles is ERC721 {

    uint listingTransactionFee; //fee taken from each listing
    uint reviveCost;
    uint numberOfCharacters = 0;

    constructor(
        string[] memory names, 
        string[] memory descriptions, 
        string[] memory images,
        uint[] memory healths,
        uint[] memory maxHealths,
        string[] memory attack1Names,
        string[] memory attack2Names,
        string[] memory attack3Names,
        uint[] memory attack1Damages,
        uint[] memory attack2Damages,
        uint[] memory attack3Damages
    ) ERC721("Billionaire Battles", "BBT") {
        listingTransactionFee = 5;
        reviveCost = 5;
        for(uint i = 0; i < 2; i++) {
            characterRoster.push(character({
                owner: address(this),
                isBeingSold: false,
                name: names[i],
                description: descriptions[i],
                image: images[i],
                health: healths[i],
                maxHealth: maxHealths[i],
                attack1Name: attack1Names[i],
                attack2Name: attack2Names[i],
                attack3Name: attack3Names[i],
                attackDamageAttack1: attack1Damages[i],
                attackDamageAttack2: attack2Damages[i],
                attackDamageAttack3: attack3Damages[i]
            }));
        }
    }

    struct character {
        address owner;
        bool isBeingSold;

        //character bio
        string name;
        string description;
        string image;

        uint health;
        uint maxHealth;

        string attack1Name;
        string attack2Name;
        string attack3Name;
        uint attackDamageAttack1;
        uint attackDamageAttack2;
        uint attackDamageAttack3;
    }

    struct boss {
        address owner;
        string name;
        string description;
        string image;
        string attackName;
        uint256 health;
        uint256 maxHealth;
        uint256 attackDamage;
    }

    mapping(uint => boss) bosses;

    mapping(uint => character) characters;

    mapping(uint => uint) prices;

    character[] characterRoster;

    function mintItemById(uint id) public {
        //make ids valid
        require(id >= 0, "Must use valid ID");
        require(id < characterRoster.length, "ID is too large");
        
        numberOfCharacters++;
        characters[numberOfCharacters] = characterRoster[id];
        characters[numberOfCharacters].owner = msg.sender;

        _safeMint(msg.sender, numberOfCharacters);
    }


    // getters
    function getListingFee() public view returns (uint) {
        return listingTransactionFee;
    }

    function getReviveCost() public view returns (uint) {
        return reviveCost;
    }

    function getAllCharacters() public view returns (string memory) {
        return characters[1].name;
    }

    function getCharacterCount() public view returns (uint) {
        return numberOfCharacters;
    }

    function getOwnerOfCharcterByID(uint id) public view returns (address) {
        return characters[id].owner;
    }

    function getCharactersFromAddress(address current) public view returns (uint[] memory) {
        uint currentIndex = 0;
        uint[] memory ids = new uint[](numberOfCharacters);
        for(uint i = 1; i <= numberOfCharacters; i++) {
            if(characters[i].owner == current) {
                ids[currentIndex] = i;
                currentIndex++;
            }
        }
        return ids;
    }

    function getCharacterDisplayDataById(uint index) public view returns (string[] memory) {
        /*
        This function is called for the grid displays, it does not give the client
        data that is used in the logic of fighting etc 
        */
        string[] memory data = new string[](4);
        string memory img = characters[index].image;
        string memory name = characters[index].name;

        data[0] = img;
        data[1] = name;
        return data;
    }

    function getCharacterHealthAndMaxHealthById(uint index) public view returns (uint[] memory) {
        /*
        This function is called to get the health of a character
        */
        uint[] memory data = new uint[](2);
        uint health = characters[index].health;
        uint maxHealth = characters[index].maxHealth;
        data[0] = health;
        data[1] = maxHealth;
        return data;
    }

    function getCharacterById(uint tokenId) public view returns(string[] memory) {
        return characters[tokenId];
    }
    
    function getMarketItems() public view returns (uint[] memory) {
        uint currentId = 0;
        uint[] memory ids = new uint[](numberOfCharacters);
        for(uint i = 0; i < numberOfCharacters; i++) {
            if(characters[i].isBeingSold == true) {
                ids[currentId] = i;
                currentId++;
            }
        }
        return ids;
    }

    function getPriceById(uint id) public view returns (uint) {
        return prices[id];
    }

    //market functions

    function createMarketListing(
        uint256 tokenId,
        uint256 price
    ) public {
        require(price > 0, "Price can't be 0");
        prices[tokenId] = price;
        characters[tokenId].isBeingSold = true;
        _transfer(msg.sender, address(this), tokenId);

    }

    function createMarketSale(uint256 tokenId) public payable {
        require(characters[tokenId].isBeingSold == true, "This item is not for sale");

        payable(characters[tokenId].owner).transfer(msg.value);

        characters[tokenId].owner = payable(msg.sender);
        characters[tokenId].isBeingSold = false;
        _transfer(address(this), msg.sender, tokenId);
    }

    //proifle getter functions


    //boss minting function
    function mintNewBoss(string memory _name, string memory _description, uint256 _attack, string memory _image, uint _health, string memory _attackName) public {
        numberOfCharacters++;
        uint id = numberOfCharacters;

        bosses[id] = boss({
            owner: msg.sender,
            name: _name,
            description: _description,
            image: _image,
            health: _health,
            maxHealth: _health,
            attackDamage: _attack,
            attackName: _attackName
        });
        _safeMint(msg.sender, numberOfCharacters);
    }

    function getBossIds() public view returns (uint[] memory ids) {
        uint currentIndex = 0;
        uint[] memory bossList = new uint[](numberOfCharacters) ;
        for(uint i = 1; i <= numberOfCharacters; i++) {
            if(bosses[i].health > 0) {
                bossList[currentIndex] = i;
                currentIndex++;
            }
        }
        return bossList;
    }

    function getBossStringDataById(uint id) public view returns(boss memory current) {
        return bosses[id];
    }


}