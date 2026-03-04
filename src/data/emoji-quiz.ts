export interface EmojiQuestion {
    id: string
    emojis: string
    options: string[]
    answer: string
}

export const EMOJI_QUESTIONS: EmojiQuestion[] = [
    // Movies & TV
    { id: '1', emojis: '👦⚡️👓', options: ['Harry Potter', 'Percy Jackson', 'Spider-Man', 'Superman'], answer: 'Harry Potter' },
    { id: '2', emojis: '🦇👨', options: ['Iron Man', 'Batman', 'Dracula', 'Spider-Man'], answer: 'Batman' },
    { id: '3', emojis: '🧊🚢💔', options: ['Frozen', 'Titanic', 'The Meg', 'Jaws'], answer: 'Titanic' },
    { id: '4', emojis: '🦁👑', options: ['Madagascar', 'The Lion King', 'Tarzan', 'Jungle Book'], answer: 'The Lion King' },
    { id: '5', emojis: '🕷️👨', options: ['Spider-Man', 'Ant-Man', 'Deadpool', 'Venom'], answer: 'Spider-Man' },
    { id: '6', emojis: '👽🚲🌕', options: ['E.T.', 'Apollo 13', 'Star Wars', 'Interstellar'], answer: 'E.T.' },
    { id: '7', emojis: '🍫🏭', options: ['Charlie and the Chocolate Factory', 'Candyman', 'Chocolat', 'Matilda'], answer: 'Charlie and the Chocolate Factory' },
    { id: '8', emojis: '🦖🏞️', options: ['Godzilla', 'Jurassic Park', 'King Kong', 'Night at the Museum'], answer: 'Jurassic Park' },
    { id: '9', emojis: '🤡🎈', options: ['Joker', 'It', 'The Circus', 'Ronald McDonald'], answer: 'It' },
    { id: '10', emojis: '👨‍🚀🚀🌌', options: ['Star Wars', 'Interstellar', 'Gravity', 'The Martian'], answer: 'Interstellar' },

    // Pop Culture / Brands
    { id: '11', emojis: '🍎📱', options: ['Apple', 'Microsoft', 'Google', 'Samsung'], answer: 'Apple' },
    { id: '12', emojis: '☕️🧜‍♀️', options: ['Costa Coffee', 'Starbucks', 'Dunkin', 'Tim Hortons'], answer: 'Starbucks' },
    { id: '13', emojis: '🐦💬', options: ['Facebook', 'Instagram', 'Twitter (X)', 'Snapchat'], answer: 'Twitter (X)' },
    { id: '14', emojis: '🍔🍟🤡', options: ['Burger King', 'McDonalds', 'Wendys', 'In-N-Out'], answer: 'McDonalds' },
    { id: '15', emojis: '👟✔️', options: ['Adidas', 'Puma', 'Nike', 'Reebok'], answer: 'Nike' },

    // Phrases & Idioms
    { id: '16', emojis: '🌧️🐱🐶', options: ['Raining cats and dogs', 'Pet shower', 'Wet animals', 'Animal control'], answer: 'Raining cats and dogs' },
    { id: '17', emojis: '⏰💰', options: ['Time is money', 'Alarm cost', 'Bank vault', 'Hourly wage'], answer: 'Time is money' },
    { id: '18', emojis: '🍰🚶‍♂️', options: ['Piece of cake', 'Cake walk', 'Dessert cart', 'Baking show'], answer: 'Piece of cake' },
    { id: '19', emojis: '🔥👖', options: ['Liar liar pants on fire', 'Hot pants', 'Fire drill', 'Burning man'], answer: 'Liar liar pants on fire' },
    { id: '20', emojis: '🦋🥚', options: ['Butterfly egg', 'Metamorphosis', 'Spring time', 'Breakfast'], answer: 'Metamorphosis' },

    // Geography & Countries
    { id: '21', emojis: '🗼🥐', options: ['Italy', 'France', 'Spain', 'Germany'], answer: 'France' },
    { id: '22', emojis: '🗽🍎', options: ['Los Angeles', 'Chicago', 'New York City', 'Washington DC'], answer: 'New York City' },
    { id: '23', emojis: '🍕🏛️', options: ['Greece', 'Italy', 'Egypt', 'Turkey'], answer: 'Italy' },
    { id: '24', emojis: '⛩️🍣', options: ['China', 'Japan', 'South Korea', 'Vietnam'], answer: 'Japan' },
    { id: '25', emojis: '🍁🏒', options: ['USA', 'Canada', 'Sweden', 'Russia'], answer: 'Canada' },
    { id: '26', emojis: '🦘🏜️', options: ['South Africa', 'Australia', 'Brazil', 'Mexico'], answer: 'Australia' },

    // General Trivia & Words
    { id: '27', emojis: '🔥🚒👨‍🚒', options: ['Police', 'Paramedic', 'Firefighter', 'Construction'], answer: 'Firefighter' },
    { id: '28', emojis: '🌻🖼️👂🔪', options: ['Picasso', 'Leonardo da Vinci', 'Vincent van Gogh', 'Claude Monet'], answer: 'Vincent van Gogh' },
    { id: '29', emojis: '🐢🥷🍕', options: ['Ninja Turtles', 'Kung Fu Panda', 'Power Rangers', 'Transformers'], answer: 'Ninja Turtles' },
    { id: '30', emojis: '⚡️🔨🦸‍♂️', options: ['Iron Man', 'Thor', 'Captain America', 'Hulk'], answer: 'Thor' },
    { id: '31', emojis: '🧙‍♂️💍🌋', options: ['The Hobbit', 'Game of Thrones', 'Lord of the Rings', 'The Witcher'], answer: 'Lord of the Rings' },
    { id: '32', emojis: '🏴‍☠️🦜🚢', options: ['Pirates of the Caribbean', 'Peter Pan', 'Treasure Island', 'Waterworld'], answer: 'Pirates of the Caribbean' },
    { id: '33', emojis: '👑🐒🏙️', options: ['Tarzan', 'Planet of the Apes', 'King Kong', 'Curious George'], answer: 'King Kong' },
    { id: '34', emojis: '🧸📖🍯', options: ['Paddington', 'Winnie the Pooh', 'Ted', 'Care Bears'], answer: 'Winnie the Pooh' },
    { id: '35', emojis: '🥊🐅👁️', options: ['Rocky', 'Creed', 'Million Dollar Baby', 'Raging Bull'], answer: 'Rocky' }
]

export function getRandomQuestions(count: number): EmojiQuestion[] {
    const shuffled = [...EMOJI_QUESTIONS].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
}
