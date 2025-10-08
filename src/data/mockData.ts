export interface PreviousShow {
  id: string;
  title: string;
  description: string;
  role: string;
  venue: string;
  show_date: string;
  image_url: string;
  gallery_images: string[];
}

export interface UpcomingShow {
  id: string;
  title: string;
  description: string;
  role: string;
  venue: string;
  show_date: string;
  ticket_url: string;
  image_url: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
  author_name?: string;
}

export interface Comment {
  id: string;
  author_name: string;
  author_email: string;
  comment_text: string;
  is_actor_response: boolean;
  created_at: string;
}

export interface PortfolioPhoto {
  id: string;
  url: string;
  alt: string;
}

export const portfolioPhotos: PortfolioPhoto[] = [
  {
    id: '1',
    url: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Professional headshot'
  },
  {
    id: '2',
    url: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Stage performance moment'
  },
  {
    id: '3',
    url: 'https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Character portrayal'
  },
  {
    id: '4',
    url: 'https://images.pexels.com/photos/3662630/pexels-photo-3662630.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Theatrical expression'
  },
  {
    id: '5',
    url: 'https://images.pexels.com/photos/3662618/pexels-photo-3662618.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Dramatic scene'
  },
  {
    id: '6',
    url: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Behind the scenes'
  },
  {
    id: '7',
    url: 'https://images.pexels.com/photos/1144287/pexels-photo-1144287.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'On-set moment'
  }
];

export const previousShows: PreviousShow[] = [
  {
    id: '1',
    title: 'Hamlet',
    description: 'A profound exploration of revenge, madness, and mortality. This modern interpretation of Shakespeare\'s masterpiece brought fresh perspective to the classic tale while honoring its timeless themes. The production ran for 12 weeks to sold-out audiences and received critical acclaim.',
    role: 'Hamlet',
    venue: 'Royal Theater, New York',
    show_date: '2023-06-15',
    image_url: 'https://images.pexels.com/photos/3662630/pexels-photo-3662630.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery_images: [
      'https://images.pexels.com/photos/3662630/pexels-photo-3662630.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/3662618/pexels-photo-3662618.jpeg?auto=compress&cs=tinysrgb&w=600'
    ]
  },
  {
    id: '2',
    title: 'A Streetcar Named Desire',
    description: 'Tennessee Williams\' gripping drama about desire, delusion, and the collision of old and new South. A raw and emotional performance that left audiences spellbound. This production was nominated for multiple theater awards.',
    role: 'Stanley Kowalski',
    venue: 'Broadway Theater, NYC',
    show_date: '2023-03-20',
    image_url: 'https://images.pexels.com/photos/3662618/pexels-photo-3662618.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery_images: [
      'https://images.pexels.com/photos/3662618/pexels-photo-3662618.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/3662630/pexels-photo-3662630.jpeg?auto=compress&cs=tinysrgb&w=600'
    ]
  },
  {
    id: '3',
    title: 'The Importance of Being Earnest',
    description: 'Oscar Wilde\'s witty comedy of manners, mistaken identities, and Victorian social satire. A delightfully entertaining performance that showcased the perfect balance of humor and sophistication.',
    role: 'Jack Worthing',
    venue: 'West End Theater, London',
    show_date: '2022-11-10',
    image_url: 'https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery_images: [
      'https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg?auto=compress&cs=tinysrgb&w=600'
    ]
  }
];

