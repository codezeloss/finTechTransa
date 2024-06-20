const API_KEY = process.env.CRYPTO_API_KEY

export async function GET(request: any) {
    const limit = request.expoUrl?.searchParams?.get("limit") || 5

    const response = await fetch(
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=${limit}&convert=EUR`, {
            headers: {
                "X-CMC_PRO_API_KEY": API_KEY!
            }
        })

    const res = await response.json()
    // return Response.json(res.data);

    return Response.json(data);
}

const data = [{
    "id": 1,
    "name": "Bitcoin",
    "symbol": "BTC",
    "slug": "bitcoin",
    "num_market_pairs": 11115,
    "date_added": "2010-07-13T00:00:00.000Z",
    "tags": ["mineable", "pow", "sha-256", "store-of-value", "state-channel", "coinbase-ventures-portfolio", "three-arrows-capital-portfolio", "polychain-capital-portfolio", "binance-labs-portfolio", "blockchain-capital-portfolio", "boostvc-portfolio", "cms-holdings-portfolio", "dcg-portfolio", "dragonfly-capital-portfolio", "electric-capital-portfolio", "fabric-ventures-portfolio", "framework-ventures-portfolio", "galaxy-digital-portfolio", "huobi-capital-portfolio", "alameda-research-portfolio", "a16z-portfolio", "1confirmation-portfolio", "winklevoss-capital-portfolio", "usv-portfolio", "placeholder-ventures-portfolio", "pantera-capital-portfolio", "multicoin-capital-portfolio", "paradigm-portfolio", "bitcoin-ecosystem", "ftx-bankruptcy-estate"],
    "max_supply": 21000000,
    "circulating_supply": 19714671,
    "total_supply": 19714671,
    "infinite_supply": false,
    "platform": null,
    "cmc_rank": 1,
    "self_reported_circulating_supply": null,
    "self_reported_market_cap": null,
    "tvl_ratio": null,
    "last_updated": "2024-06-20T15:30:00.000Z",
    "quote": {
        "EUR": {
            "price": 60482.39892032769,
            "volume_24h": 21670791982.018913,
            "volume_change_24h": -17.8817,
            "percent_change_1h": -0.29971226,
            "percent_change_24h": -0.17788604,
            "percent_change_7d": -3.19142099,
            "percent_change_30d": -7.79520778,
            "percent_change_60d": -0.24662943,
            "percent_change_90d": 1.21978943,
            "market_cap": 1192390596005.0156,
            "market_cap_dominance": 54.0867,
            "fully_diluted_market_cap": 1270130377326.8845,
            "tvl": null,
            "last_updated": "2024-06-20T15:30:05.000Z"
        }
    }
}, {
    "id": 1027,
    "name": "Ethereum",
    "symbol": "ETH",
    "slug": "ethereum",
    "num_market_pairs": 9073,
    "date_added": "2015-08-07T00:00:00.000Z",
    "tags": ["pos", "smart-contracts", "ethereum-ecosystem", "coinbase-ventures-portfolio", "three-arrows-capital-portfolio", "polychain-capital-portfolio", "binance-labs-portfolio", "blockchain-capital-portfolio", "boostvc-portfolio", "cms-holdings-portfolio", "dcg-portfolio", "dragonfly-capital-portfolio", "electric-capital-portfolio", "fabric-ventures-portfolio", "framework-ventures-portfolio", "hashkey-capital-portfolio", "kenetic-capital-portfolio", "huobi-capital-portfolio", "alameda-research-portfolio", "a16z-portfolio", "1confirmation-portfolio", "winklevoss-capital-portfolio", "usv-portfolio", "placeholder-ventures-portfolio", "pantera-capital-portfolio", "multicoin-capital-portfolio", "paradigm-portfolio", "injective-ecosystem", "layer-1", "ftx-bankruptcy-estate"],
    "max_supply": null,
    "circulating_supply": 122275219.40355605,
    "total_supply": 122275219.40355605,
    "infinite_supply": true,
    "platform": null,
    "cmc_rank": 2,
    "self_reported_circulating_supply": null,
    "self_reported_market_cap": null,
    "tvl_ratio": null,
    "last_updated": "2024-06-20T15:30:00.000Z",
    "quote": {
        "EUR": {
            "price": 3285.2691717734424,
            "volume_24h": 15026763510.53783,
            "volume_change_24h": -6.7126,
            "percent_change_1h": 0.05313316,
            "percent_change_24h": -0.06525456,
            "percent_change_7d": 1.22077957,
            "percent_change_30d": -7.27167191,
            "percent_change_60d": 11.53301877,
            "percent_change_90d": 4.67990542,
            "market_cap": 401707008778.33655,
            "market_cap_dominance": 18.2198,
            "fully_diluted_market_cap": 401707008778.33435,
            "tvl": null,
            "last_updated": "2024-06-20T15:30:05.000Z"
        }
    }
}, {
    "id": 825,
    "name": "Tether USDt",
    "symbol": "USDT",
    "slug": "tether",
    "num_market_pairs": 89191,
    "date_added": "2015-02-25T00:00:00.000Z",
    "tags": ["stablecoin", "asset-backed-stablecoin", "avalanche-ecosystem", "solana-ecosystem", "arbitrum-ecosytem", "moonriver-ecosystem", "injective-ecosystem", "bnb-chain", "usd-stablecoin", "optimism-ecosystem", "fiat-stablecoin"],
    "max_supply": null,
    "circulating_supply": 112606076384.23582,
    "total_supply": 116084537290.48198,
    "platform": {
        "id": 1027,
        "name": "Ethereum",
        "symbol": "ETH",
        "slug": "ethereum",
        "token_address": "0xdac17f958d2ee523a2206206994597c13d831ec7"
    },
    "infinite_supply": true,
    "cmc_rank": 3,
    "self_reported_circulating_supply": null,
    "self_reported_market_cap": null,
    "tvl_ratio": null,
    "last_updated": "2024-06-20T15:30:00.000Z",
    "quote": {
        "EUR": {
            "price": 0.9326814133507829,
            "volume_24h": 47496592635.53747,
            "volume_change_24h": -11.888,
            "percent_change_1h": -0.01977468,
            "percent_change_24h": -0.00041431,
            "percent_change_7d": -0.01920493,
            "percent_change_30d": -0.03336891,
            "percent_change_60d": -0.07561536,
            "percent_change_90d": -0.04052523,
            "market_cap": 105025594473.93529,
            "market_cap_dominance": 4.7639,
            "fully_diluted_market_cap": 108269890308.25879,
            "tvl": null,
            "last_updated": "2024-06-20T15:30:05.000Z"
        }
    }
}, {
    "id": 1839,
    "name": "BNB",
    "symbol": "BNB",
    "slug": "bnb",
    "num_market_pairs": 2184,
    "date_added": "2017-07-25T00:00:00.000Z",
    "tags": ["marketplace", "centralized-exchange", "payments", "smart-contracts", "alameda-research-portfolio", "multicoin-capital-portfolio", "bnb-chain", "layer-1", "sec-security-token", "alleged-sec-securities", "celsius-bankruptcy-estate"],
    "max_supply": null,
    "circulating_supply": 147583799.7638493,
    "total_supply": 147583799.7638493,
    "infinite_supply": false,
    "platform": null,
    "cmc_rank": 4,
    "self_reported_circulating_supply": null,
    "self_reported_market_cap": null,
    "tvl_ratio": null,
    "last_updated": "2024-06-20T15:30:00.000Z",
    "quote": {
        "EUR": {
            "price": 556.4581884281193,
            "volume_24h": 1609850529.5728352,
            "volume_change_24h": -6.0093,
            "percent_change_1h": 0.22715126,
            "percent_change_24h": 0.28682476,
            "percent_change_7d": -0.79293895,
            "percent_change_30d": -3.50357663,
            "percent_change_60d": 3.89538213,
            "percent_change_90d": 6.68755269,
            "market_cap": 82124213857.92989,
            "market_cap_dominance": 3.7248,
            "fully_diluted_market_cap": 82124213857.93112,
            "tvl": null,
            "last_updated": "2024-06-20T15:30:05.000Z"
        }
    }
}, {
    "id": 5426,
    "name": "Solana",
    "symbol": "SOL",
    "slug": "solana",
    "num_market_pairs": 690,
    "date_added": "2020-04-10T00:00:00.000Z",
    "tags": ["pos", "platform", "solana-ecosystem", "cms-holdings-portfolio", "kenetic-capital-portfolio", "alameda-research-portfolio", "multicoin-capital-portfolio", "okx-ventures-portfolio", "layer-1", "ftx-bankruptcy-estate", "sec-security-token", "alleged-sec-securities", "cmc-crypto-awards-2024"],
    "max_supply": null,
    "circulating_supply": 461895839.78988606,
    "total_supply": 578462571.3406377,
    "infinite_supply": true,
    "platform": null,
    "cmc_rank": 5,
    "self_reported_circulating_supply": null,
    "self_reported_market_cap": null,
    "tvl_ratio": null,
    "last_updated": "2024-06-20T15:30:00.000Z",
    "quote": {
        "EUR": {
            "price": 125.1404402862787,
            "volume_24h": 2304169308.170996,
            "volume_change_24h": -4.3021,
            "percent_change_1h": 0.03385094,
            "percent_change_24h": -1.80171176,
            "percent_change_7d": -9.19804208,
            "percent_change_30d": -24.60150423,
            "percent_change_60d": -10.61766501,
            "percent_change_90d": -22.1124641,
            "market_cap": 57801848757.706795,
            "market_cap_dominance": 2.6221,
            "fully_diluted_market_cap": 72389060866.7032,
            "tvl": null,
            "last_updated": "2024-06-20T15:30:05.000Z"
        }
    }
}]