export const capabilityFilters = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI / LLM' },
  { id: 'frontend', label: 'Interface' },
  { id: 'backend', label: 'Backend' },
  { id: 'data', label: 'Databases' },
  { id: 'tools', label: 'Dev Tools' }
];

export const categoryLabels = {
  ai: 'AI and LLM tools',
  frontend: 'Frontend and interface work',
  backend: 'Backend languages and frameworks',
  data: 'Database and query experience',
  tools: 'Development tools'
};

const tech = ({
  letter,
  name,
  category,
  iconClass = '',
  mark = '',
  top,
  side,
  border,
  icon,
  label = '#ffffff'
}) => ({
  type: 'tech',
  letter,
  name,
  category,
  iconClass,
  mark: mark || name,
  styles: {
    '--key-top': top,
    '--key-side': side,
    '--key-border': border,
    '--icon-color': icon,
    '--label-color': label
  }
});

const neutral = (label, unit = 1, variant = 'modifier', skill = null) => ({
  type: 'neutral',
  label,
  unit,
  variant,
  skill
});

const alpha = (letter, skill = null) => ({
  type: 'alpha',
  letter,
  skill
});

const techByLetter = {
  Q: tech({
    letter: 'Q',
    name: 'Python',
    category: 'backend',
    iconClass: 'devicon-python-plain colored',
    top: '#2d6fa3',
    side: '#16456b',
    border: '#ffd43b',
    icon: '#ffd43b',
    label: '#ffffff'
  }),
  W: tech({
    letter: 'W',
    name: 'Java',
    category: 'backend',
    iconClass: 'devicon-java-plain colored',
    top: '#d96f34',
    side: '#873c16',
    border: '#f0a15d',
    icon: '#ffffff',
    label: '#ffffff'
  }),
  E: tech({
    letter: 'E',
    name: 'PHP',
    category: 'backend',
    iconClass: 'devicon-php-plain colored',
    top: '#777bb4',
    side: '#3f4376',
    border: '#aeb2e5',
    icon: '#ffffff',
    label: '#ffffff'
  }),
  R: tech({
    letter: 'R',
    name: 'JavaScript',
    category: 'frontend',
    iconClass: 'devicon-javascript-plain colored',
    top: '#f7df1e',
    side: '#a28d05',
    border: '#fff06a',
    icon: '#1d1d1b',
    label: '#ffffff'
  }),
  T: tech({
    letter: 'T',
    name: 'C++',
    category: 'backend',
    iconClass: 'devicon-cplusplus-plain colored',
    top: '#1469aa',
    side: '#073a64',
    border: '#58a6df',
    icon: '#ffffff',
    label: '#ffffff'
  }),
  Y: tech({
    letter: 'Y',
    name: 'SQL',
    category: 'data',
    mark: 'SQL',
    top: '#4f4f4f',
    side: '#242424',
    border: '#878787',
    icon: '#ffffff',
    label: '#ffffff'
  }),
  U: tech({
    letter: 'U',
    name: 'Laravel',
    category: 'backend',
    iconClass: 'devicon-laravel-plain colored',
    top: '#ff3b30',
    side: '#9f140d',
    border: '#ff8f88',
    icon: '#ffffff',
    label: '#ffffff'
  }),
  I: tech({
    letter: 'I',
    name: 'Express',
    category: 'backend',
    iconClass: 'devicon-express-original colored',
    top: '#2f2f2f',
    side: '#111111',
    border: '#666666',
    icon: '#ffffff',
    label: '#ffffff'
  }),
  O: tech({
    letter: 'O',
    name: 'React',
    category: 'frontend',
    iconClass: 'devicon-react-original colored',
    top: '#139eca',
    side: '#075269',
    border: '#6fdcff',
    icon: '#ffffff',
    label: '#ffffff'
  }),
  P: tech({
    letter: 'P',
    name: 'Tailwind CSS',
    category: 'frontend',
    iconClass: 'devicon-tailwindcss-original colored',
    top: '#0ea5b8',
    side: '#075d68',
    border: '#7ddce8',
    icon: '#ffffff',
    label: '#ffffff'
  }),
  A: tech({
    letter: 'A',
    name: 'Blade',
    category: 'frontend',
    mark: 'Blade',
    top: '#666666',
    side: '#303030',
    border: '#9b9b9b',
    icon: '#ffffff',
    label: '#ffffff'
  }),
  S: tech({
    letter: 'S',
    name: 'MySQL',
    category: 'data',
    iconClass: 'devicon-mysql-plain colored',
    top: '#4479a1',
    side: '#1d435b',
    border: '#84b8d8',
    icon: '#ffffff',
    label: '#ffffff'
  }),
  D: tech({
    letter: 'D',
    name: 'MariaDB',
    category: 'data',
    iconClass: 'devicon-mariadb-original colored',
    top: '#003545',
    side: '#001a22',
    border: '#3b7785',
    icon: '#ffffff',
    label: '#ffffff'
  }),
  F: tech({
    letter: 'F',
    name: 'NLP',
    category: 'ai',
    mark: 'NLP',
    top: '#3f3f46',
    side: '#18181b',
    border: '#7a7a83',
    icon: '#ffffff',
    label: '#ffffff'
  }),
  G: tech({
    letter: 'G',
    name: 'LLM',
    category: 'ai',
    mark: 'LLM',
    top: '#262626',
    side: '#0f0f0f',
    border: '#666666',
    icon: '#ffffff',
    label: '#ffffff'
  }),
  H: tech({
    letter: 'H',
    name: 'ChatGPT',
    category: 'ai',
    mark: 'GPT',
    top: '#2f6f5f',
    side: '#12382f',
    border: '#79b8a9',
    icon: '#ffffff',
    label: '#ffffff'
  }),
  J: tech({
    letter: 'J',
    name: 'Codex',
    category: 'ai',
    mark: 'CX',
    top: '#333333',
    side: '#111111',
    border: '#777777',
    icon: '#ffffff',
    label: '#ffffff'
  }),
  K: tech({
    letter: 'K',
    name: 'Claude',
    category: 'ai',
    mark: 'CL',
    top: '#d97745',
    side: '#773617',
    border: '#f0b08d',
    icon: '#ffffff',
    label: '#ffffff'
  }),
  L: tech({
    letter: 'L',
    name: 'Groq API',
    category: 'ai',
    mark: 'GROQ',
    top: '#f55036',
    side: '#8e1f10',
    border: '#ff9a88',
    icon: '#ffffff',
    label: '#ffffff'
  }),
  Z: tech({
    letter: 'Z',
    name: 'Git',
    category: 'tools',
    iconClass: 'devicon-git-plain colored',
    top: '#f05032',
    side: '#952614',
    border: '#ff9b89',
    icon: '#ffffff',
    label: '#ffffff'
  }),
  X: tech({
    letter: 'X',
    name: 'GitHub',
    category: 'tools',
    iconClass: 'devicon-github-original colored',
    top: '#181717',
    side: '#050505',
    border: '#5d5d5d',
    icon: '#ffffff',
    label: '#ffffff'
  }),
  C: tech({
    letter: 'C',
    name: 'VS Code',
    category: 'tools',
    iconClass: 'devicon-vscode-plain colored',
    top: '#3c99d4',
    side: '#155d86',
    border: '#94d4ff',
    icon: '#ffffff',
    label: '#ffffff'
  }),
  V: tech({
    letter: 'V',
    name: 'Postman',
    category: 'tools',
    iconClass: 'devicon-postman-plain colored',
    top: '#ff6c37',
    side: '#9f330f',
    border: '#ffad8d',
    icon: '#ffffff',
    label: '#ffffff'
  }),
  B: tech({
    letter: 'B',
    name: 'XAMPP',
    category: 'tools',
    mark: 'X',
    top: '#fb7a24',
    side: '#97410e',
    border: '#ffc097',
    icon: '#ffffff',
    label: '#ffffff'
  }),
};

