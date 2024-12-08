
import { externalApi } from '../config/Instance'; // Axios instance đã tạo trước đó
import { ErrorType } from './Authservices';

export interface Province {
  code: string;
  name: string;
}

export interface District {
  code: string;
  name: string;
  province_code:string
}

export interface Ward {
  code: string;
  name: string;
  district_code:string
}
export type ProvinceAll={
  province:string
  district:string
  ward:string
}

export const fetchProvinces = async (): Promise<Province[]> => {
  try {
    const response = await externalApi.get<Province[]>('p/');
    return response.data;
  } catch (error) {
    console.log((error as ErrorType).message);
    throw new Error('Unable to fetch provinces.');
  }
};


export const fetchDistricts = async (provinces: string): Promise<District[]> => {
  try {
    const response = await externalApi.get<District[]>(`d/`);
    const districts = response.data;
    const filterDistrict= districts.filter(d=>d.province_code==provinces)
    
    return filterDistrict
    
    
    
  } catch (error) {
    console.error((error as ErrorType).message);
    throw new Error('Unable to fetch districts.');
  }
};


export const fetchWards = async (districts: string): Promise<Ward[]> => {
  try {
    const response = await externalApi.get<Ward[]>(`w/`);
    const ward= response.data;
    const filterWard=ward.filter(w=>w.district_code==districts)
    return filterWard
  } catch (error) {
    console.error((error as ErrorType).message);
    throw new Error('Unable to fetch wards.');
  }
};

