import { bigInt, BigInt } from "@graphprotocol/graph-ts"
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
import { TokenDeployed,ERC20Implementation } from "../generated/schema"

export function handleAdminChanged(event: AdminChanged): void {
}

export function handleBeaconUpgraded(event: BeaconUpgraded): void {}

export function handleInitialized(event: Initialized): void {}

export function handleNewERC20Implementation(
  event: NewERC20Implementation
): void {
  let entity = ERC20Implementation.load(event.params.typeID.toHex())
  if (entity == null) {
    entity = new ERC20Implementation(event.params.typeID.toHex())
  }
  entity.tokenAddress = event.params.implementation.toHex()
  entity.tokenTypeString = event.params.typeOfToken
  entity.save()
}

export function handleNewTokenDeployed(event: NewTokenDeployed): void {
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
  token.tokenOwner = event.params.owner.toHex()
  token.tokenDeployer = event.transaction.from.toHex()
  token.tokenCreatedAt = event.block.timestamp
  token.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleUpgraded(event: Upgraded): void {}
