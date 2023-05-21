export default function ErrorMsg({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs text-red-500 dark:text-red-500">{children}</span>
  );
}
