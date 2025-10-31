import { createFinanceAPIHandler } from "@/utils/finance-api";

export const prerender = false;

export const GET = createFinanceAPIHandler("get_intraday_price_stock");
