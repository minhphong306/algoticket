import { Contract } from '@algorandfoundation/tealscript';

/* eslint-disable */
/* eslint-disable-next-line padded-blocks */
type eventData = {
  name: string,
  nft1: number,
  nft2: number,
  nft3: number,
  nft1_price: number,
  nft2_price: number,
  nft3_price: number,
};

type nftData = {
  eventId: number,
  nftType: uint64,
  nftAsset: Asset,
};

type orderData = {
  owner: Address,
  price: uint64,
  nft: Asset,
  status: uint64; // 0 false 1 true
};

// eslint-disable-next-line no-unused-vars
class Algoticket extends Contract {

  eventIndex = GlobalStateKey<uint64>();

  nftIndex = GlobalStateKey<uint64>();

  orderIndex = GlobalStateKey<uint64>();

  event = BoxMap<uint64, eventData>({});

  nft = GlobalStateKey<Asset>();

  nftDataMap = BoxMap<uint64, nftData>({ prefix: 'n' });

  order = BoxMap<uint64, orderData>({ prefix: 'o' });

  createApplication(): void {
    this.eventIndex.value = 0;
    this.orderIndex.value = 0;
    this.nftIndex.value = 0;
  }

  createEvent(
    name: string,
    nft1: number,
    nft2: number,
    nft3: number,
    nft1price: number,
    nft2price: number,
    nft3price: number
  ): void {
    const temp: eventData = {
      name: name,
      nft1: nft1,
      nft2: nft2,
      nft3: nft3,
      nft1_price: nft1price,
      nft2_price: nft2price,
      nft3_price: nft3price,
    };

    this.event(this.eventIndex.value).value = temp;
    this.eventIndex.value = this.eventIndex.value + 1;
  }

  mintNFT(name: string, url: string, eventId: uint64, nftType: uint64, payment: PayTxn): Asset {
    const nftTicket = sendAssetCreation({
      configAssetTotal: 1,
      configAssetName: name,
      configAssetURL: url,
    });

    this.nft.value = nftTicket;

    // Check ticket left
    if (nftType === 1) {
      assert(this.event(eventId).value.nft1 > 0);
      this.event(eventId).value.nft1 = this.event(eventId).value.nft1 - 1;
    }
    if (nftType === 2) {
      assert(this.event(eventId).value.nft2 > 0);
      this.event(eventId).value.nft2 = this.event(eventId).value.nft2 - 1;
    }
    if (nftType === 3) {
      assert(this.event(eventId).value.nft3 > 0);
      this.event(eventId).value.nft3 = this.event(eventId).value.nft3 - 1;
    }

    const temp: nftData = {
      eventId: eventId,
      nftType: nftType,
      nftAsset: this.nft.value,
    };

    this.nftDataMap(this.nftIndex.value).value = temp;
    this.nftIndex.value = this.nftIndex.value + 1;

    // Get Price
    let price = 0;
    if (nftType === 1) {
      price = this.event(eventId).value.nft1_price;
    }
    if (nftType === 2) {
      price = this.event(eventId).value.nft2_price;
    }
    if (nftType === 3) {
      price = this.event(eventId).value.nft3_price;
    }

    // Check Money Enough
    verifyTxn(payment, {
      sender: this.txn.sender,
      amount: { greaterThan: price },
    });

    // Send Asset
    sendAssetTransfer({
      xferAsset: this.nft.value,
      assetReceiver: this.txn.sender,
      assetAmount: 1,
    });
    return this.nft.value;
  }

  listingNFT(nft: Asset, price: number, axfer: AssetTransferTxn): void {
    // verfiy Txn
    verifyTxn(axfer, { assetReceiver: this.app.address });

    // create order
    const temp: orderData = {
      owner: this.txn.sender,
      price: price,
      nft: nft,
      status: 0,
    };

    this.order(this.orderIndex.value).value = temp;
    this.orderIndex.value = this.orderIndex.value + 1;
  }

  unListingNFT(orderId: number): void {
    // verify owner
    assert(this.txn.sender === this.order(orderId).value.owner);

    // check Status of NFT
    assert(this.order(orderId).value.status === 1);

    this.order(orderId).value.status = 1;

    // Transfer NFT to owner
    sendAssetTransfer({
      xferAsset: this.order(orderId).value.nft,
      assetReceiver: this.txn.sender,
      assetAmount: 1,
    });
  }

  buyNFT(orderId: number, payment: PayTxn): void {
    // Check order status
    assert(this.order(orderId).value.status === 0);
    // Check enough money to buy
    verifyTxn(payment, {
      sender: this.txn.sender,
      amount: { greaterThan: this.order(orderId).value.price },
      receiver: this.order(orderId).value.owner,
    });

    // Transfer Asset
    sendAssetTransfer({
      xferAsset: this.order(orderId).value.nft,
      assetReceiver: this.txn.sender,
      assetAmount: 1,
    });
  }

  getEventName(eventId: number): string {
    return this.event(eventId).value.name;
  }

  getNFTAmountLeft(eventId: number, nftType: uint64): number {
    if (nftType === 1) {
      return this.event(eventId).value.nft1;
    }
    if (nftType === 2) {
      return this.event(eventId).value.nft2;
    }
    if (nftType === 3) {
      return this.event(eventId).value.nft3;
    }
    return 0;
  }

  getNFTPrice(eventId: number, nftType: uint64): number {
    if (nftType === 1) {
      return this.event(eventId).value.nft1_price;
    }
    if (nftType === 2) {
      return this.event(eventId).value.nft2_price;
    }
    if (nftType === 3) {
      return this.event(eventId).value.nft3_price;
    }
    return 0;
  }

  getEventByNFT(nftIndex: number): number {
    return this.nftDataMap(nftIndex).value.eventId;
  }

  getNFTType(nftIndex: number): number {
    return this.nftDataMap(nftIndex).value.nftType;
  }

  getNFTAsset(nftIndex: number): Asset {
    return this.nftDataMap(nftIndex).value.nftAsset;
  }

  getOrderOwner(orderId: number): Address {
    return this.order(orderId).value.owner;
  }

  getOrderNFT(orderId: number): Asset {
    return this.order(orderId).value.nft;
  }

  getOrderPrice(orderId: number): number {
    return this.order(orderId).value.price;
  }

  getOrderStatus(orderId: number): number {
    return this.order(orderId).value.status;
  }
}
