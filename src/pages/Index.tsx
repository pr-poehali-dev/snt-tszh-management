import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Member {
  id: number;
  name: string;
  plot: string;
  debt: number;
  status: 'paid' | 'debt' | 'partial';
}

interface Document {
  id: number;
  title: string;
  date: string;
  category: string;
}

interface News {
  id: number;
  title: string;
  date: string;
  excerpt: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { label: 'Всего участников', value: '247', change: '+12', icon: 'Users', color: 'text-blue-500' },
    { label: 'Общая задолженность', value: '₽1.2М', change: '-8%', icon: 'TrendingDown', color: 'text-red-500' },
    { label: 'Платежей за месяц', value: '₽3.8М', change: '+15%', icon: 'TrendingUp', color: 'text-green-500' },
    { label: 'Открытых обращений', value: '23', change: '+5', icon: 'MessageSquare', color: 'text-purple-500' },
  ];

  const members: Member[] = [
    { id: 1, name: 'Иванов Сергей', plot: '№12', debt: 0, status: 'paid' },
    { id: 2, name: 'Петрова Анна', plot: '№45', debt: 15000, status: 'debt' },
    { id: 3, name: 'Сидоров Михаил', plot: '№78', debt: 5000, status: 'partial' },
    { id: 4, name: 'Козлова Елена', plot: '№23', debt: 0, status: 'paid' },
    { id: 5, name: 'Морозов Дмитрий', plot: '№56', debt: 25000, status: 'debt' },
  ];

  const documents: Document[] = [
    { id: 1, title: 'Устав СНТ "Солнечный"', date: '15.03.2024', category: 'Уставные документы' },
    { id: 2, title: 'Протокол общего собрания', date: '10.03.2024', category: 'Протоколы' },
    { id: 3, title: 'Смета расходов на 2024 год', date: '01.01.2024', category: 'Финансы' },
    { id: 4, title: 'Правила внутреннего распорядка', date: '20.02.2024', category: 'Регламенты' },
  ];

  const news: News[] = [
    { id: 1, title: 'Плановое отключение электричества', date: '18.11.2025', excerpt: 'С 9:00 до 15:00 будут проводиться плановые работы...' },
    { id: 2, title: 'Общее собрание участников', date: '15.11.2025', excerpt: 'Приглашаем всех на общее собрание 25 ноября...' },
    { id: 3, title: 'Новые тарифы на воду', date: '12.11.2025', excerpt: 'С 1 декабря изменяются тарифы на водоснабжение...' },
  ];

  const resourceData = [
    { name: 'Электричество', current: 12450, previous: 12100, tariff: 5.4, icon: 'Zap' },
    { name: 'Вода', current: 3200, previous: 3050, tariff: 35, icon: 'Droplet' },
    { name: 'Газ', current: 850, previous: 780, tariff: 7.2, icon: 'Flame' },
  ];

  const getStatusBadge = (status: Member['status']) => {
    const variants = {
      paid: { label: 'Оплачено', color: 'bg-green-100 text-green-700' },
      debt: { label: 'Долг', color: 'bg-red-100 text-red-700' },
      partial: { label: 'Частично', color: 'bg-yellow-100 text-yellow-700' },
    };
    const config = variants[status];
    return <Badge className={config.color}>{config.label}</Badge>;
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
                <p className="text-xs text-gray-500">Система управления</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Bell" size={20} />
              </Button>
              <Avatar>
                <AvatarFallback className="bg-gradient-to-br from-purple-400 to-blue-500 text-white">АИ</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-5 lg:grid-cols-9 gap-2 bg-white/50 backdrop-blur p-2 rounded-xl">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-white">
              <Icon name="LayoutDashboard" size={16} className="mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Главная</span>
            </TabsTrigger>
            <TabsTrigger value="finance" className="data-[state=active]:bg-white">
              <Icon name="Wallet" size={16} className="mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Финансы</span>
            </TabsTrigger>
            <TabsTrigger value="members" className="data-[state=active]:bg-white">
              <Icon name="Users" size={16} className="mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Участники</span>
            </TabsTrigger>
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
            <TabsTrigger value="contracts" className="data-[state=active]:bg-white">
              <Icon name="FileSignature" size={16} className="mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Договоры</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-white">
              <Icon name="Gauge" size={16} className="mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Ресурсы</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-white">
              <Icon name="Settings" size={16} className="mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Настройки</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" className="text-purple-500" />
                    Динамика платежей
                  </CardTitle>
                  <CardDescription>Статистика за последние 6 месяцев</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { month: 'Июнь', amount: 3200000, percent: 85 },
                      { month: 'Июль', amount: 3500000, percent: 92 },
                      { month: 'Август', amount: 3100000, percent: 82 },
                      { month: 'Сентябрь', amount: 3800000, percent: 95 },
                      { month: 'Октябрь', amount: 3600000, percent: 90 },
                      { month: 'Ноябрь', amount: 3800000, percent: 95 },
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{item.month}</span>
                          <span className="font-semibold text-gray-900">₽{(item.amount / 1000000).toFixed(1)}М</span>
                        </div>
                        <Progress value={item.percent} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Users" className="text-blue-500" />
                    Последние участники
                  </CardTitle>
                  <CardDescription>Активность членов СНТ</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {members.slice(0, 5).map((member) => (
                      <div key={member.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white text-sm">
                              {member.name.split(' ').map((n) => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{member.name}</p>
                            <p className="text-sm text-gray-500">Участок {member.plot}</p>
                          </div>
                        </div>
                        {getStatusBadge(member.status)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/70 backdrop-blur border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Newspaper" className="text-green-500" />
                  Последние новости
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {news.map((item) => (
                    <div key={item.id} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg hover-scale">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{item.excerpt}</p>
                          <p className="text-xs text-gray-500">{item.date}</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Icon name="ChevronRight" size={20} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="finance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {resourceData.map((resource, idx) => (
                <Card key={idx} className="bg-white/70 backdrop-blur border-0 shadow-lg hover-scale">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name={resource.icon as any} className="text-blue-500" />
                      {resource.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Текущие показания</p>
                      <p className="text-2xl font-bold text-gray-900">{resource.current} кВт·ч</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Предыдущие показания</p>
                      <p className="text-lg text-gray-700">{resource.previous} кВт·ч</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Расход</p>
                      <p className="text-lg font-semibold text-purple-600">{resource.current - resource.previous} кВт·ч</p>
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-sm text-gray-600">К оплате</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ₽{((resource.current - resource.previous) * resource.tariff).toLocaleString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-white/70 backdrop-blur border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Receipt" className="text-green-500" />
                  История платежей
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { date: '15.11.2025', description: 'Электроснабжение', amount: 4500, status: 'paid' },
                    { date: '10.11.2025', description: 'Водоснабжение', amount: 2100, status: 'paid' },
                    { date: '05.11.2025', description: 'Членские взносы', amount: 3000, status: 'paid' },
                    { date: '01.11.2025', description: 'Вывоз мусора', amount: 1200, status: 'pending' },
                  ].map((payment, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          payment.status === 'paid' ? 'bg-green-100' : 'bg-yellow-100'
                        }`}>
                          <Icon name={payment.status === 'paid' ? 'Check' : 'Clock'} 
                            className={payment.status === 'paid' ? 'text-green-600' : 'text-yellow-600'} 
                            size={20} 
                          />
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
          </TabsContent>

          <TabsContent value="members">
            <Card className="bg-white/70 backdrop-blur border-0 shadow-lg">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Users" className="text-blue-500" />
                      Список участников
                    </CardTitle>
                    <CardDescription>Всего участников: {members.length}</CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    <Icon name="UserPlus" size={16} className="mr-2" />
                    Добавить
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {members.map((member) => (
                    <div key={member.id} className="p-4 bg-gradient-to-r from-slate-50 to-purple-50 rounded-lg hover-scale">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <Avatar className="w-12 h-12 flex-shrink-0">
                            <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white">
                              {member.name.split(' ').map((n) => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-gray-900 truncate">{member.name}</p>
                            <p className="text-sm text-gray-600">Участок {member.plot}</p>
                            {member.debt > 0 && (
                              <p className="text-sm text-red-600 font-medium mt-1">Задолженность: ₽{member.debt.toLocaleString()}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          {getStatusBadge(member.status)}
                          <Button variant="ghost" size="icon">
                            <Icon name="MoreVertical" size={20} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
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
                  <Button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700">
                    <Icon name="Upload" size={16} className="mr-2" />
                    Загрузить
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg hover-scale border border-purple-100">
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
                  <Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Создать
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {news.map((item) => (
                    <div key={item.id} className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl hover-scale border border-green-100">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <Badge className="bg-green-100 text-green-700">Важное</Badge>
                            <span className="text-sm text-gray-500">{item.date}</span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                          <p className="text-gray-600">{item.excerpt}</p>
                          <Button variant="link" className="mt-2 p-0 text-blue-600">
                            Читать полностью →
                          </Button>
                        </div>
                        <Button variant="ghost" size="icon" className="flex-shrink-0">
                          <Icon name="Bookmark" size={20} />
                        </Button>
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
                    { author: 'Вы', message: 'Можно через раздел "Ресурсы"', time: '11:20', isOwn: true },
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

          <TabsContent value="contracts">
            <Card className="bg-white/70 backdrop-blur border-0 shadow-lg">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="FileSignature" className="text-orange-500" />
                      Договоры и контрагенты
                    </CardTitle>
                    <CardDescription>Управление договорами и подрядчиками</CardDescription>
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
                    { company: 'ООО "Ремонт+"', type: 'Обслуживание дорог', date: '01.06.2024 - 30.11.2024', status: 'expired' },
                  ].map((contract, idx) => (
                    <div key={idx} className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg hover-scale border border-orange-100">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon name="Briefcase" className="text-white" size={24} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-gray-900 truncate">{contract.company}</h3>
                            <p className="text-sm text-gray-600">{contract.type}</p>
                            <p className="text-xs text-gray-500 mt-1">{contract.date}</p>
                          </div>
                        </div>
                        <Badge className={contract.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                          {contract.status === 'active' ? 'Активен' : 'Истёк'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources">
            <Card className="bg-white/70 backdrop-blur border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Gauge" className="text-cyan-500" />
                  Учет ресурсов и тарифы
                </CardTitle>
                <CardDescription>Управление показаниями счетчиков и тарифами</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {resourceData.map((resource, idx) => (
                    <div key={idx} className="p-6 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-100">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Icon name={resource.icon as any} className="text-white" size={24} />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{resource.name}</h3>
                            <p className="text-sm text-gray-600">Тариф: ₽{resource.tariff} за единицу</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Icon name="Edit" size={16} className="mr-2" />
                          Изменить
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-white rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Текущие показания</p>
                          <p className="text-2xl font-bold text-gray-900">{resource.current}</p>
                        </div>
                        <div className="p-4 bg-white rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Расход</p>
                          <p className="text-2xl font-bold text-purple-600">{resource.current - resource.previous}</p>
                        </div>
                        <div className="p-4 bg-white rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">К оплате</p>
                          <p className="text-2xl font-bold text-green-600">
                            ₽{((resource.current - resource.previous) * resource.tariff).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-white/70 backdrop-blur border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Settings" className="text-gray-500" />
                  Настройки системы
                </CardTitle>
                <CardDescription>Управление параметрами организации</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Icon name="Building2" size={20} />
                      Информация об организации
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-600">Название</label>
                        <input type="text" defaultValue='СНТ "Солнечный"' className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-200" />
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">ИНН</label>
                        <input type="text" defaultValue="7734567890" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-200" />
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Адрес</label>
                        <input type="text" defaultValue="Московская область, Подольский район" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-200" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Icon name="Bell" size={20} />
                      Уведомления
                    </h3>
                    <div className="space-y-3">
                      {[
                        { label: 'Email уведомления о платежах', checked: true },
                        { label: 'SMS о важных событиях', checked: true },
                        { label: 'Push-уведомления в браузере', checked: false },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="text-gray-700">{item.label}</span>
                          <input type="checkbox" defaultChecked={item.checked} className="w-5 h-5" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                      <Icon name="Save" size={16} className="mr-2" />
                      Сохранить
                    </Button>
                    <Button variant="outline">
                      Отмена
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;