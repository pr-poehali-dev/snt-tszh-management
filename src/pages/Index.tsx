import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: 'Users',
      title: 'Управление участниками',
      description: 'Ведение базы участников, их данных и контактной информации',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: 'Wallet',
      title: 'Финансовый учёт',
      description: 'Контроль платежей, тарифов и задолженностей',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: 'FileText',
      title: 'Документооборот',
      description: 'Хранение уставных документов, протоколов и регламентов',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: 'MessageCircle',
      title: 'Коммуникации',
      description: 'Внутренний чат и система новостей для участников',
      color: 'from-orange-400 to-orange-600'
    },
    {
      icon: 'Gauge',
      title: 'Учёт ресурсов',
      description: 'Внесение показаний счётчиков и расчёт платежей',
      color: 'from-cyan-400 to-cyan-600'
    },
    {
      icon: 'FileSignature',
      title: 'Договоры',
      description: 'Управление договорами с контрагентами и подрядчиками',
      color: 'from-red-400 to-red-600'
    }
  ];

  const roles = [
    {
      title: 'Участник',
      icon: 'User',
      color: 'from-green-400 to-green-600',
      features: [
        'Просмотр задолженностей',
        'Внесение показаний счетчиков',
        'Доступ к документам',
        'Участие в чате',
        'Просмотр новостей'
      ]
    },
    {
      title: 'Администратор',
      icon: 'UserCog',
      color: 'from-blue-400 to-blue-600',
      features: [
        'Все права участника',
        'Управление участниками',
        'Настройка тарифов',
        'Управление документами',
        'Создание новостей',
        'Ведение договоров'
      ]
    },
    {
      title: 'Супервизор',
      icon: 'Shield',
      color: 'from-purple-400 to-purple-600',
      features: [
        'Все права администратора',
        'Просмотр всех организаций',
        'Назначение администраторов',
        'Доступ к журналам аудита',
        'Управление всеми данными'
      ]
    }
  ];

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
                <h1 className="text-xl font-bold text-gray-900">Система управления СНТ/ТСЖ</h1>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Icon name="LogIn" className="mr-2" size={16} />
              Войти
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-6">
            <Icon name="Building2" className="text-white" size={48} />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Управление вашей организацией
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Комплексная система для садоводческих товариществ и ТСЖ с полным функционалом управления
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-6"
          >
            <Icon name="Rocket" className="mr-2" size={20} />
            Начать работу
          </Button>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Основные возможности</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <Card key={idx} className="hover-scale bg-white/70 backdrop-blur border-0 shadow-lg">
                <CardHeader>
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon name={feature.icon as any} className="text-white" size={28} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Роли пользователей</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Система поддерживает три роли с разными уровнями доступа
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((role, idx) => (
              <Card key={idx} className="hover-scale bg-white/70 backdrop-blur border-0 shadow-lg">
                <CardHeader>
                  <div className={`w-16 h-16 bg-gradient-to-br ${role.color} rounded-2xl flex items-center justify-center mb-4 mx-auto`}>
                    <Icon name={role.icon as any} className="text-white" size={32} />
                  </div>
                  <CardTitle className="text-2xl text-center">{role.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {role.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <Icon name="Check" className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Готовы начать?</h2>
          <p className="text-xl mb-8 opacity-90">
            Войдите в систему и начните управлять вашей организацией эффективно
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/login')}
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6"
          >
            <Icon name="ArrowRight" className="mr-2" size={20} />
            Перейти к входу
          </Button>
        </div>
      </div>

      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>© 2025 Система управления СНТ/ТСЖ. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
