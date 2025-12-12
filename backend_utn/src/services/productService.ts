import ProductModel from "../model/ProductModel";
import IProduct from "../interfaces/IProduct";

export const getAllProducts = async (filters: any) => {
  return await ProductModel.find(filters);
};

export const getProductById = async (id: string) => {
  return await ProductModel.findById(id);
};

export const createProduct = async (data: IProduct) => {
  return await ProductModel.create(data);
};

export const updateProduct = async (id: string, data: Partial<IProduct>) => {
  return await ProductModel.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProduct = async (id: string) => {
  return await ProductModel.findByIdAndDelete(id);
};
