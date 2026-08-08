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
    title: 'Getting Started with Spring Boot and Kafka',
    description: 'Build a real event-driven order processing pipeline from scratch. You will wire a Spring Boot producer to a Kafka topic, consume events in a separate service, handle deserialization errors gracefully, and run everything locally with Docker Compose.',
    image: './resources/assets/spring&kafka.jpg',
    date: 'July 28, 2026',
    readTime: '5 min read',
    author: {
      name: 'Shahriar Tahmid',
      role: 'Full‑stack Developer',
      avatar: './resources/assets/shahriarFamtik.jpg',
    },
    tags: ['Spring Boot', 'Kafka', 'Docker', 'Microservices', 'Java'],
    sections: [
      {
        heading: 'The Problem with Synchronous Calls',
        paragraphs: [
          'Imagine your checkout service calls inventory, payment, and notification services via REST. If payment is slow, the entire checkout blocks. If notification is down, the user gets a 500 error for an order that actually succeeded.',
          'Kafka solves this by letting the checkout service publish an "OrderPlaced" event and move on. Each downstream service consumes the event independently, retries on failure, and scales at its own pace.'
        ]
      },
      {
        heading: 'Step 1 — Define the Event Contract',
        paragraphs: ['Before writing any Kafka code, define a shared event class. This becomes your API contract between services. Keep it immutable and serializable.'],
        codeBlock: {
          language: 'java',
          code: "public record OrderEvent(\n    String orderId,\n    String customerId,\n    List<LineItem> items,\n    BigDecimal total,\n    Instant createdAt\n) implements Serializable {\n    public record LineItem(String sku, int quantity, BigDecimal price) {}\n}"
        }
      },
      {
        heading: 'Step 2 — Configure the Producer',
        paragraphs: ['Add `spring-kafka` and configure JSON serialization. The key insight most tutorials skip: always set `acks=all` and enable idempotence in production to prevent duplicate messages during broker failover.'],
        codeBlock: {
          language: 'java',
          code: "@Configuration\npublic class KafkaProducerConfig {\n    @Bean\n    public ProducerFactory<String, OrderEvent> producerFactory() {\n        Map<String, Object> props = new HashMap<>();\n        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, \"kafka:9092\");\n        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);\n        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);\n        props.put(ProducerConfig.ACKS_CONFIG, \"all\");\n        props.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, true);\n        return new DefaultKafkaProducerFactory<>(props);\n    }\n\n    @Bean\n    public KafkaTemplate<String, OrderEvent> kafkaTemplate() {\n        return new KafkaTemplate<>(producerFactory());\n    }\n}"
        }
      },
      {
        heading: 'Step 3 — Build a Resilient Consumer',
        paragraphs: ['The consumer is where most production bugs hide. Always handle deserialization errors with an ErrorHandlingDeserializer, and route poison pills to a dead-letter topic instead of crashing the consumer group.'],
        codeBlock: {
          language: 'java',
          code: "@Component\n@Slf4j\npublic class InventoryConsumer {\n    @KafkaListener(\n        topics = \"order-events\",\n        groupId = \"inventory-service\",\n        containerFactory = \"kafkaListenerContainerFactory\"\n    )\n    @RetryableTopic(attempts = \"3\", backoff = @Backoff(delay = 1000))\n    public void onOrderPlaced(OrderEvent event) {\n        log.info(\"Reserving inventory for order {}\", event.orderId());\n        inventoryService.reserve(event.items());\n    }\n\n    @DltHandler\n    public void handleDlt(OrderEvent event) {\n        log.error(\"Failed to process order {} after retries\", event.orderId());\n        alertService.notify(\"Dead letter: \" + event.orderId());\n    }\n}"
        }
      },
      {
        heading: 'Step 4 — Docker Compose for Local Dev',
        paragraphs: ['Use KRaft mode (no Zookeeper) for a simpler local setup. This compose file gives you a single-node Kafka cluster, both services, and a Kafka UI for debugging.'],
        codeBlock: {
          language: 'yaml',
          code: "services:\n  kafka:\n    image: confluentinc/cp-kafka:7.6.0\n    environment:\n      KAFKA_NODE_ID: 1\n      KAFKA_PROCESS_ROLES: broker,controller\n      KAFKA_LISTENERS: PLAINTEXT://0.0.0.0:9092,CONTROLLER://0.0.0.0:9093\n      KAFKA_CONTROLLER_QUORUM_VOTERS: 1@kafka:9093\n      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092\n      CLUSTER_ID: MkU3OEVBNTcwNTJENDM2Qk\n    ports: [\"9092:9092\"]\n  kafka-ui:\n    image: provectuslabs/kafka-ui\n    ports: [\"8090:8080\"]\n    environment:\n      KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS: kafka:9092\n  producer:\n    build: ./order-service\n    depends_on: [kafka]\n  consumer:\n    build: ./inventory-service\n    depends_on: [kafka]"
        }
      },
      {
        heading: 'Key Takeaways',
        paragraphs: [
          'Use record types for event contracts to enforce immutability. Enable producer idempotence and acks=all for exactly-once semantics. Always implement dead-letter handling — your consumer will eventually encounter a message it cannot process. Use KRaft mode to eliminate the Zookeeper dependency in development.'
        ]
      }
    ]
  },
  {
    id: 'building-react-apps',
    title: 'Building Modern React Applications',
    description: 'A practical architecture guide for React + TypeScript apps that actually scale. Covers the folder structure that survives 50+ components, custom hooks that eliminate duplicate logic, and performance patterns that keep your app fast as it grows.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2670&auto=format&fit=crop',
    date: 'July 20, 2026',
    readTime: '6 min read',
    author: {
      name: 'Shahriar Tahmid',
      role: 'Full‑stack Developer',
      avatar: './resources/assets/shahriarFamtik.jpg',
    },
    tags: ['React', 'TypeScript', 'Vite', 'Performance'],
    sections: [
      {
        heading: 'The Folder Structure That Actually Works',
        paragraphs: [
          'Most React tutorials dump everything in `components/`. That breaks down at 20+ files. Instead, organize by feature: each feature folder contains its own components, hooks, types, and tests. Shared code lives in `lib/`.',
          'This structure means a developer working on "checkout" never needs to touch "dashboard" files, and code reviews become scoped and meaningful.'
        ],
        codeBlock: {
          language: 'text',
          code: "src/\n├── features/\n│   ├── auth/\n│   │   ├── LoginForm.tsx\n│   │   ├── useAuth.ts\n│   │   └── auth.types.ts\n│   ├── dashboard/\n│   │   ├── DashboardPage.tsx\n│   │   ├── StatCard.tsx\n│   │   └── useDashboardData.ts\n├── lib/\n│   ├── api.ts          # Shared fetch wrapper\n│   ├── cn.ts           # className utility\n│   └── constants.ts\n├── components/         # Truly generic UI (Button, Modal, Toast)\n└── App.tsx"
        }
      },
      {
        heading: 'Custom Hooks That Eliminate Duplication',
        paragraphs: ['The most underused React pattern is extracting business logic into custom hooks. This hook handles API calls with loading, error, and caching — replacing dozens of duplicated useEffect + useState blocks across your app.'],
        codeBlock: {
          language: 'typescript',
          code: "function useQuery<T>(key: string, fetcher: () => Promise<T>) {\n  const [data, setData] = useState<T | null>(null);\n  const [error, setError] = useState<Error | null>(null);\n  const [isLoading, setIsLoading] = useState(true);\n  const cache = useRef<Map<string, T>>(new Map());\n\n  useEffect(() => {\n    if (cache.current.has(key)) {\n      setData(cache.current.get(key)!);\n      setIsLoading(false);\n      return;\n    }\n    let cancelled = false;\n    fetcher()\n      .then(result => {\n        if (!cancelled) {\n          cache.current.set(key, result);\n          setData(result);\n        }\n      })\n      .catch(err => !cancelled && setError(err))\n      .finally(() => !cancelled && setIsLoading(false));\n    return () => { cancelled = true; };\n  }, [key]);\n\n  return { data, error, isLoading };\n}"
        }
      },
      {
        heading: 'Performance: The Three Rules',
        paragraphs: ['Forget premature optimization. These three rules cover 90% of React performance issues:'],
        bullets: [
          'Rule 1: Move state down. If only one child needs the state, do not put it in the parent. This prevents re-rendering siblings.',
          'Rule 2: Memoize expensive computations with useMemo, but never memoize cheap ones — the overhead of memoization is worse than recalculating.',
          'Rule 3: Lazy-load routes, not components. Splitting at the route level gives you the biggest bundle wins with the least complexity.'
        ],
        codeBlock: {
          language: 'typescript',
          code: "// Route-level code splitting — the highest-impact optimization\nconst Dashboard = lazy(() => import('./features/dashboard/DashboardPage'));\nconst Settings = lazy(() => import('./features/settings/SettingsPage'));\n\nfunction App() {\n  return (\n    <Suspense fallback={<PageSkeleton />}>\n      <Routes>\n        <Route path=\"/dashboard\" element={<Dashboard />} />\n        <Route path=\"/settings\" element={<Settings />} />\n      </Routes>\n    </Suspense>\n  );\n}"
        }
      },
      {
        heading: 'Key Takeaways',
        paragraphs: ['Organize by feature, not by file type. Extract repeated stateful logic into custom hooks. Apply performance optimizations at the route level first — that is where the biggest wins are. A well-structured 50-component app should feel as navigable as a 5-component app.']
      }
    ]
  },
  {
    id: 'mastering-typescript',
    title: 'Mastering TypeScript for Large‑Scale Apps',
    description: 'Go beyond basic types. Learn the advanced TypeScript patterns that senior engineers use daily: discriminated unions for state machines, branded types for domain safety, and conditional types that make your API impossible to misuse.',
    image: 'https://images.unsplash.com/photo-1516116211223-48a12725236c?q=80&w=2670&auto=format&fit=crop',
    date: 'July 15, 2026',
    readTime: '7 min read',
    author: {
      name: 'Shahriar Tahmid',
      role: 'Full‑stack Developer',
      avatar: './resources/assets/shahriarFamtik.jpg',
    },
    tags: ['TypeScript', 'Advanced Types', 'Enterprise'],
    sections: [
      {
        heading: 'Discriminated Unions for State Machines',
        paragraphs: [
          'The most powerful TypeScript pattern for UI state is discriminated unions. Instead of juggling `isLoading`, `isError`, and `data` as separate booleans (which allows impossible states like loading=true AND error=true), model your state as a single union.',
          'The compiler then forces you to handle every case, and you get autocomplete for the correct fields in each branch.'
        ],
        codeBlock: {
          language: 'typescript',
          code: "type AsyncState<T> =\n  | { status: 'idle' }\n  | { status: 'loading' }\n  | { status: 'success'; data: T }\n  | { status: 'error'; error: Error; retryCount: number };\n\nfunction renderState<T>(state: AsyncState<T>) {\n  switch (state.status) {\n    case 'idle':    return <Placeholder />;\n    case 'loading': return <Spinner />;\n    case 'success': return <DataView data={state.data} />;  // TS knows `data` exists\n    case 'error':   return <ErrorBanner error={state.error} retries={state.retryCount} />;\n  }\n}"
        }
      },
      {
        heading: 'Branded Types for Domain Safety',
        paragraphs: ['Ever accidentally passed a UserId where an OrderId was expected? Both are strings, so TypeScript cannot catch it — unless you use branded types. This zero-runtime-cost pattern prevents an entire class of bugs.'],
        codeBlock: {
          language: 'typescript',
          code: "type Brand<T, B extends string> = T & { readonly __brand: B };\n\ntype UserId = Brand<string, 'UserId'>;\ntype OrderId = Brand<string, 'OrderId'>;\n\nfunction createUserId(raw: string): UserId { return raw as UserId; }\nfunction createOrderId(raw: string): OrderId { return raw as OrderId; }\n\nfunction getOrder(orderId: OrderId) { /* ... */ }\n\nconst userId = createUserId('u-123');\nconst orderId = createOrderId('o-456');\n\ngetOrder(orderId);  // OK\ngetOrder(userId);   // Compile error — prevents real production bugs"
        }
      },
      {
        heading: 'Builder Pattern with Conditional Types',
        paragraphs: ['Use conditional types to create type-safe builders where the compiler tracks which fields have been set and prevents you from calling .build() until all required fields are provided.'],
        codeBlock: {
          language: 'typescript',
          code: "type RequiredFields = 'host' | 'port' | 'database';\n\nclass DbConfigBuilder<Set extends string = never> {\n  private config: Record<string, unknown> = {};\n\n  host(h: string): DbConfigBuilder<Set | 'host'> {\n    this.config.host = h;\n    return this as any;\n  }\n  port(p: number): DbConfigBuilder<Set | 'port'> {\n    this.config.port = p;\n    return this as any;\n  }\n  database(d: string): DbConfigBuilder<Set | 'database'> {\n    this.config.database = d;\n    return this as any;\n  }\n\n  // build() only available when all required fields are set\n  build(this: DbConfigBuilder<RequiredFields>): DbConfig {\n    return this.config as DbConfig;\n  }\n}\n\n// new DbConfigBuilder().host('localhost').build(); // Error: 'port' and 'database' missing\nnew DbConfigBuilder().host('localhost').port(5432).database('mydb').build(); // OK"
        }
      },
      {
        heading: 'Key Takeaways',
        paragraphs: ['Use discriminated unions to eliminate impossible states. Use branded types to prevent ID mix-ups at zero runtime cost. Use conditional types to make incorrect usage a compile error. The goal of advanced TypeScript is not clever code — it is making bugs impossible to write.']
      }
    ]
  },
  {
    id: 'tailwind-css-ui',
    title: 'Designing Beautiful UIs with Tailwind CSS',
    description: 'Stop fighting CSS specificity. Learn how to build a complete design system with Tailwind — from tokenized color palettes and responsive typography to glassmorphism cards and dark mode that works without a single media query.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2555&auto=format&fit=crop',
    date: 'July 10, 2026',
    readTime: '4 min read',
    author: {
      name: 'Shahriar Tahmid',
      role: 'Full‑stack Developer',
      avatar: './resources/assets/shahriarFamtik.jpg',
    },
    tags: ['Tailwind CSS', 'UI/UX', 'Design System'],
    sections: [
      {
        heading: 'Building a Token Layer That Scales',
        paragraphs: [
          'The first mistake teams make with Tailwind is skipping the config. Raw utility classes like `bg-blue-500` scatter design decisions across hundreds of files. Instead, define semantic tokens in `tailwind.config.ts` so your entire app references `bg-primary` — and changing your brand color is a one-line edit.',
        ],
        codeBlock: {
          language: 'typescript',
          code: "// tailwind.config.ts\nexport default {\n  theme: {\n    extend: {\n      colors: {\n        primary:   { DEFAULT: '#0ea5e9', hover: '#0284c7', subtle: '#e0f2fe' },\n        surface:   { DEFAULT: '#ffffff', dark: '#0f172a' },\n        muted:     '#64748b',\n      },\n      fontFamily: {\n        sans: ['Inter', 'system-ui', 'sans-serif'],\n        mono: ['JetBrains Mono', 'monospace'],\n      },\n      borderRadius: {\n        card: '1rem',\n        pill: '9999px',\n      },\n    },\n  },\n}"
        }
      },
      {
        heading: 'Glassmorphism Without the Guesswork',
        paragraphs: ['Glassmorphism looks stunning but most implementations have poor contrast and fail accessibility checks. The trick is using a visible border with low opacity and ensuring text has enough contrast against the blurred background. Here is a reusable component pattern:'],
        codeBlock: {
          language: 'tsx',
          code: "function GlassCard({ children }: { children: React.ReactNode }) {\n  return (\n    <div className=\"\n      relative overflow-hidden rounded-card p-6\n      bg-white/10 dark:bg-white/5\n      backdrop-blur-xl\n      border border-white/20\n      shadow-[0_8px_32px_rgba(0,0,0,0.12)]\n      /* Ensure WCAG AA contrast */\n      text-gray-900 dark:text-gray-100\n    \">\n      {children}\n    </div>\n  );\n}"
        }
      },
      {
        heading: 'Dark Mode in One Line',
        paragraphs: ['Set `darkMode: \"class\"` in your config and toggle a single class on `<html>`. Every component automatically switches via the `dark:` prefix. Store the preference in localStorage and respect `prefers-color-scheme` as the default.'],
        codeBlock: {
          language: 'typescript',
          code: "function useTheme() {\n  const [isDark, setIsDark] = useState(() => {\n    const stored = localStorage.getItem('theme');\n    if (stored) return stored === 'dark';\n    return window.matchMedia('(prefers-color-scheme: dark)').matches;\n  });\n\n  useEffect(() => {\n    document.documentElement.classList.toggle('dark', isDark);\n    localStorage.setItem('theme', isDark ? 'dark' : 'light');\n  }, [isDark]);\n\n  return { isDark, toggle: () => setIsDark(d => !d) };\n}"
        }
      },
      {
        heading: 'Key Takeaways',
        paragraphs: ['Define semantic tokens in your Tailwind config — never scatter raw color values. Use glassmorphism with visible borders and contrast-safe text. Implement dark mode with the class strategy and localStorage persistence. A well-configured Tailwind setup makes consistent UI the path of least resistance.']
      }
    ]
  },
  {
    id: 'spring-boot-server',
    title: 'Understanding Spring Boot Server',
    description: 'Go beyond "Hello World" REST endpoints. Learn how Spring Boot auto-configuration actually works under the hood, how to configure embedded Tomcat for production traffic, and the three application.yml settings that prevent most outages.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2668&auto=format&fit=crop',
    date: 'July 05, 2026',
    readTime: '6 min read',
    author: {
      name: 'Shahriar Tahmid',
      role: 'Full‑stack Developer',
      avatar: './resources/assets/shahriarFamtik.jpg',
    },
    tags: ['Spring Boot', 'Backend', 'Java'],
    sections: [
      {
        heading: 'How Auto-Configuration Really Works',
        paragraphs: [
          'Spring Boot is not magic — it is a series of `@Conditional` annotations. When you add `spring-boot-starter-data-jpa` to your classpath, `DataSourceAutoConfiguration` detects it and creates a DataSource bean. If you define your own DataSource, the auto-configured one backs off. Understanding this flow is the difference between debugging Spring for 5 minutes versus 5 hours.',
          'Run your app with `--debug` to see the full auto-configuration report — which beans were created and which were skipped, and why.'
        ]
      },
      {
        heading: 'Production Tomcat Tuning',
        paragraphs: ['The default embedded Tomcat config is designed for development. In production, three settings prevent most thread-starvation and timeout issues:'],
        codeBlock: {
          language: 'yaml',
          code: "server:\n  tomcat:\n    max-threads: 200           # Default is 200, increase for high-concurrency\n    accept-count: 100          # Queue size when all threads are busy\n    connection-timeout: 5000   # Drop slow clients after 5s\n    max-connections: 8192      # Max simultaneous connections\n  shutdown: graceful           # Finish in-flight requests before stopping\n\nspring:\n  lifecycle:\n    timeout-per-shutdown-phase: 30s  # Max wait during graceful shutdown"
        }
      },
      {
        heading: 'Structured Error Handling',
        paragraphs: ['Never let Spring return its default error JSON. Define a global exception handler that returns consistent, useful error responses — this saves frontend developers hours of guesswork.'],
        codeBlock: {
          language: 'java',
          code: "@RestControllerAdvice\npublic class GlobalExceptionHandler {\n\n    @ExceptionHandler(ResourceNotFoundException.class)\n    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {\n        return ResponseEntity.status(404).body(\n            new ErrorResponse(\"NOT_FOUND\", ex.getMessage(), Instant.now())\n        );\n    }\n\n    @ExceptionHandler(MethodArgumentNotValidException.class)\n    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {\n        String details = ex.getBindingResult().getFieldErrors().stream()\n            .map(e -> e.getField() + \": \" + e.getDefaultMessage())\n            .collect(Collectors.joining(\", \"));\n        return ResponseEntity.badRequest().body(\n            new ErrorResponse(\"VALIDATION_FAILED\", details, Instant.now())\n        );\n    }\n\n    record ErrorResponse(String code, String message, Instant timestamp) {}\n}"
        }
      },
      {
        heading: 'Key Takeaways',
        paragraphs: ['Run with --debug to understand auto-configuration decisions. Tune Tomcat thread pool, timeouts, and graceful shutdown for production. Always define a @RestControllerAdvice for consistent error responses. These three practices prevent the majority of Spring Boot production incidents.']
      }
    ]
  },
  {
    id: 'zustand-state-management',
    title: 'State Management with Zustand',
    description: 'Redux is overkill for most apps. Learn how Zustand gives you global state in 10 lines, with practical patterns for async data fetching, optimistic updates, and localStorage persistence — all without boilerplate.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop',
    date: 'June 28, 2026',
    readTime: '5 min read',
    author: {
      name: 'Shahriar Tahmid',
      role: 'Full‑stack Developer',
      avatar: './resources/assets/shahriarFamtik.jpg',
    },
    tags: ['React', 'Zustand', 'State Management'],
    sections: [
      {
        heading: 'Why Not Redux?',
        paragraphs: [
          'Redux requires actions, action creators, reducers, middleware, and selectors. For a todo app, that is 5 files. Zustand gives you the same functionality in a single `create()` call. It works with vanilla React hooks, requires no Provider wrapper, and the bundle size is 1KB.',
          'That said, Redux Toolkit is still great for very large teams who benefit from strict conventions. Choose Zustand when you want speed and simplicity.'
        ]
      },
      {
        heading: 'Real-World Store: Shopping Cart',
        paragraphs: ['Here is a production-quality cart store with computed values, async actions, and type safety. Notice how the store is self-contained — components just call actions, no dispatching or action types needed.'],
        codeBlock: {
          language: 'typescript',
          code: "interface CartItem { id: string; name: string; price: number; qty: number; }\n\ninterface CartStore {\n  items: CartItem[];\n  isCheckingOut: boolean;\n  add: (product: Omit<CartItem, 'qty'>) => void;\n  remove: (id: string) => void;\n  checkout: () => Promise<boolean>;\n  total: () => number;\n}\n\nexport const useCart = create<CartStore>((set, get) => ({\n  items: [],\n  isCheckingOut: false,\n\n  add: (product) => set((state) => {\n    const existing = state.items.find(i => i.id === product.id);\n    if (existing) {\n      return { items: state.items.map(i =>\n        i.id === product.id ? { ...i, qty: i.qty + 1 } : i\n      )};\n    }\n    return { items: [...state.items, { ...product, qty: 1 }] };\n  }),\n\n  remove: (id) => set((s) => ({ items: s.items.filter(i => i.id !== id) })),\n\n  checkout: async () => {\n    set({ isCheckingOut: true });\n    const ok = await api.post('/checkout', { items: get().items });\n    set({ isCheckingOut: false, items: ok ? [] : get().items });\n    return ok;\n  },\n\n  total: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),\n}));"
        }
      },
      {
        heading: 'Persistence with Middleware',
        paragraphs: ['Add localStorage persistence with one wrapper. The `partialize` option lets you exclude transient state like loading flags from being persisted.'],
        codeBlock: {
          language: 'typescript',
          code: "import { persist } from 'zustand/middleware';\n\nexport const useCart = create<CartStore>()(\n  persist(\n    (set, get) => ({\n      // ... same store logic as above\n    }),\n    {\n      name: 'cart-storage',\n      partialize: (state) => ({ items: state.items }), // only persist items\n    }\n  )\n);"
        }
      },
      {
        heading: 'Key Takeaways',
        paragraphs: ['Use Zustand for most React apps — it eliminates Redux boilerplate while keeping the same mental model. Keep stores focused: one store per domain (cart, auth, ui). Use the persist middleware for offline-capable state. Use selectors to prevent unnecessary re-renders: `useCart(s => s.total())` instead of `useCart()`.']
      }
    ]
  },
  {
    id: 'java-multithreading',
    title: 'Mastering Java Multithreading',
    description: 'Stop using raw Thread objects. Learn the modern Java concurrency toolkit — from ExecutorService thread pools to CompletableFuture pipelines, with the exact patterns that prevent deadlocks, thread leaks, and race conditions in production.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2670&auto=format&fit=crop',
    date: 'August 01, 2026',
    readTime: '8 min read',
    author: {
      name: 'Shahriar Tahmid',
      role: 'Full‑stack Developer',
      avatar: './resources/assets/shahriarFamtik.jpg',
    },
    tags: ['Java', 'Concurrency', 'Multithreading'],
    sections: [
      {
        heading: 'The Thread Pool You Should Actually Use',
        paragraphs: [
          'Most tutorials show `Executors.newFixedThreadPool()`, but in production you need more control. Use `ThreadPoolExecutor` directly so you can set the queue size, rejection policy, and thread naming — all critical for debugging production issues.',
          'The key insight: use separate pools for CPU-bound and I/O-bound work. A single shared pool leads to thread starvation when I/O tasks block all threads.'
        ],
        codeBlock: {
          language: 'java',
          code: "// CPU-bound pool: threads = number of cores\nExecutorService cpuPool = new ThreadPoolExecutor(\n    Runtime.getRuntime().availableProcessors(),\n    Runtime.getRuntime().availableProcessors(),\n    0L, TimeUnit.MILLISECONDS,\n    new LinkedBlockingQueue<>(1000),\n    new ThreadFactoryBuilder().setNameFormat(\"cpu-worker-%d\").build(),\n    new ThreadPoolExecutor.CallerRunsPolicy()  // backpressure: caller thread runs the task\n);\n\n// I/O-bound pool: more threads to absorb blocking waits\nExecutorService ioPool = new ThreadPoolExecutor(\n    20, 50,\n    60L, TimeUnit.SECONDS,\n    new SynchronousQueue<>(),\n    new ThreadFactoryBuilder().setNameFormat(\"io-worker-%d\").build(),\n    new ThreadPoolExecutor.AbortPolicy()\n);"
        }
      },
      {
        heading: 'CompletableFuture Pipelines',
        paragraphs: ['Chain async operations without callback hell. This pattern fetches a user, then their orders, then enriches with product data — all non-blocking, with proper error handling at each stage.'],
        codeBlock: {
          language: 'java',
          code: "CompletableFuture<EnrichedOrder> pipeline = \n    CompletableFuture.supplyAsync(() -> userService.findById(userId), ioPool)\n        .thenCompose(user -> \n            CompletableFuture.supplyAsync(() -> orderService.getLatest(user), ioPool)\n        )\n        .thenApplyAsync(order -> productService.enrich(order), cpuPool)\n        .exceptionally(ex -> {\n            log.error(\"Pipeline failed for user {}\", userId, ex);\n            return EnrichedOrder.empty();\n        });\n\n// Wait with timeout — never block forever\nEnrichedOrder result = pipeline.get(5, TimeUnit.SECONDS);"
        }
      },
      {
        heading: 'The Five Concurrency Bugs and How to Prevent Them',
        paragraphs: ['These are the concurrency bugs that cause the most production incidents, and how to prevent each one:'],
        bullets: [
          'Thread leak: Always call pool.shutdown() in a finally block or use try-with-resources (Java 19+ ExecutorService is AutoCloseable).',
          'Race condition: Use ConcurrentHashMap.compute() instead of get-then-put. Use AtomicReference for lock-free state updates.',
          'Deadlock: Always acquire locks in a consistent global order. Use tryLock() with timeout instead of synchronized.',
          'Thread starvation: Separate CPU and I/O pools. Never submit a blocking call to a bounded pool without a timeout.',
          'Silent failure: Always attach an exception handler — uncaught exceptions in thread pools vanish silently.'
        ]
      },
      {
        heading: 'Key Takeaways',
        paragraphs: ['Use ThreadPoolExecutor directly for production control over queue size and rejection policy. Separate CPU and I/O pools to prevent starvation. Use CompletableFuture for async pipelines with proper error handling. Name your threads — it is the single most impactful debugging practice for concurrent code.']
      }
    ]
  },
  {
    id: 'spring-boot-security',
    title: 'Securing Spring Boot APIs with JWT',
    description: 'A production-ready guide to stateless authentication. Covers JWT token generation with refresh rotation, Spring Security filter chains, role-based access control, and the three security mistakes that lead to most API breaches.',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2669&auto=format&fit=crop',
    date: 'August 03, 2026',
    readTime: '7 min read',
    author: {
      name: 'Shahriar Tahmid',
      role: 'Full‑stack Developer',
      avatar: './resources/assets/shahriarFamtik.jpg',
    },
    tags: ['Spring Boot', 'Security', 'JWT'],
    sections: [
      {
        heading: 'Why JWTs Over Sessions',
        paragraphs: [
          'Server-side sessions require shared storage (Redis, DB) across instances. JWTs embed claims in the token itself — any server can validate it independently. This makes horizontal scaling trivial.',
          'The tradeoff: you cannot revoke a JWT before it expires. The solution is short-lived access tokens (15 min) paired with longer-lived refresh tokens stored server-side, giving you both statelessness and revocation.'
        ]
      },
      {
        heading: 'Token Generation with Rotation',
        paragraphs: ['Generate a short-lived access token and a refresh token. When the access token expires, the client sends the refresh token to get a new pair. Crucially, invalidate the old refresh token on each rotation to prevent token replay attacks.'],
        codeBlock: {
          language: 'java',
          code: "@Service\npublic class TokenService {\n    private final SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);\n\n    public TokenPair generateTokens(UserDetails user) {\n        String access = Jwts.builder()\n            .setSubject(user.getUsername())\n            .claim(\"roles\", user.getAuthorities().stream()\n                .map(GrantedAuthority::getAuthority).toList())\n            .setIssuedAt(new Date())\n            .setExpiration(Date.from(Instant.now().plus(15, ChronoUnit.MINUTES)))\n            .signWith(key)\n            .compact();\n\n        String refresh = UUID.randomUUID().toString();\n        refreshTokenRepo.save(new RefreshToken(refresh, user.getUsername(),\n            Instant.now().plus(7, ChronoUnit.DAYS)));\n\n        return new TokenPair(access, refresh);\n    }\n\n    public TokenPair rotate(String oldRefresh) {\n        RefreshToken stored = refreshTokenRepo.findByToken(oldRefresh)\n            .orElseThrow(() -> new InvalidTokenException(\"Refresh token not found\"));\n        refreshTokenRepo.delete(stored);  // Invalidate old token\n        return generateTokens(userService.loadByUsername(stored.getUsername()));\n    }\n}"
        }
      },
      {
        heading: 'Modern Security Filter Chain',
        paragraphs: ['Spring Security 6+ replaced WebSecurityConfigurerAdapter with a component-based SecurityFilterChain bean. Here is the modern approach with proper CORS, CSRF handling, and stateless session management.'],
        codeBlock: {
          language: 'java',
          code: "@Configuration\n@EnableMethodSecurity\npublic class SecurityConfig {\n    @Bean\n    public SecurityFilterChain filterChain(HttpSecurity http, JwtAuthFilter jwtFilter) throws Exception {\n        return http\n            .csrf(csrf -> csrf.disable())  // Stateless APIs do not need CSRF\n            .cors(cors -> cors.configurationSource(corsConfig()))\n            .sessionManagement(s -> s.sessionCreationPolicy(STATELESS))\n            .authorizeHttpRequests(auth -> auth\n                .requestMatchers(\"/auth/**\", \"/actuator/health\").permitAll()\n                .requestMatchers(\"/admin/**\").hasRole(\"ADMIN\")\n                .anyRequest().authenticated()\n            )\n            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)\n            .build();\n    }\n}"
        }
      },
      {
        heading: 'Three Security Mistakes to Avoid',
        paragraphs: ['These common mistakes account for the majority of JWT-related security breaches:'],
        bullets: [
          'Storing JWTs in localStorage: Vulnerable to XSS. Use httpOnly cookies with SameSite=Strict instead.',
          'Not validating token claims: Always verify issuer, audience, and expiration. Never trust the payload without signature verification.',
          'Logging tokens: A single log line with an access token gives attackers a 15-minute window. Redact tokens in all log output.'
        ]
      },
      {
        heading: 'Key Takeaways',
        paragraphs: ['Use short-lived access tokens with refresh token rotation for the best balance of security and UX. Migrate to the SecurityFilterChain API. Store tokens in httpOnly cookies, not localStorage. These patterns prevent the majority of authentication vulnerabilities in Spring Boot APIs.']
      }
    ]
  },
  {
    id: 'spring-cloud-microservices',
    title: 'Building Microservices with Spring Cloud',
    description: 'A practical guide to the Spring Cloud stack — service discovery with Eureka, intelligent routing with Gateway, centralized config management, and the circuit breaker pattern that prevents cascading failures across your services.',
    image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2670&auto=format&fit=crop',
    date: 'August 04, 2026',
    readTime: '9 min read',
    author: {
      name: 'Shahriar Tahmid',
      role: 'Full‑stack Developer',
      avatar: './resources/assets/shahriarFamtik.jpg',
    },
    tags: ['Spring Cloud', 'Microservices', 'Eureka', 'Gateway'],
    sections: [
      {
        heading: 'When to Use Microservices (and When Not To)',
        paragraphs: [
          'Most teams adopt microservices too early. If you have fewer than 3 teams and fewer than 50k lines of code, a modular monolith is simpler and faster. Microservices add network latency, distributed debugging complexity, and operational overhead.',
          'Use microservices when: different parts of the system need to scale independently, different teams own different services, or you need polyglot tech stacks. Use Spring Cloud when your team has already committed to the JVM ecosystem.'
        ]
      },
      {
        heading: 'Service Discovery That Actually Works',
        paragraphs: ['Eureka lets services find each other by name instead of IP. The key configuration most tutorials skip: set the renewal and eviction intervals correctly, or stale instances linger for minutes after shutdown.'],
        codeBlock: {
          language: 'yaml',
          code: "# Eureka Server\neureka:\n  server:\n    eviction-interval-timer-in-ms: 5000   # Check for dead instances every 5s\n    enable-self-preservation: false         # Disable in dev (enable in prod)\n\n# Client service (e.g., order-service)\neureka:\n  client:\n    service-url:\n      defaultZone: http://eureka:8761/eureka\n  instance:\n    lease-renewal-interval-in-seconds: 10   # Heartbeat every 10s\n    lease-expiration-duration-in-seconds: 30 # Evict after 30s of no heartbeat\n    prefer-ip-address: true                  # Use IP, not hostname (Docker-friendly)"
        }
      },
      {
        heading: 'API Gateway with Rate Limiting',
        paragraphs: ['Spring Cloud Gateway is more than a reverse proxy. Add rate limiting per client to protect downstream services from traffic spikes.'],
        codeBlock: {
          language: 'yaml',
          code: "spring:\n  cloud:\n    gateway:\n      routes:\n        - id: order-service\n          uri: lb://ORDER-SERVICE\n          predicates:\n            - Path=/api/orders/**\n          filters:\n            - StripPrefix=1\n            - name: RequestRateLimiter\n              args:\n                redis-rate-limiter.replenishRate: 10   # 10 requests/sec\n                redis-rate-limiter.burstCapacity: 20\n                key-resolver: \"#{@userKeyResolver}\""
        }
      },
      {
        heading: 'Circuit Breaker: Preventing Cascading Failures',
        paragraphs: ['When a downstream service is failing, continuing to call it wastes threads and cascades the failure upstream. Resilience4j circuit breaker stops calling the failing service and returns a fallback instead.'],
        codeBlock: {
          language: 'java',
          code: "@Service\npublic class OrderService {\n    @CircuitBreaker(name = \"inventory\", fallbackMethod = \"fallbackInventory\")\n    @Retry(name = \"inventory\", fallbackMethod = \"fallbackInventory\")\n    public InventoryStatus checkInventory(String sku) {\n        return inventoryClient.check(sku);  // Remote call\n    }\n\n    private InventoryStatus fallbackInventory(String sku, Throwable t) {\n        log.warn(\"Inventory service down, assuming available for {}\", sku);\n        return InventoryStatus.ASSUMED_AVAILABLE;  // Graceful degradation\n    }\n}"
        }
      },
      {
        heading: 'Key Takeaways',
        paragraphs: ['Start with a modular monolith and extract services only when you have a clear scaling or team boundary reason. Configure Eureka eviction intervals to avoid stale instances. Add rate limiting at the gateway to protect all downstream services. Use circuit breakers with meaningful fallbacks — not just error messages.']
      }
    ]
  },
  {
    id: 'leetcode-dynamic-programming',
    title: 'Conquering Dynamic Programming on LeetCode',
    description: 'The mental framework that makes DP click. Learn to identify the three signals that a problem is DP, apply the SRTBOT method to derive recurrences, and master the five patterns that cover 80% of all DP problems on LeetCode.',
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2670&auto=format&fit=crop',
    date: 'August 05, 2026',
    readTime: '6 min read',
    author: {
      name: 'Shahriar Tahmid',
      role: 'Full‑stack Developer',
      avatar: './resources/assets/shahriarFamtik.jpg',
    },
    tags: ['LeetCode', 'Dynamic Programming', 'Interviews'],
    sections: [
      {
        heading: 'The Three Signals a Problem Is DP',
        paragraphs: ['Before memorizing patterns, learn to recognize DP problems. Look for these three signals:'],
        bullets: [
          'Signal 1 — Optimal substructure: The optimal solution to the problem contains optimal solutions to subproblems. "Find the minimum cost to reach step N" depends on the minimum cost to reach steps N-1 and N-2.',
          'Signal 2 — Overlapping subproblems: The same subproblem is solved multiple times. Draw the recursion tree — if you see repeated nodes, it is DP.',
          'Signal 3 — Counting or optimization: The problem asks "how many ways" or "minimum/maximum" — not "enumerate all solutions".'
        ]
      },
      {
        heading: 'The SRTBOT Framework',
        paragraphs: [
          'Use this 6-step method from MIT 6.006 to systematically derive any DP solution:',
          'Subproblem — define x(i) as the answer for a suffix/prefix/substring. Relate — write x(i) in terms of smaller subproblems. Topology — ensure no cycles in the dependency graph. Base case — define the trivial answer. Original problem — express the final answer in terms of subproblems. Time — multiply number of subproblems by work per subproblem.'
        ]
      },
      {
        heading: 'Pattern: 0/1 Knapsack',
        paragraphs: ['Given items with weight and value, maximize value within a weight limit. This pattern also solves: subset sum, equal partition, target sum, and coin change (bounded). The key: each item has a binary choice — take it or skip it.'],
        codeBlock: {
          language: 'java',
          code: "// 0/1 Knapsack — O(n * capacity) time, O(capacity) space\npublic int knapsack(int[] weights, int[] values, int capacity) {\n    int[] dp = new int[capacity + 1];\n    for (int i = 0; i < weights.length; i++) {\n        // Iterate BACKWARDS to prevent using the same item twice\n        for (int w = capacity; w >= weights[i]; w--) {\n            dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);\n        }\n    }\n    return dp[capacity];\n}\n// Key insight: iterating backwards ensures each item is used at most once.\n// For unbounded knapsack, iterate forwards instead."
        }
      },
      {
        heading: 'Pattern: Longest Common Subsequence',
        paragraphs: ['Compare two sequences. This pattern also solves: edit distance, shortest common supersequence, and diff algorithms.'],
        codeBlock: {
          language: 'java',
          code: "public int lcs(String a, String b) {\n    int m = a.length(), n = b.length();\n    int[] prev = new int[n + 1], curr = new int[n + 1];\n    for (int i = 1; i <= m; i++) {\n        for (int j = 1; j <= n; j++) {\n            if (a.charAt(i - 1) == b.charAt(j - 1)) {\n                curr[j] = prev[j - 1] + 1;\n            } else {\n                curr[j] = Math.max(prev[j], curr[j - 1]);\n            }\n        }\n        int[] tmp = prev; prev = curr; curr = tmp;\n        Arrays.fill(curr, 0);\n    }\n    return prev[n];\n}\n// Space-optimized from O(m*n) to O(n) using two rolling arrays."
        }
      },
      {
        heading: 'Key Takeaways',
        paragraphs: ['Identify DP through the three signals before attempting a solution. Use the SRTBOT framework to derive recurrences systematically. Master the five core patterns — knapsack, LCS, interval DP, grid paths, and state machine — and most DP problems become variations of these. Always optimize space with rolling arrays in interviews.']
      }
    ]
  },
  {
    id: 'leetcode-graphs',
    title: 'Graph Algorithms Demystified',
    description: 'Master the four graph algorithms that solve 90% of interview problems. Includes BFS for shortest paths, DFS for connectivity, Dijkstra for weighted graphs, and topological sort for dependency resolution — with reusable Java templates you can adapt to any problem.',
    image: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=2689&auto=format&fit=crop',
    date: 'August 06, 2026',
    readTime: '7 min read',
    author: {
      name: 'Shahriar Tahmid',
      role: 'Full‑stack Developer',
      avatar: './resources/assets/shahriarFamtik.jpg',
    },
    tags: ['LeetCode', 'Graphs', 'Algorithms'],
    sections: [
      {
        heading: 'Choosing the Right Algorithm',
        paragraphs: [
          'The biggest mistake in graph problems is jumping to code before choosing the right algorithm. Use this decision tree:',
          'Unweighted shortest path → BFS. Weighted shortest path (no negatives) → Dijkstra. Detect cycles or explore all paths → DFS. Ordering with dependencies → Topological Sort. Connected components → Union-Find or DFS.'
        ]
      },
      {
        heading: 'BFS: The Shortest Path Workhorse',
        paragraphs: ['BFS guarantees the shortest path in unweighted graphs because it explores all nodes at distance k before any node at distance k+1. This template handles the classic "minimum moves" pattern — grids, word ladders, and state-space searches.'],
        codeBlock: {
          language: 'java',
          code: "// Generic BFS — returns shortest distance from source to every reachable node\npublic Map<Integer, Integer> bfs(int source, Map<Integer, List<Integer>> graph) {\n    Map<Integer, Integer> dist = new HashMap<>();\n    Queue<Integer> queue = new ArrayDeque<>();\n    dist.put(source, 0);\n    queue.add(source);\n\n    while (!queue.isEmpty()) {\n        int node = queue.poll();\n        for (int neighbor : graph.getOrDefault(node, List.of())) {\n            if (!dist.containsKey(neighbor)) {\n                dist.put(neighbor, dist.get(node) + 1);\n                queue.add(neighbor);\n            }\n        }\n    }\n    return dist;\n}\n// Adapt for grids: use int[][] directions = {{0,1},{0,-1},{1,0},{-1,0}};\n// Adapt for word ladders: neighbors = all words differing by one character."
        }
      },
      {
        heading: 'Dijkstra: When Edges Have Weight',
        paragraphs: ['Dijkstra extends BFS to weighted graphs using a priority queue. The critical optimization most implementations miss: skip stale entries instead of using a decrease-key operation, which keeps the code simple and runs in O(E log V).'],
        codeBlock: {
          language: 'java',
          code: "public int[] dijkstra(int src, List<List<int[]>> graph) {\n    int n = graph.size();\n    int[] dist = new int[n];\n    Arrays.fill(dist, Integer.MAX_VALUE);\n    dist[src] = 0;\n    // {node, distance} — min-heap by distance\n    PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));\n    pq.offer(new int[]{src, 0});\n\n    while (!pq.isEmpty()) {\n        int[] curr = pq.poll();\n        int u = curr[0], d = curr[1];\n        if (d > dist[u]) continue;  // Skip stale entries — this is the key line\n        for (int[] edge : graph.get(u)) {\n            int v = edge[0], w = edge[1];\n            if (dist[u] + w < dist[v]) {\n                dist[v] = dist[u] + w;\n                pq.offer(new int[]{v, dist[v]});\n            }\n        }\n    }\n    return dist;\n}"
        }
      },
      {
        heading: 'Topological Sort: Dependency Resolution',
        paragraphs: ['Use Kahn\'s algorithm (BFS-based) for topological sort — it naturally detects cycles (if the sorted list has fewer nodes than the graph, there is a cycle). This solves course scheduling, build order, and task dependency problems.'],
        codeBlock: {
          language: 'java',
          code: "public List<Integer> topoSort(int n, int[][] edges) {\n    List<List<Integer>> adj = new ArrayList<>();\n    int[] inDegree = new int[n];\n    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());\n    for (int[] e : edges) {\n        adj.get(e[0]).add(e[1]);\n        inDegree[e[1]]++;\n    }\n\n    Queue<Integer> queue = new ArrayDeque<>();\n    for (int i = 0; i < n; i++) {\n        if (inDegree[i] == 0) queue.add(i);\n    }\n\n    List<Integer> order = new ArrayList<>();\n    while (!queue.isEmpty()) {\n        int node = queue.poll();\n        order.add(node);\n        for (int nb : adj.get(node)) {\n            if (--inDegree[nb] == 0) queue.add(nb);\n        }\n    }\n    return order.size() == n ? order : List.of(); // Empty = cycle detected\n}"
        }
      },
      {
        heading: 'Key Takeaways',
        paragraphs: ['Use the decision tree to pick the right algorithm before coding. BFS for unweighted shortest paths, Dijkstra for weighted, DFS for exploration, topological sort for dependencies. Skip stale entries in Dijkstra instead of decrease-key. Use Kahn\'s algorithm for topological sort — it gives you cycle detection for free.']
      }
    ]
  },
  {
    id: 'codeforces-competitive',
    title: 'Getting Started with Competitive Programming on Codeforces',
    description: 'The practical setup guide for competitive programming — from the C++ template that saves you 5 minutes per contest, to the debugging macros that catch wrong answers before submission, to the practice strategy that builds rating fastest.',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=2674&auto=format&fit=crop',
    date: 'August 07, 2026',
    readTime: '5 min read',
    author: {
      name: 'Shahriar Tahmid',
      role: 'Full‑stack Developer',
      avatar: './resources/assets/shahriarFamtik.jpg',
    },
    tags: ['Codeforces', 'Competitive Programming', 'C++'],
    sections: [
      {
        heading: 'The Template That Wins Contests',
        paragraphs: ['A good template is not about saving keystrokes — it is about eliminating entire categories of bugs. Fast I/O prevents TLE on large inputs. Typed aliases prevent overflow bugs. Debug macros let you trace logic without submitting print statements.'],
        codeBlock: {
          language: 'cpp',
          code: "#include <bits/stdc++.h>\nusing namespace std;\n\nusing ll  = long long;\nusing pii = pair<int, int>;\nusing vi  = vector<int>;\n\n#define all(v)  (v).begin(), (v).end()\n#define sz(v)   (int)(v).size()\n#define rep(i, n) for (int i = 0; i < (n); i++)\n\n#ifdef LOCAL\n#define dbg(x) cerr << #x << \" = \" << (x) << endl\n#else\n#define dbg(x)  // compiles to nothing on judge\n#endif\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int T;\n    cin >> T;\n    while (T--) {\n        // solve\n    }\n}"
        }
      },
      {
        heading: 'The Debugging Workflow',
        paragraphs: ['Most wrong answers come from edge cases, not wrong algorithms. Before submitting, test these automatically:'],
        codeBlock: {
          language: 'bash',
          code: "#!/bin/bash\n# stress.sh — finds a failing test case automatically\ng++ -std=c++17 -O2 -DLOCAL sol.cpp -o sol\ng++ -std=c++17 -O2 brute.cpp -o brute\ng++ -std=c++17 -O2 gen.cpp -o gen\n\nfor i in $(seq 1 10000); do\n    ./gen $i > test_input.txt\n    diff <(./sol < test_input.txt) <(./brute < test_input.txt) > /dev/null\n    if [ $? -ne 0 ]; then\n        echo \"MISMATCH on test $i:\"\n        cat test_input.txt\n        echo \"Expected:\"; ./brute < test_input.txt\n        echo \"Got:\";      ./sol < test_input.txt\n        break\n    fi\ndone\necho \"All tests passed\""
        }
      },
      {
        heading: 'The Practice Strategy That Builds Rating',
        paragraphs: ['Do not just solve problems randomly. Use this structured approach:'],
        bullets: [
          'Week 1-2: Solve Div2 A+B problems in under 15 minutes. Focus on speed, not difficulty. This builds contest stamina.',
          'Week 3-4: Upsolve every Div2 C you cannot solve during a contest. Read editorials, then solve without looking. This builds problem-solving patterns.',
          'Ongoing: Do virtual contests on past rounds at your rating level. Treat them like real contests — no editorials for 2 hours. This builds performance under pressure.',
          'Track your weak topics in a spreadsheet. If you fail 3 graph problems in a row, spend a week on graph theory before returning to contests.'
        ]
      },
      {
        heading: 'Key Takeaways',
        paragraphs: ['Use a template with fast I/O, type aliases, and conditional debug macros. Stress-test with a brute-force solution before submitting. Practice with structure — speed drills, upsolving, and virtual contests target different skills. Track your weak topics and train them deliberately.']
      }
    ]
  },
  {
    id: 'java-garbage-collection',
    title: 'Understanding Java Garbage Collection',
    description: 'Demystify JVM memory management. Learn how generational GC works, when to choose G1 vs ZGC vs Shenandoah, and the exact JVM flags that reduced our API P99 latency from 200ms to 12ms in production.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop',
    date: 'August 08, 2026',
    readTime: '8 min read',
    author: {
      name: 'Shahriar Tahmid',
      role: 'Full‑stack Developer',
      avatar: './resources/assets/shahriarFamtik.jpg',
    },
    tags: ['Java', 'JVM', 'GC'],
    sections: [
      {
        heading: 'How Generational GC Actually Works',
        paragraphs: [
          'The JVM heap is split into Young (Eden + two Survivor spaces) and Old generations. New objects are allocated in Eden. When Eden fills, a minor GC copies surviving objects to a Survivor space. Objects that survive multiple minor GCs get promoted to Old gen.',
          'Why this matters: if your objects are short-lived (request-scoped), minor GCs are cheap — they only copy the few survivors. If you accidentally hold references to large objects (caching without eviction), they pile up in Old gen and trigger expensive full GCs that freeze your application.'
        ]
      },
      {
        heading: 'Choosing the Right Collector',
        paragraphs: ['Each collector makes a different tradeoff. Choose based on your actual requirements, not blog hype:'],
        bullets: [
          'G1 (default since Java 9): Best for most services. Balances throughput and pause times. Aims for configurable pause targets. Use when you have no specific latency requirements.',
          'ZGC (production-ready since Java 15): Sub-millisecond pauses regardless of heap size. Use for latency-sensitive services — APIs, trading systems, real-time data. Slight throughput cost (~5%).',
          'Shenandoah: Similar goals to ZGC, available in OpenJDK builds. Concurrent compaction with low pause times. Good alternative if your JDK distribution includes it.',
          'Parallel GC: Maximum throughput, longer pauses. Use for batch processing, data pipelines, and offline jobs where latency does not matter.'
        ]
      },
      {
        heading: 'The JVM Flags That Fixed Our P99',
        paragraphs: ['We migrated a Spring Boot API from G1 to ZGC and tuned the heap. P99 latency dropped from 200ms to 12ms. Here are the exact flags and why each matters:'],
        codeBlock: {
          language: 'bash',
          code: "java \\\n  -XX:+UseZGC \\                          # Enable ZGC\n  -XX:+ZGenerational \\                    # Generational ZGC (Java 21+) — 30% less CPU\n  -Xms4g -Xmx4g \\                        # Fixed heap size — prevents resize pauses\n  -XX:SoftMaxHeapSize=3g \\                # ZGC tries to stay under 3g, uses 4g as ceiling\n  -XX:+AlwaysPreTouch \\                   # Touch all memory pages at startup — avoids page faults\n  -XX:+UseTransparentHugePages \\          # Reduce TLB misses on Linux\n  -XX:ConcGCThreads=2 \\                   # Limit GC threads to avoid stealing CPU from app\n  -Xlog:gc*:file=gc.log:time,level,tags \\ # Structured GC logging for analysis\n  -jar app.jar"
        }
      },
      {
        heading: 'Monitoring and Diagnosing GC Issues',
        paragraphs: ['Flags alone are not enough. Set up continuous monitoring to catch GC regressions before they hit users:'],
        bullets: [
          'Use `jstat -gc <pid> 1000` for real-time GC stats — watch Eden, Survivor, and Old gen usage.',
          'Parse gc.log with GCViewer or GCEasy.io to visualize pause distributions and allocation rates.',
          'Set alerts on: GC pause > 50ms, Old gen usage > 80%, allocation rate spikes (indicates a memory leak or burst load).',
          'Use `jmap -histo:live <pid>` to identify which classes consume the most heap — this finds caching bugs instantly.'
        ]
      },
      {
        heading: 'Key Takeaways',
        paragraphs: ['Understand the generational hypothesis — most objects die young, so keep them short-lived. Choose your GC based on actual latency vs throughput requirements. Fix heap size with -Xms = -Xmx to prevent resize pauses. Enable GC logging from day one — you cannot tune what you cannot measure. ZGC with generational mode (Java 21+) is the best choice for latency-sensitive services.']
      }
    ]
  }
];
