import { Request, Response } from "express";
import { ICartProduct } from "../../interfaces/cart/ICartProduct";
import { ICartRequestData } from "../../interfaces/cart/ICartRequestData";
import Product from "../../models/productModel";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const cartCalculate = async (req: Request, res: Response) => {
  try {
    const porductData = req.body as Array<ICartRequestData>;
    const productsIds = porductData.map(product => product._id)

    const products = await Product.find().where('_id').in(productsIds).exec();

    const cartProducts = [] as Array<ICartProduct>;
    
    products.map(product => {
      const isInArray = products.some(item => item._id === product._id);
      
      let ammount = 1;
      if(isInArray) {
        const productId = product._id.valueOf();
        const itemIndex = porductData.findIndex(item => item._id === productId);

        ammount = porductData[itemIndex].ammount;
      }

      const cartProduct: ICartProduct = {
        _id: product._id,
        images: product.images,
        price: product.price,
        subcategoryId: product.subcategoryId,
        title: product.title,
        ammount
      }

      return cartProducts.push(cartProduct)
    });

    let totalPrice = 0;
    let totalAmmount = 0;
    cartProducts.map(product => {
      totalAmmount += product.ammount;
      return totalPrice = +((totalPrice*100 + (product.price * 100)*product.ammount)/100).toFixed(2)
    });

    res.status(200).send({cartProducts, totalPrice, totalAmmount})
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Calculate cart failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default cartCalculate;