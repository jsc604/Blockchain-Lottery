# Blockchain Lottery DApp

This is a decentralized application (DApp) for a blockchain lottery built on the Goerli testnet. The DApp utilizes the Lottery and LotteryToken smart contracts to facilitate a transparent and fair lottery experience. Participants can connect their MetaMask wallets, purchase tokens, and place bets in the lottery for a chance to win the prize. The DApp also provides features such as checking previous lottery results, displaying the prize pool, burning tokens, and more.

## Screenshots

![Screenshot 1](./media/Screenshot 2023-05-30 at 11.43.10 PM.png)
![Screenshot 2](./media/Screenshot 2023-05-30 at 11.21.25 PM.png)
<!-- 
## Demo

 -->

## Dependencies

- Node.js (v14 or higher)
- Yarn (v1.22 or higher) or npm (v6 or higher)
- MetaMask extension for your web browser

## Technologies Used

- Vite-React: A fast build tool and development server for React applications
- Ethereum: A blockchain network used for smart contract deployment and interactions
- Hardhat: A development environment for Ethereum that helps with contract compilation, testing, and deployment
- Wagmi Hooks: A library for interacting with Ethereum smart contracts using React hooks
- NestJS: A backend framework for building scalable and modular applications
- Alchemy: An infrastructure provider for Ethereum that offers APIs for accessing blockchain data
- Chakra UI: A simple and modular UI component library for React applications

- ![Vite-React](https://fontawesome.com/icons?icon=react)
- ![Ethereum](https://fontawesome.com/icons?icon=ethereum)
- ![Hardhat](https://fontawesome.com/icons?icon=code)
- ![Wagmi Hooks](https://fontawesome.com/icons?icon=react)
- ![NestJS](https://fontawesome.com/icons?icon=node-js)
- ![Alchemy](https://fontawesome.com/icons?icon=database)
- ![Chakra UI](https://fontawesome.com/icons?icon=palette)

## Getting Started

Follow these steps to set up and run the DApp locally:

1. Install Node.js and a package manager (Yarn or npm).
2. Install the MetaMask extension in your web browser and set up an account.
3. Clone this repository and navigate to the project directory.
4. Install the project dependencies by running `yarn install` or `npm install`.
5. Configure your environment variables:
   - Set the `ALCHEMY_API_KEY` in the `.env` file to your Alchemy API key.
   - Set the `TOKEN_ADDRESS` in the `.env` file to the Lottery Token contract address: `0xFa373FC78E6C2bc020B18593F58575115F8A48A5`.
   - Set the `LOTTERY_ADDRESS` in the `.env` file to the Lottery contract address: `0x687A9e790d3C1C92597BA19b2Ee69b3A19dbdb3c`.
6. Start the frontend development server by running `yarn dev` or `npm run dev`.
7. Access the DApp in your web browser by typing `--host` in your CLI.

## Features

- Open the lottery for a specified duration.
- Participants can buy tokens using MetaMask and place bets in the lottery.
- Check if a participant has won a prize from the previous lottery.
- Display and update the prize pool in real-time.
- Withdraw fee tokens by the contract owner.
- Participants can choose to burn their tokens.
- Display the live closing time of the lottery.
- Prevent participants from betting after the closing time has passed.
- Close the lottery and allocate the prize randomly to a participant.
- Restart the lottery.

## Backend

The DApp also includes a backend built with NestJS to handle necessary queries and provide additional functionality if needed. The backend enables seamless communication between the frontend and the Ethereum blockchain. It can be a quicker way for the owner to write functions.