const movedWideLetters = new Set(['R', 'U', 'I', 'P', 'V']);
const alphaSkill = (letter) => alpha(letter, movedWideLetters.has(letter) ? null : techByLetter[letter]);

export const keyboardRows = [
  {
    id: 'number',
    keys: [
      neutral('Esc', 1.25),
      neutral('1'),
      neutral('2'),
      neutral('3'),
      neutral('4'),
      neutral('5'),
      neutral('6'),
      neutral('7'),
      neutral('8'),
      neutral('9'),
      neutral('0'),
      neutral('-'),
      neutral('='),
      neutral('Ins', 0.75),
      neutral('Backspace', 2)
    ]
  },
  {
    id: 'qwerty',
    keys: [
      neutral('Tab', 1.5, 'modifier', techByLetter.U),
      ...'QWERTYUIOP'.split('').map((letter) => alphaSkill(letter)),
      neutral('[', 1),
      neutral(']', 1),
      neutral('\\', 1.5, 'modifier', techByLetter.I),
      neutral('', 1)
    ]
  },
  {
    id: 'asdf',
    keys: [
      neutral('Caps Lock', 1.75, 'modifier', techByLetter.R),
      ...'ASDFGHJKL'.split('').map((letter) => alpha(letter, techByLetter[letter])),
      neutral(';'),
      neutral("'"),
      neutral('Enter', 2.25, 'modifier', techByLetter.V),
      neutral('', 1)
    ]
  },
  {
    id: 'zxcv',
    keys: [
      neutral('Shift', 2.25, 'modifier', techByLetter.P),
      ...'ZXCVBNM'.split('').map((letter) => alphaSkill(letter)),
      neutral(','),
      neutral('.'),
      neutral('/'),
      neutral('Shift', 2.75),
      neutral('', 1)
    ]
  },
  {
    id: 'bottom',
    keys: [
      neutral('Ctrl', 1.25),
      neutral('Alt', 1.25),
      neutral('Cmd', 1.25),
      neutral('Space', 6, 'space'),
      neutral('Alt', 1.25),
      neutral('Fn', 1.25),
      neutral('Menu', 1.25),
      neutral('←', 1.25),
      neutral('Ctrl', 1.25)
    ]
  }
];

export const capabilities = Object.values(techByLetter);
