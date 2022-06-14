// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RoboPunksNFT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    bool public isPublicMintEnabled;
    string internal baseTokenUri;
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints; //keep track of all mints that r done

    //run at the beginning of contract creation
    //                             name      symbol
    constructor() payable ERC721("RoboPunks", "RP") {
        mintPrice = 0.002 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 3;
        //set withdraw wallet address
    }

    //onlyOwner comes from 'Owner'
    //only the owner can run this
    function setIsPublicMintEnabled(bool isPublicMintEnabled_)
        external
        onlyOwner
    {
        isPublicMintEnabled = isPublicMintEnabled_;
    }

    //calldata allows us to know 'baseTokenUri_' will only be read
    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner {
        baseTokenUri = baseTokenUri_;
    }

    //this function actually exists in ERC721, already defined, but if we r defining 'baseTokenUri' in line 13, we hve to overwrite the function & make sure we r calling the correct variable, so open sea has correct URL to call
    //'baseTokenUri' consists of URL that has images, but 'tokenURI' is the function that opensea (<-- eg) calls to grab the images
    //called for each token, which gets displayed in opensea
    function tokenURI(uint256 tokenId_)
        public
        view
        override
        returns (string memory)
    {
        require(_exists(tokenId_), "Token does not exist.");
        //allows opensea to grab every URL of images
        return
            string(
                abi.encodePacked(
                    baseTokenUri,
                    Strings.toString(tokenId_),
                    ".json"
                )
            );
    }

    //withdraw funds
    function withdraw() external onlyOwner {
        //success is grabbed which is returned from RHS
        (bool success, ) = withdrawWallet.call{value: address(this).balance}(
            ""
        );
        require(success, "Withdraw failed.");
    }

    //payable-> any transaction that requires value transfer of ether
    function mint(uint256 quantity_) public payable {
        require(isPublicMintEnabled, "Minting not enabled");
        //make sure user is inputting correct price
        require(msg.value == quantity_ * mintPrice, "Wrong mint value");
        //make sure max supply is not exceeded
        require(totalSupply + quantity_ <= maxSupply, "Sold out");
        //
        require(
            walletMints[msg.sender] + quantity_ <= maxPerWallet,
            "Exceeded max wallet"
        );

        for (uint256 i = 0; i < quantity_; i++) {
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            //'_safeMint' func exists in ERC721
            //msg.sender is the person who calls this person
            _safeMint(msg.sender, newTokenId);
        }
    }
}
