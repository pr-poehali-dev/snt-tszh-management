import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedOrg, setSelectedOrg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const testOrganizations = [
    { id: 1, name: 'СНТ "Солнечный"' },
    { id: 2, name: 'ТСЖ "Зелёный двор"' },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !selectedOrg) {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Заполните все поля',
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const testUsers = {
        'admin@solnechny.ru': { role: 'admin', name: 'Иванов Сергей' },
        'member1@solnechny.ru': { role: 'member', name: 'Петрова Анна' },
        'supervisor@system.ru': { role: 'supervisor', name: 'Козлов Дмитрий' },
      };

      const user = testUsers[email as keyof typeof testUsers];
      
      if (user && password === 'password123') {
        localStorage.setItem('user', JSON.stringify({
          email,
          role: user.role,
          name: user.name,
          organizationId: selectedOrg,
        }));

        toast({
          title: 'Успешный вход',
          description: `Добро пожаловать, ${user.name}!`,
        });

        navigate('/dashboard');
      } else {
        toast({
          variant: 'destructive',
          title: 'Ошибка входа',
          description: 'Неверный email или пароль',
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Icon name="Building2" className="text-white" size={32} />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Вход в систему</CardTitle>
          <CardDescription>Система управления СНТ/ТСЖ</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@mail.ru"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="organization">Организация</Label>
              <Select value={selectedOrg} onValueChange={setSelectedOrg} disabled={isLoading}>
                <SelectTrigger id="organization">
                  <SelectValue placeholder="Выберите организацию" />
                </SelectTrigger>
                <SelectContent>
                  {testOrganizations.map((org) => (
                    <SelectItem key={org.id} value={org.id.toString()}>
                      {org.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" className="mr-2 animate-spin" size={16} />
                  Вход...
                </>
              ) : (
                <>
                  <Icon name="LogIn" className="mr-2" size={16} />
                  Войти
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm font-semibold text-gray-700 mb-2">Тестовые аккаунты:</p>
            <div className="space-y-1 text-xs text-gray-600">
              <p><strong>Администратор:</strong> admin@solnechny.ru</p>
              <p><strong>Участник:</strong> member1@solnechny.ru</p>
              <p><strong>Супервизор:</strong> supervisor@system.ru</p>
              <p className="mt-2"><strong>Пароль для всех:</strong> password123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