export const upcomingShows: UpcomingShow[] = [
  {
    id: '1',
    title: 'Romeo and Juliet',
    description: 'Shakespeare\'s timeless tale of star-crossed lovers comes to life in this stunning new production. A fresh take on the classic romance that will captivate audiences of all ages.',
    role: 'Romeo',
    venue: 'Grand Theater, Los Angeles',
    show_date: '2025-11-15',
    ticket_url: 'https://example.com/tickets/romeo-juliet',
    image_url: 'https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '2',
    title: 'Death of a Salesman',
    description: 'Arthur Miller\'s powerful American classic exploring the American Dream and family dynamics. A thought-provoking performance that resonates deeply in today\'s world.',
    role: 'Willy Loman',
    venue: 'Lincoln Center, NYC',
    show_date: '2025-12-05',
    ticket_url: 'https://example.com/tickets/death-salesman',
    image_url: 'https://images.pexels.com/photos/3662630/pexels-photo-3662630.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export const actorBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Art of Transformation: My Journey as an Actor',
    content: `Acting has always been more than just a profession for me—it's a calling, a passion that drives every decision I make. From the moment I step onto the stage, I'm no longer myself; I become someone else entirely, living their joys, their sorrows, their triumphs and defeats.

What many people don't realize is the incredible amount of preparation that goes into every role. It's not just about memorizing lines; it's about understanding the character's motivations, their history, their relationships. I spend weeks researching, observing, and immersing myself in the world of each character I portray.

The most rewarding part of this journey has been connecting with audiences. When I see someone moved to tears, or hear laughter rippling through the theater, I know that the story we're telling has touched something real and human in them. That's the magic of theater—it reminds us of our shared humanity.`,
    image_url: 'https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg?auto=compress&cs=tinysrgb&w=800',
    created_at: '2025-09-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Behind the Curtain: Preparing for Hamlet',
    content: `Preparing to play Hamlet was one of the most challenging and rewarding experiences of my career. Shakespeare's prince is complex, contradictory, and deeply human—qualities that make him both fascinating and difficult to portray.

I spent months studying different interpretations of the character, from Laurence Olivier to Kenneth Branagh. But ultimately, I had to find my own Hamlet, one that felt authentic to me and relevant to contemporary audiences.

The rehearsal process was intense. We worked with movement coaches, voice coaches, and dialect specialists. Every gesture, every inflection had to serve the story. Director Sarah Thompson pushed us to find the raw emotion beneath Shakespeare's poetry, to make these 400-year-old words feel immediate and urgent.`,
    image_url: 'https://images.pexels.com/photos/3662630/pexels-photo-3662630.jpeg?auto=compress&cs=tinysrgb&w=800',
    created_at: '2025-08-22T14:15:00Z'
  }
];

export const communityBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'My First Theater Experience',
    content: `I'll never forget the first time I saw live theater. It was a production of Les Misérables, and I was completely mesmerized. The power of the performances, the music, the sets—everything came together to create something magical. That night changed my life and sparked my love for the performing arts.`,
    image_url: '',
    created_at: '2025-09-10T16:45:00Z',
    author_name: 'Sarah Johnson'
  },
  {
    id: '2',
    title: 'The Impact of Theater on Mental Health',
    content: `As someone who struggles with anxiety, I've found that attending theater performances has been incredibly therapeutic. There's something about being present in the moment, witnessing stories unfold before your eyes, that helps quiet the racing thoughts. I'm grateful for actors who bring these stories to life and create spaces where we can feel, reflect, and heal.`,
    image_url: '',
    created_at: '2025-09-05T11:20:00Z',
    author_name: 'Michael Chen'
  }
];

export const mockComments: Record<string, Comment[]> = {
  '1': [
    {
      id: '1',
      author_name: 'Emily Davis',
      author_email: 'emily@example.com',
      comment_text: 'This is such an inspiring post! Your dedication to your craft really shows in every performance.',
      is_actor_response: false,
      created_at: '2025-09-16T09:15:00Z'
    },
    {
      id: '2',
      author_name: 'Actor Name',
      author_email: 'actor@example.com',
      comment_text: 'Thank you so much, Emily! It means the world to hear that the passion comes through.',
      is_actor_response: true,
      created_at: '2025-09-16T10:30:00Z'
    }
  ],
  '2': [
    {
      id: '3',
      author_name: 'James Wilson',
      author_email: 'james@example.com',
      comment_text: 'Your Hamlet was absolutely phenomenal. Best performance I\'ve seen in years!',
      is_actor_response: false,
      created_at: '2025-08-23T15:45:00Z'
    }
  ]
};
