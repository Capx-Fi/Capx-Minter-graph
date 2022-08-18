# Capx Minter Subgraph

[Capx Mint](https://github.com/Capx-Fi/Capx-Minter) is a decentralized application that allows users to create ERC20 tokens according to their needs on the Ethereum blockchain.

## Contracts
### CapxFactory.sol
Emits the data corresponding to all the types of tokens that can be created and the tokens that are created by the users.

## Example Query
### Querying all the types of token implementations available for a user to pick from
This query fetches information about all the types of tokens that can be created by the Factory.
```
{
  erc20Implementations {
    id
    address
    name
    ERC_20_Compliant
    Ownable
    Verified
    Mintable
    Burnable
    Pauseable
    Capped
    Taxable
    Liquidity_Generator
    Donation_Charity
    Yield_Generator
    advancedFeatures
  }
}
```
### Querying all the tokens that are created by the user
This query fetches information about all the tokens that are created by all users.
```
{
  tokenDeployeds {
    id
    typeOfToken
    tokenName
    tokenSymbol
    tokenDecimals
    tokenOwner
    tokenDeployer
    tokenTotalSupply
    tokenCreatedAt
    documentHash
  }
}
```

## Query URLs
Ethereum (currently Goerli)

Subgraph  | Query URL
----------------- | -------------
Factory Subgraph  | https://api.thegraph.com/subgraphs/name/varun-capx/mintgoerli

Binance Smart Chain (BSC) (currently Chapel)

Subgraph  | Query URL
------------- | -------------
Factory Subgraph  | https://api.thegraph.com/subgraphs/name/varun-capx/mintchapel

Matic (Polygon) (currently Mumbai)

Subgraph  | Query URL
------------- | -------------
Factory Subgraph  | https://api.thegraph.com/subgraphs/name/varun-capx/mintmumbai

Avalanche (currently Fuji)

Subgraph  | Query URL
------------- | -------------
Factory Subgraph  | https://api.thegraph.com/subgraphs/name/varun-capx/mintfuji
