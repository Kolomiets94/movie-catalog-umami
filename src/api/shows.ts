import axios from 'axios';

export interface Show {
  id: number;
  name: string;
  premiered: string | null;
  genres: string[];
  rating: { average: number | null };
  summary: string | null;
  image: { medium: string; original: string } | null;
}

const client = axios.create({ baseURL: 'https://api.tvmaze.com' });

const films: Array<[string, string, string, string]> = [
  ['Брат', '1997', 'Драма', 'Данила Багров приезжает в Санкт-Петербург к старшему брату и оказывается втянут в криминальный мир.'],
  ['Брат 2', '2000', 'Боевик', 'Данила Багров отправляется в США, чтобы помочь брату погибшего друга.'],
  ['Легенда №17', '2013', 'Спорт', 'История становления хоккеиста Валерия Харламова и его пути к знаменитому матчу с США.'],
  ['Движение вверх', '2017', 'Спорт', 'Спортивная драма о сборной СССР по баскетболу и финале Олимпийских игр 1972 года.'],
  ['Холоп', '2019', 'Комедия', 'Избалованный молодой человек попадает в постановочный мир, где его убеждают, что он олигарх.'],
  ['Чебурашка', '2023', 'Семейный', 'Необычный пушистый герой оказывается в приморском городе и меняет жизнь сада.'],
  ['Майор Гром: Чумной Доктор', '2021', 'Боевик', 'Петербургский полицейский Игорь Гром расследует преступления таинственного маньяка.'],
  ['Последний богатырь', '2017', 'Фэнтези', 'Москвич Иван оказывается в сказочном Белогорье и становится участником эпических событий.']
];

export const russianFilms: Show[] = films.map(([name, year, genre, summary], index) => ({
  id: 1000001 + index,
  name,
  premiered: year + '-01-01',
  genres: [genre],
  summary,
  rating: { average: null },
  image: null
}));

export const searchShows = async (query: string): Promise<Show[]> =>
  russianFilms.filter(film => film.name.toLocaleLowerCase('ru').includes(query.toLocaleLowerCase('ru')));

export const getShows = async (): Promise<Show[]> => russianFilms;

export const getShow = async (id: number): Promise<Show> => {
  const film = russianFilms.find(item => item.id === id);
  if (film) return film;
  const { data } = await client.get(`/shows/${id}`);
  return data;
};
