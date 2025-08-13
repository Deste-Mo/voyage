import { AppStackParamList } from './navigation/AppStack';
import { AuthStackParamList } from './navigation/AuthStack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList, AuthStackParamList {}
  }
}