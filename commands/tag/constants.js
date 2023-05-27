/* eslint-disable quotes */
export const CHARACTER_NAMES = {
  primary: [
    {
      name: 'Caim',
      aliases: ['Caim'],
      type: 'primary',
    },
    {
      name: 'Inis',
      aliases: ['Inis', 'Inistra'],
      type: 'primary',
    },
    {
      name: 'Fera',
      aliases: ['Fera', 'Feras'],
      type: 'primary',
    },
  ],
  secondary: [
    {
      name: 'Alice',
      aliases: ['Alice', 'Alicia'],
      type: 'secondary',
    },
    {
      name: 'Mille',
      aliases: ['Mille'],
      type: 'secondary',
    },
    {
      name: 'Gwen',
      aliases: ['Gwen', 'Gwendolyn'],
      type: 'secondary',
    },
    {
      name: 'Vera',
      aliases: ['Vera'],
      type: 'secondary',
    },
  ],
  hexknight: [
    {
      name: 'Fragma',
      aliases: ['Fragma', 'Fragmata'],
      type: 'hexknight',
    },
  ],
};

export const SUBJECTS = [
  {
    subject: 'combat equipment',
    categories: [
      {
        category: 'weapons',
        elements: [
          'sword',
          'axe',
          'bow',
          'staff',
          'dagger',
          'spear',
          'blade',
          'hammer',
        ],
      },
      {
        category: 'armor',
        elements: [
          'helmet',
          'chestplate',
          'leggings',
          'boots',
          'light armor',
          'heavy armor',
          'robe',
          'medium armor',
          'plate armor',
          'chainmail',
          'leather armor',
          'cloth armor',
          'scale armor',
          'mail armor',
        ],
      },
      {
        category: 'accessories',
        elements: [
          'ring',
          'necklace',
          'bracelet',
          'earring',
          'pendant',
          'charm',
          'amulet',
          'explosive',
        ],
      },
    ],
  },
  {
    subject: 'magic',
    categories: [
      {
        category: 'branches',
        elements: ['vira', 'sol', 'lumine'],
      },
      {
        category: 'classifications',
        elements: ['offensive', 'defensive', 'utility'],
      },
      {
        category: 'spells',
        elements: []
      },
    ],
  },
  {
    subject: 'festerfonts',
    categories: [
      {
        category: 'general',
        elements: ['saturation']
      },
      {
        category: 'layers',
        elements: ['outskirts', 'body', 'core']
      },
      {
        category: 'classifications',
        elements: ['clarion', 'umbra', 'nihil']
      },
      {
        category: 'saturations',
        elements: ['placid', 'rippling', 'violent']
      },
      {
        category: 'configurations',
        elements: ['generic', 'command', 'waypoint', 'infection', 'invasion', 'waypoint']
      },
    ],
  },
  {
    subject: 'blightbeasts',
    categories: [
      {
        category: 'general',
        elements: ['blightbeast', 'blightbeasts', 'blightseed', 'blightseeds', 'accumulation'],
      },
      {
        category: 'roots',
        elements: ['arth', 'botan', 'chorth'],
      },
      {
        category: 'arth',
        elements: ['titarche', 'medimite', 'fellchital'],
      },
      {
        category: 'botan',
        elements: ['marole', 'coreplet', 'felldrasil'],
      },
      {
        category: 'chorth',
        elements: ['piscel', 'elfirmant', 'fellmal'],
      },
      {
        category: 'blightbeasts',
        elements: [''],
      },
    ],
  },
  {
    subject: 'shops',
    categories: [
      {
        category: 'maliscade',
        elements: ["ashera's attires",],
      }
    ],
  },
  {
    subject: 'tools',
    categories: [
      {
        category: 'mundane',
        elements: [''],
      },
      {
        category: 'magitech',
        elements: ['memgel'],
      },
      {
        category: 'arcane',
        elements: [''],
      },
    ],
  },
];
