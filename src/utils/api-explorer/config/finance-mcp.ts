/**
 * Finance MCP API Configuration
 * Market data and financial information API
 */

import type { APIConfiguration } from '../types';

export const financeMCPConfig: APIConfiguration = {
  id: 'finance-mcp',
  name: 'Finance MCP API',
  baseUrl: 'https://api.finance-mcp.example.com/v1',
  version: '1.0.0',
  description: 'Real-time market data and financial information API with comprehensive stock, crypto, and forex data.',
  documentation: 'https://docs.finance-mcp.example.com',
  repositoryUrl: 'https://github.com/yourusername/market-mcp',

  authentication: {
    type: 'apiKey',
    required: true,
    location: 'header',
    parameterName: 'X-API-Key',
    description: 'API key for authentication',
    placeholder: 'your-api-key-here',
  },

  globalHeaders: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },

  categories: ['Market Data', 'Stocks', 'Crypto', 'News', 'Analytics'],

  rateLimit: {
    requests: 100,
    period: '1 minute',
  },

  endpoints: [
    // Market Data
    {
      id: 'get-market-status',
      name: 'Get Market Status',
      method: 'GET',
      path: '/market/status',
      category: 'Market Data',
      description: 'Get current market status and trading hours',
      authentication: {
        type: 'apiKey',
        required: true,
        location: 'header',
        parameterName: 'X-API-Key',
      },
      examples: [
        {
          response: {
            status: 200,
            body: {
              status: 'open',
              market: 'NYSE',
              timezone: 'America/New_York',
              currentTime: '2025-01-20T14:30:00Z',
              marketOpen: '09:30:00',
              marketClose: '16:00:00',
              isHoliday: false,
            },
          },
        },
      ],
    },

    {
      id: 'get-market-overview',
      name: 'Get Market Overview',
      method: 'GET',
      path: '/market/overview',
      category: 'Market Data',
      description: 'Get overview of major market indices',
      authentication: {
        type: 'apiKey',
        required: true,
        location: 'header',
        parameterName: 'X-API-Key',
      },
      examples: [
        {
          response: {
            status: 200,
            body: {
              indices: [
                {
                  symbol: 'SPX',
                  name: 'S&P 500',
                  value: 4783.45,
                  change: 45.23,
                  changePercent: 0.95,
                },
                {
                  symbol: 'DJI',
                  name: 'Dow Jones',
                  value: 37863.80,
                  change: -125.50,
                  changePercent: -0.33,
                },
              ],
              timestamp: '2025-01-20T14:30:00Z',
            },
          },
        },
      ],
    },

    // Stock Data
    {
      id: 'get-stock-quote',
      name: 'Get Stock Quote',
      method: 'GET',
      path: '/stocks/{symbol}/quote',
      category: 'Stocks',
      description: 'Get real-time stock quote for a specific symbol',
      authentication: {
        type: 'apiKey',
        required: true,
        location: 'header',
        parameterName: 'X-API-Key',
      },
      parameters: {
        path: {
          symbol: {
            type: 'string',
            required: true,
            description: 'Stock symbol (e.g., AAPL, GOOGL)',
            example: 'AAPL',
          },
        },
      },
      examples: [
        {
          request: {
            path: { symbol: 'AAPL' },
          },
          response: {
            status: 200,
            body: {
              symbol: 'AAPL',
              name: 'Apple Inc.',
              price: 185.92,
              change: 2.45,
              changePercent: 1.34,
              volume: 52847392,
              marketCap: 2891000000000,
              pe_ratio: 30.45,
              week52High: 199.62,
              week52Low: 124.17,
              timestamp: '2025-01-20T14:30:00Z',
            },
          },
        },
      ],
    },

    {
      id: 'get-stock-history',
      name: 'Get Stock Historical Data',
      method: 'GET',
      path: '/stocks/{symbol}/history',
      category: 'Stocks',
      description: 'Get historical price data for a stock',
      authentication: {
        type: 'apiKey',
        required: true,
        location: 'header',
        parameterName: 'X-API-Key',
      },
      parameters: {
        path: {
          symbol: {
            type: 'string',
            required: true,
            description: 'Stock symbol',
            example: 'AAPL',
          },
        },
        query: {
          interval: {
            type: 'string',
            enum: ['1m', '5m', '15m', '1h', '1d', '1w', '1M'],
            default: '1d',
            description: 'Data interval',
          },
          from: {
            type: 'string',
            required: false,
            description: 'Start date (ISO 8601)',
            example: '2025-01-01',
          },
          to: {
            type: 'string',
            required: false,
            description: 'End date (ISO 8601)',
            example: '2025-01-20',
          },
          limit: {
            type: 'integer',
            default: 100,
            max: 1000,
            description: 'Maximum number of data points',
          },
        },
      },
      examples: [
        {
          request: {
            path: { symbol: 'AAPL' },
            query: { interval: '1d', limit: 5 },
          },
          response: {
            status: 200,
            body: {
              symbol: 'AAPL',
              interval: '1d',
              data: [
                {
                  timestamp: '2025-01-20T00:00:00Z',
                  open: 183.50,
                  high: 186.40,
                  low: 182.90,
                  close: 185.92,
                  volume: 52847392,
                },
                {
                  timestamp: '2025-01-19T00:00:00Z',
                  open: 181.25,
                  high: 184.15,
                  low: 180.80,
                  close: 183.47,
                  volume: 48932154,
                },
              ],
            },
          },
        },
      ],
    },

    {
      id: 'search-stocks',
      name: 'Search Stocks',
      method: 'GET',
      path: '/stocks/search',
      category: 'Stocks',
      description: 'Search for stocks by symbol or company name',
      authentication: {
        type: 'apiKey',
        required: true,
        location: 'header',
        parameterName: 'X-API-Key',
      },
      parameters: {
        query: {
          q: {
            type: 'string',
            required: true,
            description: 'Search query (symbol or company name)',
            example: 'apple',
          },
          limit: {
            type: 'integer',
            default: 10,
            max: 50,
            description: 'Maximum number of results',
          },
        },
      },
      examples: [
        {
          request: {
            query: { q: 'apple', limit: 5 },
          },
          response: {
            status: 200,
            body: {
              results: [
                {
                  symbol: 'AAPL',
                  name: 'Apple Inc.',
                  exchange: 'NASDAQ',
                  type: 'Common Stock',
                },
              ],
            },
          },
        },
      ],
    },

    // Cryptocurrency
    {
      id: 'get-crypto-quote',
      name: 'Get Crypto Quote',
      method: 'GET',
      path: '/crypto/{symbol}/quote',
      category: 'Crypto',
      description: 'Get real-time cryptocurrency quote',
      authentication: {
        type: 'apiKey',
        required: true,
        location: 'header',
        parameterName: 'X-API-Key',
      },
      parameters: {
        path: {
          symbol: {
            type: 'string',
            required: true,
            description: 'Crypto symbol (e.g., BTC, ETH)',
            example: 'BTC',
          },
        },
        query: {
          currency: {
            type: 'string',
            default: 'USD',
            enum: ['USD', 'EUR', 'GBP', 'JPY'],
            description: 'Quote currency',
          },
        },
      },
      examples: [
        {
          request: {
            path: { symbol: 'BTC' },
            query: { currency: 'USD' },
          },
          response: {
            status: 200,
            body: {
              symbol: 'BTC',
              name: 'Bitcoin',
              price: 43250.75,
              change24h: 1250.30,
              changePercent24h: 2.98,
              volume24h: 28500000000,
              marketCap: 845000000000,
              circulatingSupply: 19543218,
              currency: 'USD',
              timestamp: '2025-01-20T14:30:00Z',
            },
          },
        },
      ],
    },

    {
      id: 'get-top-cryptos',
      name: 'Get Top Cryptocurrencies',
      method: 'GET',
      path: '/crypto/top',
      category: 'Crypto',
      description: 'Get top cryptocurrencies by market cap',
      authentication: {
        type: 'apiKey',
        required: true,
        location: 'header',
        parameterName: 'X-API-Key',
      },
      parameters: {
        query: {
          limit: {
            type: 'integer',
            default: 10,
            max: 100,
            description: 'Number of cryptocurrencies to return',
          },
          currency: {
            type: 'string',
            default: 'USD',
            description: 'Quote currency',
          },
        },
      },
    },

    // News
    {
      id: 'get-market-news',
      name: 'Get Market News',
      method: 'GET',
      path: '/news',
      category: 'News',
      description: 'Get latest market news and updates',
      authentication: {
        type: 'apiKey',
        required: true,
        location: 'header',
        parameterName: 'X-API-Key',
      },
      parameters: {
        query: {
          category: {
            type: 'string',
            enum: ['general', 'stocks', 'crypto', 'forex', 'commodities'],
            default: 'general',
            description: 'News category',
          },
          limit: {
            type: 'integer',
            default: 10,
            max: 50,
            description: 'Number of news items',
          },
          since: {
            type: 'string',
            required: false,
            description: 'Get news since timestamp (ISO 8601)',
          },
        },
      },
      examples: [
        {
          request: {
            query: { category: 'stocks', limit: 5 },
          },
          response: {
            status: 200,
            body: {
              news: [
                {
                  id: '12345',
                  title: 'Tech Stocks Rally on Strong Earnings',
                  summary: 'Major tech companies beat earnings expectations...',
                  url: 'https://example.com/news/12345',
                  source: 'Financial Times',
                  publishedAt: '2025-01-20T12:00:00Z',
                  sentiment: 'positive',
                  relatedSymbols: ['AAPL', 'GOOGL', 'MSFT'],
                },
              ],
            },
          },
        },
      ],
    },

    {
      id: 'get-stock-news',
      name: 'Get Stock News',
      method: 'GET',
      path: '/stocks/{symbol}/news',
      category: 'News',
      description: 'Get news related to a specific stock',
      authentication: {
        type: 'apiKey',
        required: true,
        location: 'header',
        parameterName: 'X-API-Key',
      },
      parameters: {
        path: {
          symbol: {
            type: 'string',
            required: true,
            description: 'Stock symbol',
            example: 'AAPL',
          },
        },
        query: {
          limit: {
            type: 'integer',
            default: 10,
            max: 50,
            description: 'Number of news items',
          },
        },
      },
    },

    // Analytics
    {
      id: 'get-technical-indicators',
      name: 'Get Technical Indicators',
      method: 'GET',
      path: '/analytics/indicators/{symbol}',
      category: 'Analytics',
      description: 'Get technical indicators for a stock',
      authentication: {
        type: 'apiKey',
        required: true,
        location: 'header',
        parameterName: 'X-API-Key',
      },
      parameters: {
        path: {
          symbol: {
            type: 'string',
            required: true,
            description: 'Stock symbol',
            example: 'AAPL',
          },
        },
        query: {
          indicators: {
            type: 'string',
            required: false,
            description: 'Comma-separated list of indicators (RSI,MACD,SMA,EMA)',
            example: 'RSI,MACD,SMA',
          },
          interval: {
            type: 'string',
            enum: ['1d', '1w', '1M'],
            default: '1d',
            description: 'Data interval',
          },
        },
      },
      examples: [
        {
          request: {
            path: { symbol: 'AAPL' },
            query: { indicators: 'RSI,MACD', interval: '1d' },
          },
          response: {
            status: 200,
            body: {
              symbol: 'AAPL',
              interval: '1d',
              indicators: {
                RSI: {
                  value: 58.34,
                  signal: 'neutral',
                },
                MACD: {
                  macd: 2.45,
                  signal: 2.12,
                  histogram: 0.33,
                  trend: 'bullish',
                },
              },
              timestamp: '2025-01-20T14:30:00Z',
            },
          },
        },
      ],
    },
  ],
};
