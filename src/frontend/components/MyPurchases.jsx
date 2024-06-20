import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export default function MyPurchases({ marketplace, nft, account }) {
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState([]);

  const loadPurchasedItems = async () => {
    // Fetch purchased items from marketplace by querying Bought events with the buyer set as the user
    const filter = marketplace.filters.Bought(null, null, null, null, null, account);
    const results = await marketplace.queryFilter(filter);
    // Fetch metadata of each nft and add that to listedItem object.
    const purchases = await Promise.all(
      results.map(async (i) => {
        // fetch arguments from each result
        i = i.args;
        // get uri url from nft contract
        const uri = await nft.tokenURI(i.tokenId);
        // use uri to fetch the nft metadata stored on IPFS 
        const response = await fetch(uri);
        const metadata = await response.json();
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(i.itemId);
        // define purchased item object
        let purchasedItem = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image
        };
        return purchasedItem;
      })
    );
    setLoading(false);
    setPurchases(purchases);
  };

  useEffect(() => {
    loadPurchasedItems();
  }, []);

  if (loading) {
    return (
      <main className="flex justify-center items-center h-64">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </main>
    );
  }

  return (
    <div className="flex justify-center py-8">
      {purchases.length > 0 ? (
        <div className="container px-5 py-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-5">
            {purchases.map((item, idx) => (
              <div key={idx} className="overflow-hidden rounded-lg shadow-lg">
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                <div className="p-4 bg-gray-800 text-white">
                  {ethers.utils.formatEther(item.totalPrice)} ETH
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <main className="flex justify-center items-center h-64">
          <h2 className="text-xl font-semibold">No purchases</h2>
        </main>
      )}
    </div>
  );
}
