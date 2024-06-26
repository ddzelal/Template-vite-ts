import axiosInstance from "../config.ts";
import {Pagination} from "../../interfaces/global.interface.ts";


interface Article {
  articleId: string;
  quantity: number;
}

interface Notification {
  _id: string;
  companyId: string;
  expiresAt: string;
  filledAt?: string; // This field is optional
  description?: string; // This field is optional
  articles: Article[];
  filledBy: string;
  notificationReadBy: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}



interface GetRefillByCompanyIdResponse {
  data: Notification[];
  pagination: Pagination;
}


interface DecimalValue {
  $numberDecimal: string;
}

interface ArticleDetail {
  _id: string;
  name: string;
  price: DecimalValue;
  description: string;
  quantity: DecimalValue;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface CompanyDetail {
  _id: string;
  name: string;
  articleIds: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface FilledByDetail {
  _id: string;
  username: string;
  role: number;
  __v: number;
}

interface RemainingTime {
  days: number;
  hours: number;
}

export  interface NotificationData {
  _id: string;
  expiresAt: string;
  notificationReadBy: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  companyDetails: CompanyDetail[];
  filledByDetails: FilledByDetail[];
  articleDetails: ArticleDetail[];
  remainingTime: RemainingTime;
  formattedRemainingTime: string;
}

export interface RefillParfumeNotificationOptions {
  days?: number;
  page?: number;
  limit?: number;
  read?: boolean;
}

export interface RefillParfumRequest {
  companyId: string;
  expiresAt: string; // Datum u formatu 'YYYY-MM-DD'
  filledAt: string; // Datum u formatu 'YYYY-MM-DD'
  description?: string;
  articles: {
    articleId: string;
    quantity: number;
  }[];
}

export interface  GetAllRefillsResponse {
  data:NotificationData[];
  pagination:Pagination
}

export const refillParfum = async (data: RefillParfumRequest) => {
    const res = await axiosInstance.post('/refills', data);
    return res.data;

}


export const refillParfumeNotification = async (options: RefillParfumeNotificationOptions = { days: 7 }) :Promise<GetAllRefillsResponse> => {
  const { days = 7, page, limit, read } = options;

  let url = `/refills-notifications?days=${days}`;
  if (page !== undefined) {
    url += `&page=${page}`;
  }
  if (limit !== undefined) {
    url += `&limit=${limit}`;
  }
  if (read !== undefined) {
    url += `&read=${read}`;
  }

  const res = await axiosInstance.get(url);
  return res.data;
}


export const getRefillByCompanyId = async (companyId: string) :Promise<GetRefillByCompanyIdResponse> => {
  return await axiosInstance.get(`/refills?page=1&limit=9999&companyId=${companyId}&showExpired=false`)
}