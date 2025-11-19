import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface User {
  email: string;
  role: 'member' | 'admin' | 'supervisor';
  name: string;
  organizationId: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast({
      title: 'Выход выполнен',
      description: 'До свидания!',
    });
    navigate('/login');
  };

  if (!user) return null;

  const isAdmin = user.role === 'admin' || user.role === 'supervisor';
  const isSupervisor = user.role === 'supervisor';
  const isMember = user.role === 'member';

  const stats = [
    { label: 'Всего участников', value: '247', change: '+12', icon: 'Users', color: 'text-blue-500', visible: true },
    { label: 'Общая задолженность', value: '₽1.2М', change: '-8%', icon: 'TrendingDown', color: 'text-red-500', visible: isAdmin },
    { label: 'Платежей за месяц', value: '₽3.8М', change: '+15%', icon: 'TrendingUp', color: 'text-green-500', visible: isAdmin },
    { label: 'Открытых обращений', value: '23', change: '+5', icon: 'MessageSquare', color: 'text-purple-500', visible: true },
  ];

  const handleMeterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Показания приняты',
      description: 'Ваши показания счётчиков успешно сохранены',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Icon name="Building2" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">СНТ "Солнечный"</h1>
                <p className="text-xs text-gray-500">{user.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className={
                user.role === 'supervisor' ? 'bg-purple-100 text-purple-700' :
                user.role === 'admin' ? 'bg-blue-100 text-blue-700' :
                'bg-green-100 text-green-700'
              }>
                {user.role === 'supervisor' ? 'Супервизор' :
                 user.role === 'admin' ? 'Администратор' : 'Участник'}
              </Badge>
              <Button variant="ghost" size="icon">
                <Icon name="Bell" size={20} />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <Icon name="LogOut" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 lg:grid-cols-9 gap-2 bg-white/50 backdrop-blur p-2 rounded-xl">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-white">
              <Icon name="LayoutDashboard" size={16} className="mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Главная</span>
            </TabsTrigger>
            
            {(isAdmin || isMember) && (
              <TabsTrigger value="meters" className="data-[state=active]:bg-white">
                <Icon name="Gauge" size={16} className="mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Показания</span>
              </TabsTrigger>
            )}

            <TabsTrigger value="documents" className="data-[state=active]:bg-white">
              <Icon name="FileText" size={16} className="mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Документы</span>
            </TabsTrigger>

            <TabsTrigger value="news" className="data-[state=active]:bg-white">
              <Icon name="Newspaper" size={16} className="mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Новости</span>
            </TabsTrigger>

            <TabsTrigger value="chat" className="data-[state=active]:bg-white">
              <Icon name="MessageCircle" size={16} className="mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Чат</span>
            </TabsTrigger>

            {isAdmin && (
              <>
                <TabsTrigger value="members" className="data-[state=active]:bg-white">
                  <Icon name="Users" size={16} className="mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Участники</span>
                </TabsTrigger>
                <TabsTrigger value="tariffs" className="data-[state=active]:bg-white">
                  <Icon name="DollarSign" size={16} className="mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Тарифы</span>
                </TabsTrigger>
                <TabsTrigger value="contracts" className="data-[state=active]:bg-white">
                  <Icon name="FileSignature" size={16} className="mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Договоры</span>
                </TabsTrigger>
              </>
            )}

            {isSupervisor && (
              <TabsTrigger value="supervisor" className="data-[state=active]:bg-white">
                <Icon name="Shield" size={16} className="mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Супервизор</span>
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.filter(s => s.visible).map((stat, index) => (
                <Card key={index} className="hover-scale bg-white/70 backdrop-blur border-0 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">{stat.label}</CardTitle>
                    <Icon name={stat.icon as any} className={stat.color} size={20} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                    <p className="text-xs text-gray-500 mt-1">
                      <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                        {stat.change}
                      </span>{' '}
                      за последний месяц
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {isMember && (
              <Card className="bg-white/70 backdrop-blur border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Wallet" className="text-purple-500" />
                    Мои платежи
                  </CardTitle>
                  <CardDescription>История ваших платежей</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { date: '15.11.2025', description: 'Электроснабжение', amount: 4500, status: 'paid' },
                      { date: '10.11.2025', description: 'Водоснабжение', amount: 2100, status: 'paid' },
                      { date: '05.11.2025', description: 'Членские взносы', amount: 3000, status: 'paid' },
                    ].map((payment, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-100">
                            <Icon name="Check" className="text-green-600" size={20} />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{payment.description}</p>
                            <p className="text-sm text-gray-500">{payment.date}</p>
                          </div>
                        </div>
                        <p className="text-lg font-bold text-gray-900">₽{payment.amount.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="meters">
            <Card className="bg-white/70 backdrop-blur border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Gauge" className="text-blue-500" />
                  Внесение показаний счётчиков
                </CardTitle>
                <CardDescription>Укажите текущие показания ваших счётчиков</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleMeterSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="electricity">Электричество (кВт·ч)</Label>
                      <Input id="electricity" type="number" placeholder="12450" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="water">Вода (м³)</Label>
                      <Input id="water" type="number" placeholder="3200" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gas">Газ (м³)</Label>
                      <Input id="gas" type="number" placeholder="850" />
                    </div>
                  </div>
                  <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    <Icon name="Save" size={16} className="mr-2" />
                    Сохранить показания
                  </Button>
                </form>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Мои последние показания</h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Электричество', current: 12450, previous: 12100, unit: 'кВт·ч', icon: 'Zap' },
                      { name: 'Вода', current: 3200, previous: 3050, unit: 'м³', icon: 'Droplet' },
                      { name: 'Газ', current: 850, previous: 780, unit: 'м³', icon: 'Flame' },
                    ].map((meter, idx) => (
                      <div key={idx} className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                              <Icon name={meter.icon as any} className="text-white" size={20} />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{meter.name}</p>
                              <p className="text-sm text-gray-600">Расход: {meter.current - meter.previous} {meter.unit}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900">{meter.current}</p>
                            <p className="text-xs text-gray-500">Предыдущие: {meter.previous}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card className="bg-white/70 backdrop-blur border-0 shadow-lg">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="FileText" className="text-purple-500" />
                      Документы
                    </CardTitle>
                    <CardDescription>Все документы организации</CardDescription>
                  </div>
                  {isAdmin && (
                    <Button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700">
                      <Icon name="Upload" size={16} className="mr-2" />
                      Загрузить
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: 'Устав СНТ "Солнечный"', category: 'Уставные документы', date: '15.03.2024' },
                    { title: 'Протокол общего собрания', category: 'Протоколы', date: '10.03.2024' },
                    { title: 'Смета расходов на 2024 год', category: 'Финансы', date: '01.01.2024' },
                    { title: 'Правила внутреннего распорядка', category: 'Регламенты', date: '20.02.2024' },
                  ].map((doc, idx) => (
                    <div key={idx} className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg hover-scale border border-purple-100">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name="FileText" className="text-white" size={24} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1">{doc.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{doc.category}</p>
                          <p className="text-xs text-gray-500">{doc.date}</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Icon name="Download" size={18} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news">
            <Card className="bg-white/70 backdrop-blur border-0 shadow-lg">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Newspaper" className="text-green-500" />
                      Новости и объявления
                    </CardTitle>
                    <CardDescription>Актуальная информация для участников</CardDescription>
                  </div>
                  {isAdmin && (
                    <Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
                      <Icon name="Plus" size={16} className="mr-2" />
                      Создать
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: 'Плановое отключение электричества', date: '18.11.2025', excerpt: 'С 9:00 до 15:00 будут проводиться плановые работы...' },
                    { title: 'Общее собрание участников', date: '15.11.2025', excerpt: 'Приглашаем всех на общее собрание 25 ноября...' },
                    { title: 'Новые тарифы на воду', date: '12.11.2025', excerpt: 'С 1 декабря изменяются тарифы на водоснабжение...' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl hover-scale border border-green-100">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <Badge className="bg-green-100 text-green-700">Важное</Badge>
                            <span className="text-sm text-gray-500">{item.date}</span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                          <p className="text-gray-600">{item.excerpt}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat">
            <Card className="bg-white/70 backdrop-blur border-0 shadow-lg h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="MessageCircle" className="text-blue-500" />
                  Общий чат
                </CardTitle>
                <CardDescription>Обсуждения и вопросы участников</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 space-y-4 overflow-y-auto mb-4">
                  {[
                    { author: 'Иванов С.', message: 'Добрый день! Когда планируется ремонт дороги?', time: '10:30', isOwn: false },
                    { author: 'Администратор', message: 'Здравствуйте! Работы начнутся на следующей неделе', time: '10:35', isOwn: false },
                    { author: 'Петрова А.', message: 'Подскажите, как внести показания счетчиков?', time: '11:15', isOwn: false },
                    { author: 'Вы', message: 'Можно через раздел "Показания"', time: '11:20', isOwn: true },
                  ].map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] sm:max-w-[70%] p-4 rounded-2xl ${
                        msg.isOwn 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                          : 'bg-gradient-to-r from-slate-100 to-gray-100 text-gray-900'
                      }`}>
                        {!msg.isOwn && <p className="text-sm font-semibold mb-1 opacity-70">{msg.author}</p>}
                        <p className="text-sm">{msg.message}</p>
                        <p className={`text-xs mt-1 ${msg.isOwn ? 'text-blue-100' : 'text-gray-500'}`}>{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Введите сообщение..." 
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    <Icon name="Send" size={20} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {isAdmin && (
            <>
              <TabsContent value="members">
                <Card className="bg-white/70 backdrop-blur border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Icon name="Users" className="text-blue-500" />
                          Управление участниками
                        </CardTitle>
                        <CardDescription>Добавление, редактирование и удаление участников</CardDescription>
                      </div>
                      <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                        <Icon name="UserPlus" size={16} className="mr-2" />
                        Добавить участника
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: 'Иванов Сергей', plot: '№12', debt: 0, status: 'paid', role: 'admin' },
                        { name: 'Петрова Анна', plot: '№45', debt: 15000, status: 'debt', role: 'member' },
                        { name: 'Сидоров Михаил', plot: '№78', debt: 5000, status: 'partial', role: 'member' },
                        { name: 'Козлова Елена', plot: '№23', debt: 0, status: 'paid', role: 'member' },
                      ].map((member, idx) => (
                        <div key={idx} className="p-4 bg-gradient-to-r from-slate-50 to-purple-50 rounded-lg hover-scale">
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4 flex-1">
                              <Avatar className="w-12 h-12">
                                <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white">
                                  {member.name.split(' ').map((n) => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold text-gray-900">{member.name}</p>
                                <p className="text-sm text-gray-600">Участок {member.plot}</p>
                                {member.debt > 0 && (
                                  <p className="text-sm text-red-600 font-medium">Задолженность: ₽{member.debt.toLocaleString()}</p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge className={member.role === 'admin' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}>
                                {member.role === 'admin' ? 'Админ' : 'Участник'}
                              </Badge>
                              <Button variant="ghost" size="icon">
                                <Icon name="Edit" size={18} />
                              </Button>
                              {member.role !== 'admin' && (
                                <Button variant="ghost" size="icon">
                                  <Icon name="Trash2" size={18} className="text-red-500" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tariffs">
                <Card className="bg-white/70 backdrop-blur border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="DollarSign" className="text-green-500" />
                      Управление тарифами
                    </CardTitle>
                    <CardDescription>Настройка тарифов на ресурсы</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: 'Электричество', rate: 5.40, unit: 'кВт·ч', icon: 'Zap' },
                        { name: 'Вода', rate: 35.00, unit: 'м³', icon: 'Droplet' },
                        { name: 'Газ', rate: 7.20, unit: 'м³', icon: 'Flame' },
                      ].map((tariff, idx) => (
                        <div key={idx} className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
                                <Icon name={tariff.icon as any} className="text-white" size={24} />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">{tariff.name}</p>
                                <p className="text-2xl font-bold text-green-600">₽{tariff.rate}</p>
                                <p className="text-sm text-gray-600">за {tariff.unit}</p>
                              </div>
                            </div>
                            <Button variant="outline">
                              <Icon name="Edit" size={16} className="mr-2" />
                              Изменить
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contracts">
                <Card className="bg-white/70 backdrop-blur border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Icon name="FileSignature" className="text-orange-500" />
                          Договоры и контрагенты
                        </CardTitle>
                        <CardDescription>Управление договорами с подрядчиками</CardDescription>
                      </div>
                      <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
                        <Icon name="FilePlus" size={16} className="mr-2" />
                        Новый договор
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { company: 'ООО "Энергосервис"', type: 'Электроснабжение', date: '01.01.2024 - 31.12.2024', status: 'active' },
                        { company: 'ИП Петров', type: 'Вывоз мусора', date: '01.03.2024 - 28.02.2025', status: 'active' },
                        { company: 'ООО "Водоканал"', type: 'Водоснабжение', date: '15.01.2024 - 15.01.2025', status: 'active' },
                      ].map((contract, idx) => (
                        <div key={idx} className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg hover-scale border border-orange-100">
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4 flex-1">
                              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                                <Icon name="Briefcase" className="text-white" size={24} />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">{contract.company}</h3>
                                <p className="text-sm text-gray-600">{contract.type}</p>
                                <p className="text-xs text-gray-500 mt-1">{contract.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge className="bg-green-100 text-green-700">Активен</Badge>
                              <Button variant="ghost" size="icon">
                                <Icon name="Edit" size={18} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          )}

          {isSupervisor && (
            <TabsContent value="supervisor">
              <Card className="bg-white/70 backdrop-blur border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Shield" className="text-purple-500" />
                    Панель супервизора
                  </CardTitle>
                  <CardDescription>Управление администраторами и организациями</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Назначение администратора</h3>
                    <div className="space-y-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Выберите пользователя</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите пользователя" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Петрова Анна</SelectItem>
                              <SelectItem value="2">Сидоров Михаил</SelectItem>
                              <SelectItem value="3">Морозова Елена</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Организация</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите организацию" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">СНТ "Солнечный"</SelectItem>
                              <SelectItem value="2">ТСЖ "Зелёный двор"</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700">
                        <Icon name="UserCheck" size={16} className="mr-2" />
                        Назначить администратором
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Все организации</h3>
                    <div className="space-y-3">
                      {[
                        { name: 'СНТ "Солнечный"', members: 247, admins: 2 },
                        { name: 'ТСЖ "Зелёный двор"', members: 156, admins: 1 },
                      ].map((org, idx) => (
                        <div key={idx} className="p-4 bg-gradient-to-r from-slate-50 to-purple-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900">{org.name}</h4>
                              <p className="text-sm text-gray-600">Участников: {org.members} • Администраторов: {org.admins}</p>
                            </div>
                            <Button variant="outline" size="sm">
                              <Icon name="Settings" size={16} className="mr-2" />
                              Управление
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
