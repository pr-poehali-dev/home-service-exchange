import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

type Listing = {
  id: number;
  title: string;
  description: string;
  price?: number;
  type: 'service' | 'product' | 'exchange';
  category: string;
  author: {
    name: string;
    avatar: string;
    rating: number;
    verified: boolean;
  };
  distance: string;
};

type Request = {
  id: number;
  title: string;
  description: string;
  budget: string;
  author: string;
  responses: number;
  timeAgo: string;
};

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('catalog');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    category: '',
    budget: '',
  });

  const categories = [
    { name: 'Ремонт', icon: 'Wrench' },
    { name: 'Уборка', icon: 'Sparkles' },
    { name: 'Садоводство', icon: 'Leaf' },
    { name: 'Доставка', icon: 'Package' },
    { name: 'Обмен', icon: 'Repeat' },
    { name: 'Другое', icon: 'MoreHorizontal' },
  ];

  const listings: Listing[] = [
    {
      id: 1,
      title: 'Помощь с ремонтом крана',
      description: 'Быстро починю протекающий кран, все инструменты есть',
      price: 500,
      type: 'service',
      category: 'Ремонт',
      author: {
        name: 'Иван Петров',
        avatar: 'IP',
        rating: 4.9,
        verified: true,
      },
      distance: '200 м от вас',
    },
    {
      id: 2,
      title: 'Отдам рассаду помидоров',
      description: 'Выращиваю сам, сорт черри, крепкая рассада',
      type: 'exchange',
      category: 'Садоводство',
      author: {
        name: 'Мария Смирнова',
        avatar: 'МС',
        rating: 5.0,
        verified: true,
      },
      distance: '350 м от вас',
    },
    {
      id: 3,
      title: 'Уборка квартир и домов',
      description: 'Качественная генеральная уборка, свои средства',
      price: 2000,
      type: 'service',
      category: 'Уборка',
      author: {
        name: 'Анна Козлова',
        avatar: 'АК',
        rating: 4.8,
        verified: false,
      },
      distance: '500 м от вас',
    },
  ];

  const requests: Request[] = [
    {
      id: 1,
      title: 'Нужна помощь с переездом',
      description: 'Требуется помощь погрузить мебель в машину, 2-3 часа работы',
      budget: '1000-1500 ₽',
      author: 'Дмитрий К.',
      responses: 5,
      timeAgo: '15 мин назад',
    },
    {
      id: 2,
      title: 'Поливать цветы во время отпуска',
      description: 'Уезжаю на 2 недели, нужен кто-то для полива растений',
      budget: 'Договорная',
      author: 'Ольга М.',
      responses: 3,
      timeAgo: '1 час назад',
    },
    {
      id: 3,
      title: 'Выгул собаки по вечерам',
      description: 'Лабрадор, добрый, нужен выгул 2 раза в неделю',
      budget: '300 ₽/прогулка',
      author: 'Сергей В.',
      responses: 8,
      timeAgo: '3 часа назад',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                <Icon name="Home" size={24} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">ДворСервис</h1>
                <p className="text-xs text-muted-foreground">Все нужное рядом</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Icon name="User" size={16} className="mr-2" />
              Войти
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold mb-2">Найди помощь в своём дворе</h2>
          <p className="text-muted-foreground mb-6">
            Соседи всегда рядом: услуги, обмен товарами, взаимопомощь
          </p>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Что вам нужно?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>
              <Icon name="Search" size={20} />
            </Button>
          </div>
        </div>

        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-lg font-semibold mb-4">Категории</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-20 flex flex-col gap-2 hover:bg-secondary hover:scale-105 transition-all"
              >
                <Icon name={category.icon as any} size={24} />
                <span className="text-xs">{category.name}</span>
              </Button>
            ))}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="catalog">
              <Icon name="Grid3x3" size={16} className="mr-2" />
              Каталог
            </TabsTrigger>
            <TabsTrigger value="requests">
              <Icon name="MessageSquare" size={16} className="mr-2" />
              Запросы
            </TabsTrigger>
            <TabsTrigger value="exchange">
              <Icon name="Repeat" size={16} className="mr-2" />
              Обмен
            </TabsTrigger>
          </TabsList>

          <TabsContent value="catalog" className="space-y-4">
            {listings.map((listing) => (
              <Card key={listing.id} className="hover:shadow-md transition-shadow animate-scale-in">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {listing.author.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{listing.author.name}</CardTitle>
                          {listing.author.verified && (
                            <Badge variant="secondary" className="h-5 px-1.5">
                              <Icon name="BadgeCheck" size={12} className="mr-1" />
                              <span className="text-xs">Проверен</span>
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Icon name="Star" size={14} className="fill-yellow-400 text-yellow-400 mr-1" />
                            {listing.author.rating}
                          </div>
                          <span>•</span>
                          <div className="flex items-center">
                            <Icon name="MapPin" size={14} className="mr-1" />
                            {listing.distance}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge variant={listing.type === 'exchange' ? 'secondary' : 'default'}>
                      {listing.type === 'service' ? 'Услуга' : listing.type === 'exchange' ? 'Обмен' : 'Товар'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold text-lg mb-2">{listing.title}</h3>
                  <CardDescription className="mb-3">{listing.description}</CardDescription>
                  <div className="flex items-center justify-between">
                    {listing.price ? (
                      <span className="text-2xl font-bold text-primary">{listing.price} ₽</span>
                    ) : (
                      <span className="text-sm text-muted-foreground">Бесплатно</span>
                    )}
                    <Button>
                      <Icon name="MessageCircle" size={16} className="mr-2" />
                      Написать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            <div className="mb-4">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full" size="lg">
                    <Icon name="Plus" size={20} className="mr-2" />
                    Создать запрос
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Создать новый запрос</DialogTitle>
                    <DialogDescription>
                      Опишите, какая помощь вам нужна. Соседи увидят ваш запрос и смогут откликнуться.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Заголовок запроса</Label>
                      <Input
                        id="title"
                        placeholder="Например: Помощь с переездом"
                        value={newRequest.title}
                        onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Категория</Label>
                      <Select
                        value={newRequest.category}
                        onValueChange={(value) => setNewRequest({ ...newRequest, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="repair">Ремонт</SelectItem>
                          <SelectItem value="cleaning">Уборка</SelectItem>
                          <SelectItem value="gardening">Садоводство</SelectItem>
                          <SelectItem value="delivery">Доставка</SelectItem>
                          <SelectItem value="other">Другое</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Описание</Label>
                      <Textarea
                        id="description"
                        placeholder="Подробно опишите, что нужно сделать..."
                        rows={4}
                        value={newRequest.description}
                        onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget">Бюджет</Label>
                      <Input
                        id="budget"
                        placeholder="Например: 1000-1500 ₽ или Договорная"
                        value={newRequest.budget}
                        onChange={(e) => setNewRequest({ ...newRequest, budget: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Отмена
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={() => {
                        setIsDialogOpen(false);
                        setNewRequest({ title: '', description: '', category: '', budget: '' });
                      }}
                    >
                      <Icon name="Send" size={16} className="mr-2" />
                      Опубликовать
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            {requests.map((request) => (
              <Card key={request.id} className="hover:shadow-md transition-shadow animate-scale-in">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg mb-1">{request.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{request.author}</span>
                        <span>•</span>
                        <span>{request.timeAgo}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Icon name="MessageSquare" size={12} />
                      {request.responses}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-3">{request.description}</CardDescription>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-primary">{request.budget}</span>
                    <Button variant="outline">
                      <Icon name="Hand" size={16} className="mr-2" />
                      Откликнуться
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="exchange" className="space-y-4">
            {listings
              .filter((l) => l.type === 'exchange')
              .map((listing) => (
                <Card key={listing.id} className="hover:shadow-md transition-shadow animate-scale-in">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-secondary text-secondary-foreground">
                            {listing.author.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-lg">{listing.author.name}</CardTitle>
                            {listing.author.verified && (
                              <Icon name="BadgeCheck" size={16} className="text-primary" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Icon name="MapPin" size={14} />
                            {listing.distance}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold text-lg mb-2">{listing.title}</h3>
                    <CardDescription className="mb-3">{listing.description}</CardDescription>
                    <Button variant="secondary" className="w-full">
                      <Icon name="Repeat" size={16} className="mr-2" />
                      Предложить обмен
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t mt-16 py-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>ДворСервис — Все нужное рядом</p>
          <p className="mt-2">Безопасная платформа для соседской взаимопомощи</p>
        </div>
      </footer>
    </div>
  );
}