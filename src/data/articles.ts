export interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tags: string[];
  sections: {
    heading?: string;
    paragraphs: string[];
    codeBlock?: {
      language: string;
      code: string;
    };
    quote?: string;
    bullets?: string[];
  }[];
}

export const ARTICLES_DATA: Article[] = [
  {
    id: 'kafka-springboot',
    title: 'The simplest understanding of Spring Boot + kafka',
    description: 'This article presents a simple way to implement a microservice architecture using Kafka, Spring Boot and Docker.',
    image: './resources/spring&kafka.jpg',
    date: 'July 28, 2026',
    readTime: '5 min read',
    author: {
      name: 'Shahriar Tahmid',
      role: 'Full-stack Developer',
      avatar: './resources/shahriarFamtik.jpg',
    },
    tags: ['Spring Boot', 'Apache Kafka', 'Docker', 'Microservices', 'Java'],
    sections: [
      {
        heading: 'Introduction to Event-Driven Architecture',
        paragraphs: [
          'In modern distributed systems, communication between microservices is pivotal. Traditional RESTful APIs provide synchronous communication, but they introduce tight coupling and latency bottlenecks. Apache Kafka revolutionizes this paradigm by introducing scalable, asynchronous event streaming.',
          'When combined with Spring Boot, building real-time event-driven microservices becomes intuitive, clean, and robust.'
        ]
      },
      {
        heading: 'Core Concepts of Apache Kafka',
        paragraphs: [
          'Before diving into Spring Boot integration, let us clarify the three core building blocks of Kafka:'
        ],
        bullets: [
          'Producers: Applications that publish events (records) to Kafka topics.',
          'Topics: Categories or feed names to which records are published and stored.',
          'Consumers: Applications that subscribe to topics and process incoming records asynchronously.'
        ]
      },
      {
        heading: 'Setting Up Spring Boot Producer & Consumer',
        paragraphs: [
          'Using spring-kafka, publishing a message to a topic takes just a few lines of code with KafkaTemplate:'
        ],
        codeBlock: {
          language: 'java',
          code: `@Service
public class MessageProducer {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    private static final String TOPIC = "user_events";

    public void sendMessage(String message) {
        System.out.println("Publishing event: " + message);
        this.kafkaTemplate.send(TOPIC, message);
    }
}`
        }
      },
      {
        heading: 'Consuming Messages with @KafkaListener',
        paragraphs: [
          'On the receiving microservice, consuming events is as effortless as annotating a listener method:'
        ],
        codeBlock: {
          language: 'java',
          code: `@Component
public class MessageConsumer {

    @KafkaListener(topics = "user_events", groupId = "group_id")
    public void consume(String message) {
        System.out.println("Received event payload: " + message);
        // Process business logic asynchronously
    }
}`
        }
      },
      {
        heading: 'Dockerizing the System',
        paragraphs: [
          'To run Kafka locally without hassle, we use Docker Compose to orchestrate Zookeeper (or KRaft mode) alongside Kafka broker and Spring Boot services.'
        ],
        quote: 'Asynchronous event streaming ensures that high traffic spikes in one service never bring down dependent services.'
      },
      {
        heading: 'Conclusion',
        paragraphs: [
          'Integrating Spring Boot with Kafka allows developers to create highly decoupled, fault-tolerant microservices. Whether you are building real-time metrics trackers, notification pipelines, or financial transaction logs, this stack delivers unmatched performance.'
        ]
      }
    ]
  },
  {
    id: 'building-react-apps',
    title: 'Building Modern Web Apps with React',
    description: 'Explore the powerful features of React and its ecosystem for building scalable, responsive web applications with optimal performance.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2670&auto=format&fit=crop',
    date: 'July 20, 2026',
    readTime: '6 min read',
    author: {
      name: 'Shahriar Tahmid',
      role: 'Full-stack Developer',
      avatar: './resources/shahriarFamtik.jpg',
    },
    tags: ['React', 'TypeScript', 'Web Dev', 'Frontend', 'Performance'],
    sections: [
      {
        heading: 'The Evolution of Modern React',
        paragraphs: [
          'React has transformed web application development from static HTML templates into highly dynamic, component-driven user experiences. With component composition, declarative state management, and powerful modern tooling like Vite, building production-grade web interfaces is smoother than ever.'
        ]
      },
      {
        heading: 'Best Practices for Clean Component Architecture',
        paragraphs: [
          'Maintaining a modular component hierarchy is essential as applications scale. Here are key principles to follow:'
        ],
        bullets: [
          'Single Responsibility: Keep components focused on doing one thing well.',
          'Custom Hooks: Extract reusable state logic into clean custom hooks.',
          'UI Tokenization: Use CSS variables or utility systems to enforce visual consistency.'
        ]
      },
      {
        heading: 'Optimizing Render Performance',
        paragraphs: [
          'Unnecessary re-renders are the primary cause of UI latency. Modern React provides tools like useMemo, useCallback, and React.memo to keep render cycles minimal.'
        ],
        codeBlock: {
          language: 'typescript',
          code: `const HeavyComponent = React.memo(({ items }: { items: string[] }) => {
  return (
    <ul>
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );
});`
        }
      },
      {
        heading: 'Summary',
        paragraphs: [
          'Mastering modern React patterns empowers developers to build fluid, high-performance web applications that impress users and stand the test of time.'
        ]
      }
    ]
  },
  {
    id: 'mastering-typescript',
    title: 'Mastering TypeScript for Enterprise Scale',
    description: 'Learn how to leverage TypeScript\'s advanced type system to build robust, maintainable large-scale applications with fewer bugs.',
    image: 'https://images.unsplash.com/photo-1516116211223-48a12725236c?q=80&w=2670&auto=format&fit=crop',
    date: 'July 15, 2026',
    readTime: '7 min read',
    author: {
      name: 'Shahriar Tahmid',
      role: 'Full-stack Developer',
      avatar: './resources/shahriarFamtik.jpg',
    },
    tags: ['TypeScript', 'Architecture', 'Enterprise', 'JavaScript'],
    sections: [
      {
        heading: 'Why Enterprise Apps Need TypeScript',
        paragraphs: [
          'JavaScript is dynamically typed, which works great for rapid prototyping but can cause runtime errors in large engineering teams. TypeScript provides static type checking at compile-time, serving as self-documenting code and catching bugs early in the dev cycle.'
        ]
      },
      {
        heading: 'Advanced Utility Types',
        paragraphs: [
          'TypeScript includes built-in generic type transformations like Pick, Omit, Partial, Record, and Readonly. Combining mapped types with conditional generics allows creating expressive API contracts.'
        ],
        codeBlock: {
          language: 'typescript',
          code: `type ApiResponse<T> = 
  | { status: 'success'; data: T }
  | { status: 'error'; message: string };

function handleResult<T>(response: ApiResponse<T>) {
  if (response.status === 'success') {
    console.log(response.data);
  } else {
    console.error(response.message);
  }
}`
        }
      },
      {
        heading: 'Conclusion',
        paragraphs: [
          'Investing in strict TypeScript configurations ensures codebase longevity and boosts team productivity across large distributed codebases.'
        ]
      }
    ]
  },
  {
    id: 'tailwind-css-ui',
    title: 'Designing Beautiful UIs with Tailwind CSS',
    description: 'A comprehensive guide to utilizing Tailwind CSS utility classes to create stunning and highly responsive user interfaces quickly.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2555&auto=format&fit=crop',
    date: 'July 10, 2026',
    readTime: '4 min read',
    author: {
      name: 'Shahriar Tahmid',
      role: 'Full-stack Developer',
      avatar: './resources/shahriarFamtik.jpg',
    },
    tags: ['Tailwind CSS', 'UI/UX', 'CSS', 'Design'],
    sections: [
      {
        heading: 'Utility-First Philosophy',
        paragraphs: [
          'Tailwind CSS reimagines web styling by providing low-level utility classes directly in HTML/JSX. Instead of jumping between CSS files and class names, utility classes provide immediate visual feedback while maintaining strict scale consistency.'
        ]
      },
      {
        heading: 'Crafting Glassmorphism & Dark Mode',
        paragraphs: [
          'Using backdrop-blur, subtle borders (border-white/10), and translucent backgrounds creates modern, depth-filled user interfaces that look ultra-premium.'
        ]
      }
    ]
  },
  {
    id: 'spring-boot-server',
    title: 'Understanding Spring Boot Server',
    description: 'Dive deep into Spring Boot Server and learn how they can drastically improve your application\'s performance.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2668&auto=format&fit=crop',
    date: 'July 05, 2026',
    readTime: '6 min read',
    author: {
      name: 'Shahriar Tahmid',
      role: 'Full-stack Developer',
      avatar: './resources/shahriarFamtik.jpg',
    },
    tags: ['Spring Boot', 'Backend', 'Java', 'Server Architecture'],
    sections: [
      {
        heading: 'Embedded Server Management',
        paragraphs: [
          'Spring Boot simplifies Java backend deployment by embedding web servers like Tomcat, Jetty, or Undertow into standalone executable JAR files. This eliminates complex WAR deployments on external application servers.'
        ]
      },
      {
        heading: 'Tuning Connection Pools & Async Processing',
        paragraphs: [
          'For high-throughput applications, configuring HikariCP connection pooling, reactive WebFlux endpoints, and thread pool execution allows processing thousands of concurrent requests seamlessly.'
        ]
      }
    ]
  },
  {
    id: 'zustand-state-management',
    title: 'State Management with Zustand',
    description: 'Discover how Zustand provides a minimalistic, yet powerful and scalable state management solution for your React applications.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop',
    date: 'June 28, 2026',
    readTime: '5 min read',
    author: {
      name: 'Shahriar Tahmid',
      role: 'Full-stack Developer',
      avatar: './resources/shahriarFamtik.jpg',
    },
    tags: ['React', 'Zustand', 'State Management', 'Frontend'],
    sections: [
      {
        heading: 'Beyond Redux Boilerplate',
        paragraphs: [
          'Zustand is a lightweight, unopinionated state management store for React. Unlike Redux, it requires zero boilerplate provider wrappers and works directly with hooks.'
        ],
        codeBlock: {
          language: 'typescript',
          code: `import { create } from 'zustand';

interface StoreState {
  count: number;
  increment: () => void;
}

export const useStore = create<StoreState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));`
        }
      }
    ]
  }
];
