"use client";

// Front-end-only data store. Holds every mutable entity (products, repair
// prices, orders, tickets, reviews, cart) in React state, persisted to
// localStorage so the whole app is fully functional with no backend.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  SEED_PRICES,
  SEED_PRODUCTS,
  SEED_ORDERS,
  SEED_TICKETS,
  SEED_REVIEWS,
  type Category,
  type IssueKey,
  type Order,
  type Prices,
  type Product,
  type Review,
  type Ticket,
} from "./data";

export type CartLine = { id: number; qty: number };

type StoreState = {
  products: Product[];
  prices: Prices;
  orders: Order[];
  tickets: Ticket[];
  reviews: Review[];
};

const STORE_KEY = "pm_store_v1";
const CART_KEY = "pm_cart";

function seedState(): StoreState {
  return {
    products: SEED_PRODUCTS.map((p) => ({ ...p, tag: { ...p.tag } })),
    prices: { ...SEED_PRICES },
    orders: SEED_ORDERS.map((o) => ({ ...o })),
    tickets: SEED_TICKETS.map((t) => ({ ...t })),
    reviews: SEED_REVIEWS.map((r) => ({ ...r })),
  };
}

function slugify(s: string): string {
  return (
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "product"
  );
}

type StoreCtx = StoreState & {
  ready: boolean;
  cart: CartLine[];
  cartCount: number;
  cartTotal: number;
  findProduct: (id: number) => Product | undefined;
  productBySlug: (slug: string) => Product | undefined;
  addToCart: (id: number) => void;
  changeQty: (id: number, delta: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  placeOrder: (customer: string) => string;
  bookRepair: (device: string, issue: IssueKey) => string;
  advanceOrder: (num: string) => void;
  advanceTicket: (num: string) => void;
  addProduct: (name: string, price: number) => void;
  deleteProduct: (id: number) => void;
  setPrice: (issue: IssueKey, value: number) => void;
  addReview: (author: string, text: string) => void;
  approveReview: (id: number) => void;
  hideReview: (id: number) => void;
  deleteReview: (id: number) => void;
};

const Ctx = createContext<StoreCtx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoreState>(seedState);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const hydrated = useRef(false);

  // Hydrate from localStorage once, on the client.
  useEffect(() => {
    try {
      const rawStore = localStorage.getItem(STORE_KEY);
      if (rawStore) {
        const parsed = JSON.parse(rawStore) as Partial<StoreState>;
        setState((prev) => ({ ...prev, ...parsed }));
      }
      const rawCart = localStorage.getItem(CART_KEY);
      if (rawCart) setCart(JSON.parse(rawCart) as CartLine[]);
    } catch {}
    hydrated.current = true;
    setReady(true);
  }, []);

  // Persist store + cart after hydration.
  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const findProduct = useCallback(
    (id: number) => state.products.find((p) => p.id === id),
    [state.products]
  );
  const productBySlug = useCallback(
    (slug: string) => state.products.find((p) => p.slug === slug),
    [state.products]
  );

  const cartCount = useMemo(
    () => cart.reduce((a, c) => a + c.qty, 0),
    [cart]
  );
  const cartTotal = useMemo(
    () =>
      cart.reduce((a, c) => {
        const p = findProduct(c.id);
        return a + (p ? p.price * c.qty : 0);
      }, 0),
    [cart, findProduct]
  );

  const addToCart = useCallback((id: number) => {
    setCart((prev) => {
      const next = prev.map((c) => ({ ...c }));
      const ex = next.find((c) => c.id === id);
      if (ex) ex.qty++;
      else next.push({ id, qty: 1 });
      return next;
    });
  }, []);

  const changeQty = useCallback((id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, qty: c.qty + delta } : c))
        .filter((c) => c.qty > 0)
    );
  }, []);

  const removeItem = useCallback((id: number) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const placeOrder = useCallback(
    (customer: string) => {
      const num = "ORD-" + Math.floor(2044 + Math.random() * 900);
      const total = cart.reduce((a, c) => {
        const p = state.products.find((x) => x.id === c.id);
        return a + (p ? p.price * c.qty : 0);
      }, 0);
      setState((prev) => ({
        ...prev,
        orders: [
          { num, customer: customer || "Guest", total, status: 0 },
          ...prev.orders,
        ],
      }));
      setCart([]);
      return num;
    },
    [cart, state.products]
  );

  const bookRepair = useCallback((device: string, issue: IssueKey) => {
    const num = "REP-" + Math.floor(5110 + Math.random() * 800);
    setState((prev) => ({
      ...prev,
      tickets: [
        { num, device: device || "Device", issue, status: 0 },
        ...prev.tickets,
      ],
    }));
    return num;
  }, []);

  const advanceOrder = useCallback((num: string) => {
    setState((prev) => ({
      ...prev,
      orders: prev.orders.map((o) =>
        o.num === num ? { ...o, status: Math.min(3, o.status + 1) } : o
      ),
    }));
  }, []);

  const advanceTicket = useCallback((num: string) => {
    setState((prev) => ({
      ...prev,
      tickets: prev.tickets.map((t) =>
        t.num === num ? { ...t, status: Math.min(4, t.status + 1) } : t
      ),
    }));
  }, []);

  const addProduct = useCallback((name: string, price: number) => {
    if (!name) return;
    setState((prev) => {
      const id = Math.max(0, ...prev.products.map((p) => p.id)) + 1;
      const cat: Category = "accessories";
      const newP: Product = {
        id,
        slug: slugify(name) + "-" + id,
        cat,
        en: name,
        es: name,
        price: price || 0,
        tag: { en: "", es: "" },
        blurbEn: "",
        blurbEs: "",
      };
      return { ...prev, products: [...prev.products, newP] };
    });
  }, []);

  const deleteProduct = useCallback((id: number) => {
    setState((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== id),
    }));
  }, []);

  const setPrice = useCallback((issue: IssueKey, value: number) => {
    setState((prev) => ({
      ...prev,
      prices: { ...prev.prices, [issue]: value },
    }));
  }, []);

  const addReview = useCallback((author: string, text: string) => {
    setState((prev) => {
      const id = Math.max(0, ...prev.reviews.map((r) => r.id)) + 1;
      return {
        ...prev,
        reviews: [
          ...prev.reviews,
          { id, author: author || "Anonymous", text, status: "pending" },
        ],
      };
    });
  }, []);

  const approveReview = useCallback((id: number) => {
    setState((prev) => ({
      ...prev,
      reviews: prev.reviews.map((r) =>
        r.id === id ? { ...r, status: "approved" } : r
      ),
    }));
  }, []);

  const hideReview = useCallback((id: number) => {
    setState((prev) => ({
      ...prev,
      reviews: prev.reviews.map((r) =>
        r.id === id ? { ...r, status: "hidden" } : r
      ),
    }));
  }, []);

  const deleteReview = useCallback((id: number) => {
    setState((prev) => ({
      ...prev,
      reviews: prev.reviews.filter((r) => r.id !== id),
    }));
  }, []);

  const value: StoreCtx = {
    ...state,
    ready,
    cart,
    cartCount,
    cartTotal,
    findProduct,
    productBySlug,
    addToCart,
    changeQty,
    removeItem,
    clearCart,
    placeOrder,
    bookRepair,
    advanceOrder,
    advanceTicket,
    addProduct,
    deleteProduct,
    setPrice,
    addReview,
    approveReview,
    hideReview,
    deleteReview,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useStore must be used within StoreProvider");
  return c;
}
