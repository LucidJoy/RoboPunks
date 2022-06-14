import React from "react";
import { Box, Button, Flex, Image, Link, Spacer } from "@chakra-ui/react";

import { FacebookIcon, TwitterIcon, EmailIcon, LinkedIn } from "../assets";

const NavBar = ({ accounts, setAccounts }) => {
  const isConnected = Boolean(accounts[0]);

  const connectAccount = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  };

  return (
    <Flex justify='space-between' align='center' padding='15px 30px'>
      <Flex justify='space-around' width='30%' padding='0 25px'>
        <Link href='https://www.facebook.com'>
          <Image
            src={FacebookIcon}
            boxSize='42px'
            margin='0 10px'
            _hover={{ transform: "scale(1.05)" }}
          />
        </Link>
        <Link href='https://twitter.com/LucidJoyy'>
          <Image
            src={TwitterIcon}
            boxSize='42px'
            margin='0 10px'
            _hover={{ transform: "scale(1.05)" }}
          />
        </Link>
        <Link href='https://github.com/LucidJoy'>
          <Image
            src={EmailIcon}
            boxSize='42px'
            margin='0 10px'
            _hover={{ transform: "scale(1.05)" }}
          />
        </Link>
      </Flex>

      <Flex
        justify='space-around'
        align='center'
        width='40%'
        padding='30px 30px 30px 30px'
      >
        <Box
          margin='0 15px'
          _hover={{ transform: "scale(1.05)", cursor: "pointer" }}
        >
          About
        </Box>
        <Spacer />
        <Box
          margin='0 15px'
          _hover={{ transform: "scale(1.05)", cursor: "pointer" }}
        >
          Mint
        </Box>
        <Spacer />
        <Box
          margin='0 15px'
          _hover={{ transform: "scale(1.05)", cursor: "pointer" }}
        >
          Team
        </Box>
        <Spacer />

        {isConnected ? (
          <Box
            margin='0 15px'
            inset='0'
            border='2px solid #D6517D'
            borderRadius='5px'
            padding='6px 12px'
            userSelect='none'
          >
            Connected
          </Box>
        ) : (
          <Button
            backgroundColor='#D6517D'
            borderRadius='5px'
            boxShadow='0px 2px 2px 1px #0F0F0F'
            color='white'
            cursor='pointer'
            fontFamily='inherit'
            Family='inherit'
            padding='15px'
            margin='0 15px'
            onClick={connectAccount}
            _hover={{ backgroundColor: "#c14971" }}
          >
            Connect
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default NavBar;
