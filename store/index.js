import { useUserStore } from './modules/user.js';
import { cancelRequestStore } from './modules/axios.js';

export default function indexStore() {
  return {
    userStore: useUserStore(),
    axiosStore: cancelRequestStore(),
  }
}