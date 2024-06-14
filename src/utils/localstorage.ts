export class LocalStorage {
  getItem = (id: string) => {
    if (typeof window === 'undefined') return localStorage.getItem(id);
    return;
  };

  setItem = (id: string, value: string) => {
    if (typeof window === 'undefined') return localStorage.setItem(id, value);
  };

  removeItem = (id: string) => {
    if (typeof window === 'undefined') return localStorage.removeItem(id);
  };

  clearItem = () => {
    if (typeof window === 'undefined') return localStorage.clear();
  };
}
