import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { AlertCircle, LogOut } from 'lucide-react';

export const PaidAccessMessage = () => {
  const { signOut, user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-16 w-16 text-amber-500" />
          </div>
          <CardTitle className="text-2xl">Доступ ограничен</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Вход для просмотра данных платный, обратитесь к администратору или смотрите календарь уборок в Гугл таблицах.
          </p>
          
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-semibold text-lg">Стоимость подписки: $1 в месяц</p>
          </div>

          <p className="text-sm text-muted-foreground">
            Ваш email: {user?.email}
          </p>
          
          <Button 
            variant="outline" 
            onClick={signOut}
            className="mt-4"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Выйти
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
