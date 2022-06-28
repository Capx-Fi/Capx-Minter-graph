import { bigInt, BigInt, Entity } from "@graphprotocol/graph-ts"
import {
  CapxFactory,
  AdminChanged,
  BeaconUpgraded,
  Initialized,
  NewERC20Implementation,
  NewTokenDeployed,
  OwnershipTransferred,
  Upgraded
} from "../generated/CapxFactory/CapxFactory"

import {ERC20Token} from "../generated/CapxFactory/ERC20Token"
import { TokenDeployed,ERC20Implementation  } from "../generated/schema"

export function handleAdminChanged(event: AdminChanged): void {
}

export function handleBeaconUpgraded(event: BeaconUpgraded): void {}

export function handleInitialized(event: Initialized): void {}

export function handleNewERC20Implementation(
  event: NewERC20Implementation
): void {
  // entity's id is the token ype number of the implementation
  // entity's address is the address of the implementation
  // entity's name is the name of the token type
  // The id (token type number) is the unique identifier
  // The advanced feature indicates the blanks required for each type of token where the
  // * [0] represents initial supply
  // * [1] represents total supply
  // * [2] represents Tax fee percentage
  // * [3] represents Burn fee percentage
  // * [4] represents Liquidity fee percentage
  // * [5] represents Marketing fee percentage
  // * [6] represents Auto LP threshold 
  // * [7] represents Marketing wallet address

  let entity = ERC20Implementation.load(event.params.typeID.toHex())
  if (entity == null) {
    entity = new ERC20Implementation(event.params.typeID.toHex())
  }
  entity.address = event.params.implementation.toHex()
  entity.name = event.params.typeOfToken
  entity.ERC_20_Compliant = true
  entity.Verified = true
  entity.Ownable = true

  if(event.params.isReflective) {
    entity.Mintable = false
    entity.Burnable = false
    entity.Pauseable = false
    entity.Yield_Generator = event.params.features[0]
    entity.Taxable = event.params.features[1]
    entity.Liquidity_Generator = event.params.features[2]
    entity.Donation_Charity = event.params.features[3]
    entity.Capped = true;
    entity.advancedFeatures = "10100000"
    
      if (event.params.features[1]) {
        entity.advancedFeatures = entity.advancedFeatures!.substring(0,3) + "1" + entity.advancedFeatures!.substring(4)
      }
      if (event.params.features[2]) {
        entity.advancedFeatures = entity.advancedFeatures!.substring(0,4) + "1" + entity.advancedFeatures!.substring(5)
        entity.advancedFeatures = entity.advancedFeatures!.substring(0,6) + "1" + entity.advancedFeatures!.substring(7)
      }
      if (event.params.features[3]) {
        entity.advancedFeatures = entity.advancedFeatures!.substring(0,5) + "1" + entity.advancedFeatures!.substring(6)
        entity.advancedFeatures = entity.advancedFeatures!.substring(0,7) + "1"
      }
    } else {
    entity.Mintable = event.params.features[0]
    entity.Burnable = event.params.features[1]
    entity.Pauseable = event.params.features[2]
    entity.Capped = event.params.features[3]
    entity.Yield_Generator = false
    entity.Taxable = false
    entity.Liquidity_Generator = false
    entity.Donation_Charity = false
    entity.advancedFeatures = "10000000"
    if (event.params.features[3]) {
      entity.advancedFeatures = entity.advancedFeatures!.substring(0,1) + "1" + entity.advancedFeatures!.substring(2)
    } 
    }

    entity.save()
  }
  
  

export function handleNewTokenDeployed(event: NewTokenDeployed): void {
  // entity's id is the deployed address of the token
  // entity's typeOfToken is the type of token of the token , which is also the id of the erc20implementation entity which describes it
  // entity's documentHash is the hash of the document which describes the token

  let token = TokenDeployed.load(event.params.token.toHex())
  if (!token) {
    token = new TokenDeployed(event.params.token.toHex()) 
  }
  token.typeOfToken = event.params.tokenType
  let erc20instance = ERC20Token.bind(event.params.token)
  token.tokenName = (erc20instance.name())
  token.tokenSymbol = erc20instance.symbol()
  token.tokenDecimals = BigInt.fromI32(erc20instance.decimals())
  token.tokenTotalSupply = (erc20instance.totalSupply())
  token.tokenOwner = (erc20instance.owner().toHex())
  token.tokenDeployer = event.transaction.from.toHex()
  token.tokenCreatedAt = event.block.timestamp
  token.documentHash = event.params.documentHash
  token.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleUpgraded(event: Upgraded): void {}
