import { describe, test, expect, beforeAll, beforeEach } from '@jest/globals';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import * as algokit from '@algorandfoundation/algokit-utils';
import algosdk, { Kmd } from 'algosdk';
import { NftMarketplaceClient } from '../contracts/clients/NftMarketplaceClient';

const fixture = algorandFixture();

let appClient: NftMarketplaceClient;
let algod2: algosdk.Algodv2;
let testAccount2: algosdk.Account;
let appAddress: string;
describe('NftMarketplace', () => {
  beforeEach(fixture.beforeEach);
  let nft: bigint;

  beforeAll(async () => {
    await fixture.beforeEach();
    const { algod, testAccount } = fixture.context;
    algod2 = algod;
    testAccount2 = testAccount;
    appClient = new NftMarketplaceClient(
      {
        sender: testAccount2,
        resolveBy: 'id',
        id: 0,
      },
      algod2
    );
    await appClient.create.createApplication({});
    const temp = await appClient.getApplicationAddress({});
    appAddress = temp.return!.valueOf();
    console.log(appAddress);
  });

  test('mintNFT', async () => {
    await appClient.appClient.fundAppAccount(algokit.microAlgos(500_000));
    const bootstrapResult = await appClient.mintNft(
      {
        name: 't1 vs weibo',
        url: 'https://google.com',
      },
      {
        sendParams: {
          fee: algokit.microAlgos(2000),
        },
      }
    );
    nft = bootstrapResult.return!.valueOf();
    console.log(nft);
  });

  test('create event', async () => {
    try {
      await appClient.createEvent(
        {
          name: 'test',
          nft1: 1,
          nft2: 2,
          nft3: 3,
          nft1price: 1,
          nft2price: 2,
          nft3price: 3,
        },
        { boxes: [algosdk.encodeUint64(0)] }
      );
    } catch (e) {
      console.warn(e);
      throw e;
    }
  });

  test('mapNFTdata', async () => {
    const template = new TextEncoder().encode('n');
    const combined = new Uint8Array([...template, ...algosdk.encodeUint64(0)]);
    try {
      await appClient.mapNfTdata(
        {
          nft,
          eventId: 0,
          nftType: 1,
        },
        { boxes: [combined] }
      );
    } catch (e) {
      console.warn(e);
      throw e;
    }
  });

  test('buyNFTfromEvent', async () => {
    const temp = await appClient.getApplicationAddress({});
    const appAddress = temp.return!.valueOf();
    console.log(appAddress);

    const payment = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: testAccount2.addr,
      to: appAddress,
      amount: 100,
      suggestedParams: await algokit.getTransactionParams(undefined, algod2),
    });

    // opted in
    const registeredAsaOptInTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: testAccount2.addr,
      to: testAccount2.addr,
      amount: 0,
      suggestedParams: await algokit.getTransactionParams(undefined, algod2),
      assetIndex: Number(nft),
    });

    await algokit.sendTransaction({ from: testAccount2, transaction: registeredAsaOptInTxn }, algod2);

    try {
      await appClient.buyNftFromEvent(
        { payment, nft },
        {
          sender: testAccount2,
          sendParams: {
            fee: algokit.microAlgos(3000),
          },
        }
      );
    } catch (e) {
      console.warn(e);
      throw e;
    }
  });

  test('listing nft', async () => {
    const template = new TextEncoder().encode('o');
    const combined = new Uint8Array([...template, ...algosdk.encodeUint64(0)]);

    const axfer = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: testAccount2.addr,
      to: appAddress,
      closeRemainderTo: appAddress,
      amount: 1,
      assetIndex: Number(nft),
      suggestedParams: await algokit.getTransactionParams(undefined, algod2),
    });

    try {
      await appClient.listingNft(
        {
          nft,
          price: 100,
          axfer,
        },
        { sender: testAccount2, boxes: [combined] }
      );
    } catch (e) {
      console.warn(e);
      throw e;
    }
  });

  // test('unlisting nft', async () => {
  //   const { appAddress } = await appClient.appClient.getAppReference();
  //   const template = new TextEncoder().encode('o');
  //   const combined = new Uint8Array([...template, ...algosdk.encodeUint64(0)]);
  //   try {
  //     await appClient.unListingNft(
  //       {
  //         orderId: 0,
  //         nft: nft,
  //       },
  //       {
  //         boxes: [combined],
  //         sendParams: {
  //           fee: algokit.microAlgos(2000),
  //         }
  //       }
  //     );
  //   } catch (e) {
  //     console.warn(e);
  //     throw e;
  //   }
  // });

  test('buyNFTFromMarketplace', async () => {
    const payment = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: testAccount2.addr,
      to: appAddress,
      amount: 100,
      suggestedParams: await algokit.getTransactionParams(undefined, algod2),
    });

    // opted in
    const registeredAsaOptInTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: testAccount2.addr,
      to: testAccount2.addr,
      amount: 0,
      suggestedParams: await algokit.getTransactionParams(undefined, algod2),
      assetIndex: Number(nft),
    });

    await algokit.sendTransaction({ from: testAccount2, transaction: registeredAsaOptInTxn }, algod2);

    try {
      await appClient.buyNftFromMarketplace(
        {
          orderId: 0,
          payment,
          nft,
        },
        {
          sendParams: {
            fee: algokit.microAlgos(2000),
          },
        }
      );
    } catch (e) {
      console.warn(e);
      throw e;
    }
  });
});
