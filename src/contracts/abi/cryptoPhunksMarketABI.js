export const cryptoPhunksMarketAbi = [
  {
    inputs: [
      { internalType: 'address', name: 'initialPaycAddress', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Paused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'paycIndex',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'fromAddress',
        type: 'address',
      },
    ],
    name: 'PaycBidEntered',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'paycIndex',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'fromAddress',
        type: 'address',
      },
    ],
    name: 'PaycBidWithdrawn',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'paycIndex',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'fromAddress',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'toAddress',
        type: 'address',
      },
    ],
    name: 'PaycBought',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'paycIndex',
        type: 'uint256',
      },
    ],
    name: 'PaycNoLongerForSale',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'paycIndex',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'minValue',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'toAddress',
        type: 'address',
      },
    ],
    name: 'PaycOffered',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Unpaused',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'paycIndex', type: 'uint256' },
      { internalType: 'uint256', name: 'minPrice', type: 'uint256' },
    ],
    name: 'acceptBidForPayc',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'paycIndex', type: 'uint256' }],
    name: 'buyPayc',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'paycIndex', type: 'uint256' }],
    name: 'enterBidForPayc',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getPaycOnSaleStatus',
    outputs: [{ internalType: 'bool[10000]', name: '', type: 'bool[10000]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'paycIndex', type: 'uint256' }],
    name: 'isPaycOnSale',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'paycIndex', type: 'uint256' },
      { internalType: 'uint256', name: 'minSalePriceInWei', type: 'uint256' },
    ],
    name: 'offerPaycForSale',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'paycIndex', type: 'uint256' },
      { internalType: 'uint256', name: 'minSalePriceInWei', type: 'uint256' },
      { internalType: 'address', name: 'toAddress', type: 'address' },
    ],
    name: 'offerPaycForSaleToAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'paycAddress',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'paycBids',
    outputs: [
      { internalType: 'bool', name: 'hasBid', type: 'bool' },
      { internalType: 'uint256', name: 'paycIndex', type: 'uint256' },
      { internalType: 'address', name: 'bidder', type: 'address' },
      { internalType: 'uint256', name: 'value', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'paycIndex', type: 'uint256' }],
    name: 'paycNoLongerForSale',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'paycOfferedForSale',
    outputs: [
      { internalType: 'bool', name: 'isForSale', type: 'bool' },
      { internalType: 'uint256', name: 'paycIndex', type: 'uint256' },
      { internalType: 'address', name: 'seller', type: 'address' },
      { internalType: 'uint256', name: 'minValue', type: 'uint256' },
      { internalType: 'address', name: 'onlySellTo', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'paycOnSaleStatus',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'pendingWithdrawals',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'newPaycAddress', type: 'address' },
    ],
    name: 'setPaycContract',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'paycIndex', type: 'uint256' }],
    name: 'withdrawBidForPayc',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]