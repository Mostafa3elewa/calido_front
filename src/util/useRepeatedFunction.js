import customFetch, { checkForUnauthorizedResponse } from '@/util/axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useMainContext } from '@/contexts/MainContext';
import Cookies from 'js-cookie';

export const useAddProductToCart = () => {
  const { removeUser, getCart } = useMainContext();
  const token = Cookies.get('calidoUser');
  const router = useRouter();
  const addPr = async ({ product, found }) => {
    if (!token) {
      toast.error('please sign in first');
      return;
    }
    if (found) {
      router.push('/cart');
      return;
    }
    try {
      await customFetch.post('/cart', {
        product: product?.id,
        quantity: 1,
      });
      getCart();
      toast.success('added successfully...');
    } catch (error) {
      checkForUnauthorizedResponse(error, removeUser);
    }
  };
  return { addPr };
};
